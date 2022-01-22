module.exports = {
  extends: [require.resolve('./eslint.react.js'), 'next'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
  },
}
