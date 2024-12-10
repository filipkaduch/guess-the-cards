# guess-the-cards

- Vue 3 + TS + TailwindCSS + Vite
- Pinia for managing Leaderboard and Game time progress
- Separate components for each stage of Game process (Game round, Result round, Leaderboard -end game)
- Couple of composables for Cards utilities and Random message creation
- DON'T FORGET TO create your own .env file and add VITE_APP_API_NINJA_KEY to get messages, otherwise there will be no random message displayed in between rounds

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
