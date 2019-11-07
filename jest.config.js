module.exports = {
  verbose: true,
  moduleFileExtensions: [
      "js",
      "json",
      "vue"
  ],
  transform: {
      ".*\\.(vue)$": "vue-jest",
      "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: [
      "src/**/*.{js,vue}",
      "!**/node_modules/**"
  ],
  coverageReporters: [
      "html",
      "text-summary"
  ],
  globals: {
    'vue-jest': {
      pug: {
        doctype: 'html',
      },
    },
  },
}
