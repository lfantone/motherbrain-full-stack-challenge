'use strict';

module.exports = {
  extends: [
    'standard',
    'plugin:ramda/recommended',
    'plugin:prettier/recommended',
    'plugin:jsdoc/recommended',
    'prettier/standard'
  ],
  env: {
    browser: false,
    jest: true,
    node: true
  },
  plugins: ['jsdoc', 'ramda', 'sort-destructure-keys'],
  parserOptions: {
    sourceType: 'script'
  },
  rules: {
    'no-extra-semi': 2,
    semi: [2, 'always'],
    strict: ['error', 'global'],
    'import/no-duplicates': 'warn',
    'sort-destructure-keys/sort-destructure-keys': 2
  },
  settings: {
    jsdoc: {
      mode: 'typescript'
    }
  }
};
