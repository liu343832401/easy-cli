// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  'extends': [
    'eslint-config-standard'
  ],
  /*"parser": "babel-eslint",*/
  'parserOptions': {
    'ecmaVersion': 2017
    //"sourceType": "module"
  },
  env: {
    'es6': true,
    'node': true,
    'browser': true
  },
  plugins: [
    'vue',
    'jsx'
  ],
  rules: {
    'quotes': [2, 'single'],
    // allow async-await
    'generator-star-spacing': 'off',
    'func-names': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, {'x-invalid-end-tag': false}],
    'no-undef': 'off',
    "jsx/uses-factory": [1, {"pragma": "JSX"}],
    "jsx/factory-in-scope": [1, {"pragma": "JSX"}],
    "jsx/mark-used-vars": 1,
    "jsx/no-undef": 1
  }
}
