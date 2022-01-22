# Nx Electron Starter

This is a Yarn v1 starter Nx monorepo for Electron.

### Apps and Packages

- `desktop`: an [Electron](https://www.electronjs.org/) desktop application
  - This is based on a [vite template](https://github.com/cawa-93/vite-electron-builder) for Electron, but configured for React instead of Vue
- `docs`: a [Docusaurus](https://docusaurus.io/) app for documenting the desktop app
- `web`: a [Next.js](https://nextjs.org) app
- `core`: a "core functionality" library that the desktop application uses as a backend
- `ui`: a stub React component library shared by both `web`, `docs`, and `desktop` applications
  - This includes `storybook` for prototyping, and `jest` for testing
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
yarn run build
```
