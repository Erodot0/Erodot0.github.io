import airbnbBase from 'eslint-config-airbnb-base';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['docs/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        emailjs: 'readonly',
      },
    },
    extends: [airbnbBase, eslintConfigPrettier],
    rules: {},
  },
];
