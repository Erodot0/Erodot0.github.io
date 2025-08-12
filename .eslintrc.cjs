module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    window: 'readonly',
    document: 'readonly',
    emailjs: 'readonly',
    plausible: 'readonly',
  },
  ignorePatterns: ['dist'],
  rules: {},
};
