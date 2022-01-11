// Add import rules to prevent shared module from importing from other modules
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:import/typescript'],
  env: {
    browser: false,
    node: true,
  },
  ignorePatterns: ['./scripts/**/*'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    semi: ['warn', 'never'],
    'comma-dangle': ['warn', 'always-multiline'],
    quotes: ['warn', 'single', { avoidEscape: true }],
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
}
