import type { BuildConfig, BuildOutput } from 'bun'
import lightningcss from 'bun-lightningcss'
import chalk, { type ChalkInstance } from 'chalk'
import { relative } from 'path'

const configs : Record<string, Partial<BuildConfig>> = {
  prod: { minify: true, outdir: './dist/prod', sourcemap: 'external' },
  dev: { minify: false, outdir: './dist/dev', sourcemap: 'external' },
}

const log = console.log
const formatNormal = chalk.white.bgBlue.bold
const formatError = chalk.white.bgRed.bold
const formatSuccess = chalk.white.bgGreen.bold

const logBlock = ( msg : string, format : ChalkInstance, small? : boolean ) => {
  const msgLen = msg.length + 2

  const blockLenDefault = 100
  const blockLen = blockLenDefault < msgLen ? msgLen : blockLenDefault

  const blockLenHalf = Math.round( blockLen / 2 )
  const msgLenHalf = Math.round( msgLen / 2 )
  const blockLenShort = blockLenHalf - msgLen

  if ( !small ) {
    log( format( ' '.padEnd( blockLen, ' ' ) ) )
    log( format( msg.padStart( blockLenHalf, ' ' ) ) + format( ''.padEnd( blockLenHalf, ' ' ) ) )
    log( format( ' '.padEnd( blockLen, ' ' ) ) )
  }
  else {
    log( format( msg.padEnd( blockLen, ' ' ) ) )
  }
}
const buildingFor = async ( target? : string ) : Promise<BuildOutput | void> => {
  if ( !target || !(target in configs) ) {
    return
  }
  const extraConf = configs[target]
  logBlock( `Building for ${target.toUpperCase()}`, formatNormal )
  const result = await build( extraConf )
  for ( const artifact of result.outputs ) {
    logBlock( `[${artifact.kind}] ${relative( import.meta.dir, artifact.path )}`, formatNormal, true )
  }
  logBlock( result.success ? 'Success' : 'Failed', result.success ? formatSuccess : formatError )
}

export const build = async ( extraConfig? : Partial<BuildConfig> ) =>
  await Bun.build(
    {
      entrypoints: [ './src/index.tsx' ],
      target: 'browser',
      format: 'esm',
      sourcemap: 'inline',
      splitting: false,
      plugins: [ lightningcss() ],
      ...extraConfig,
    } satisfies BuildConfig,
  )
const firstArg = process.argv[2]
if ( firstArg ) {
  // This will run when file is executed directly
  await buildingFor( firstArg.toLowerCase().trim() )
}
