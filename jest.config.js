module.exports = {
  transform: {
    '^.+\\.jsx?$': ['babel-jest', { configFile: './babel.config.test.js' }]
  },
  testPathIgnorePatterns: [
    '/babel.config.test.js$'
  ]
};
