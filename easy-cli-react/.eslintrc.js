// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  'extends': [
    'standard-react'
  ],
  // "parser": "babel-eslint",
  'parserOptions': {
    "ecmaFeatures": {
      "jsx": true
    },
    'ecmaVersion': 2017
    // "sourceType": "module"
  },
  env: {
    'es6': true,
    'node': true,
    'browser': true
  },
  plugins: [
    'react'
  ],
  rules: {
    'quotes': [2, 'single'],
    'jsx-quotes': [2, "prefer-double"],
    //"indent": ["error", 2],
    'generator-star-spacing': 'off',
    'eol-last': 'off',
    'func-names': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-undef': 'off',
    'react/jsx-boolean-value': 'off',
    'no-undef': 'off',
    "react/jsx-uses-vars": 2,
    "react/jsx-indent-props": [2, 'first'],
    "react/jsx-curly-spacing": [2, {"when": "always", "allowMultiline": false}],
    "react/prop-types": 0
  }
}
