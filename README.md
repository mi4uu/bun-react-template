# React Bun App

This is a single-page application project template using React and [Bun](https://bun.sh/). Run the following commands to get started.

```sh
bun create react ./react-bun-app
cd react-bun-app
```

The `bun create` command will automatically install the required dependencies. To start the dev server:

```sh
bun run dev
```

Then open http://localhost:3000 with your browser to see the result.

This bundles `src/index.tsx` and starts a development server that serves from the `public` build and serves app from src/ directory. When the incoming request to `localhost:3000/` comes in, the following exchange occurs:

- The Bun server returns `public/index.html`.
- The browser renders this HTML, which contains a `script` tags with `src="/index.js"`. The browser requests this file.
- The server checks for this file, first in `public` and returns it, if requested file is index.js, it uses src/index.tsx as entrypoint, build it in memory and serve. Program is watching files, if You make any change in application, it will rebuild and refresh page.
- This file renders the React component in `src/App.tsx` inside the `div#root` element. The app is now ready to accept user input.

Start building your app by editing `src/App.tsx`.
