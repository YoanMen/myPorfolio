module.exports = {
  transform: {
    '^.+\\.jsx?$': ['babel-jest', { configFile: './babel.config.test.js' }]
  },
  testPathIgnorePatterns: [
    '/babel.config.test.js$'
  ],
  transformIgnorePatterns: [
    "/node_modules/(?!is-svg)"
  ],
};
