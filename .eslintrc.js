module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  plugins: [
    'html',
    'vue'
  ],
  'rules': {
    'arrow-parens': 0,
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'eol-last': 0,
    'semi': ['error', 'always'],
    'space-before-function-paren': 0,
    'no-useless-escape': 0
  }
}
