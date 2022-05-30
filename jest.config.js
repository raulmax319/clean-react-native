module.exports = {
  preset: 'react-native',
  roots: ['<rootDir>/__tests__/'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.styles.ts',
    '!<rootDir>/src/main/**/*',
    '!**/*.d.ts',
    '!**/*/index.ts',
  ],
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
    '^.+\\.(tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
    '<root>/(.*)': '<rootDir>/$1',
  },
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/__mocks__/mock-async-storage.js',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
  ],
};
