module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  parser: 'babel-eslint',
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
      arrowFunctions: true,
      destructuring: true,
      classes: true,
      objectLiteralComputedProperties: true,
      blockBindings: true,
      defaultParams: true,
      objectLiteralShorthandProperties: true,
      restParams: true,
      spread: true,
      forOf: true,
      generators: true,
      templateStrings: true,
      superInFunctions: true,
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 7,
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react/prop-types': 0
  }
}
