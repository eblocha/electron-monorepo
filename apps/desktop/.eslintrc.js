// Add import rules to prevent shared module from importing from other modules
module.exports = {
  extends: [require.resolve('@electron-monorepo/config/eslint/eslint.base.js')],
  env: {
    browser: false,
    node: true,
  },
  rules: {
    'import/no-restricted-paths': [
      'error',
      {
        basePath: './modules',
        zones: [
          { target: './shared', from: './main' },
          { target: './shared', from: './preload' },
          { target: './shared', from: './renderer' },
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
};
