module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  extends: ['airbnb-base'],
  env: {
    node: true,
  },
  rules: {
    'comma-dangle': [2, 'always-multiline'],
    complexity: 1,
  },
  overrides: [{
    files: ['routes/**/*.js'],

    'rules': {
      'import/prefer-default-export': 0,
    },
  }, {
    files: ['tests/**/*.js'],
    env: {
      mocha: true
    },
    globals: {
      rootRequire: true,
      rootPath: true
    }
  }]
}
