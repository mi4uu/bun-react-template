import chalk from 'chalk'
import * as path from 'path'

import type { Serve, ServerWebSocket } from 'bun'
import { statSync } from 'fs'
import { build } from './build'
import * as entryPoint from './src'

declare global {
  var count : number
  var ws : ServerWebSocket<unknown> | undefined
  var updateHash : string | undefined | null
}

globalThis.count ??= 0
console.log( `Reloaded ${chalk.magenta.bold.underline( globalThis.count )} times` )
console.log( '' )
globalThis.count++
if ( globalThis.ws && globalThis.updateHash ) {
  globalThis.ws.send( JSON.stringify( { updateCount: globalThis.count, updateHash: globalThis.updateHash } ) )
}

const JOIN_RELOAD_MSG = 'JOIN_RELOAD'

const PROJECT_ROOT = import.meta.dir
const PUBLIC_DIR = path.resolve( PROJECT_ROOT, 'public' )

async function serveFromDir( config : { directory : string; path : string } ) {
  let basePath = path.join( config.directory, config.path )
  const suffixes = [ '', '.html', 'index.html' ]

  for ( const suffix of suffixes ) {
    try {
      const pathWithSuffix = path.join( basePath, suffix )
      const stat = statSync( pathWithSuffix )
      if ( stat && stat.isFile() ) {
        if ( pathWithSuffix.includes( 'index.html' ) ) {
          const indexFile = await Bun.file( pathWithSuffix ).text()
          const injectedSocket = indexFile.replace(
            '</body>',
            `
          <script>
          const socket = new WebSocket("ws://localhost:3000");
          const lastUpdateHash = localStorage.getItem("lastUpdateHash");


          // Connection opened
          socket.addEventListener("open", (event) => {
            socket.send("${JOIN_RELOAD_MSG}");
          });

          // Listen for messages
          socket.addEventListener("message", (event) => {
            console.log("Message from server ", event.data);
            try {
            const dataParsed = JSON.parse(event.data)
            console.log({lastUpdateHash, updateHash:dataParsed.updateHash })
            if(lastUpdateHash!==dataParsed.updateHash){
              localStorage.setItem("lastUpdateHash", dataParsed.updateHash);

              console.log(\`code updated \$\{dataParsed.updateCount\}\ time, refreshing\`)
              window.location.reload()
            } else {
              console.log(\`code updated \$\{dataParsed.updateCount\}\ time, update hash equals last hash, doing nuffn 🤷‍♂️ \`)

            }
            } catch(error){
              console.error("error parsing update message",error)
            }
          });
          socket.addEventListener("close", (event) => {
          console.log("Connection closed");
          window.location.reload()
          });

          </script>
          </body>
          `,
          )
          return new Response( injectedSocket, { headers: { 'Content-Type': 'text/html' } } )
        }
        return new Response( Bun.file( pathWithSuffix ) )
      }
    }
    catch (err) {}
  }

  return null
}

export default {
  async fetch( request, server ) {
    const success = server.upgrade( request )
    if ( success ) {
      return undefined
    }
    let reqPath = new URL( request.url ).pathname
    console.log( `${chalk.white.bgGreen.bold( '::FETCH::' )}\t${reqPath.padEnd( 30, ' ' )}${
      chalk
        .white
        .bgGreen
        .bold( ':::::::::' )
    }` )
    if ( reqPath === '/' ) {
      reqPath = '/index.html'
    }

    if ( reqPath === '/index.js' ) {
      const result = await build()
      const artifact = result.outputs[0]
      globalThis.updateHash = artifact.hash

      // Content-Type header is automatically set
      return new Response( artifact )
    }
    // check public
    const publicResponse = await serveFromDir( { directory: PUBLIC_DIR, path: reqPath } )
    if ( publicResponse ) {
      return publicResponse
    }
    return new Response( 'File not found', { status: 404 } )
  },
  websocket: {
    open( ws ) {
      if ( !ws ) {
        throw Error( 'ws is null' )
      }
      globalThis.ws = ws
    },
    async message( ws, message ) {
      if ( message === JOIN_RELOAD_MSG ) {
        // just log import so bun wont ignore this import
        console.log( '', chalk.bgBlackBright.gray.bgBlack( JSON.stringify( entryPoint ) ) )
      }
    },
    close( ws ) {
    },
  },
  port: 3000,
} satisfies Serve
