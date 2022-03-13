module.exports = {
  rootDir: '.',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [ '<rootDir>/tests/**/*.spec.ts' ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/**/__*__/*',
  ],
  moduleFileExtensions: [ 'ts', 'tsx', 'js', 'jsx', 'json' ],
  setupFiles: [ __dirname + '/jest.setup.js' ],
  coverageReporters: [ 'lcov', 'text' ],
}