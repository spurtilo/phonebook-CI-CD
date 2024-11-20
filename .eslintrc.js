module.exports = {
  env: {
    commonjs: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'prettier',
    'prettier/prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    quotes: ['error', 'single'],
    'no-console': 0,
    'no-underscore-dangle': 0,
  },
};
