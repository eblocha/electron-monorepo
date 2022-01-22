const withTM = require('next-transpile-modules')(['@electron-monorepo/ui']);

module.exports = withTM({
  reactStrictMode: true,
});
