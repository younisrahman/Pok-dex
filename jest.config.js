module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|expo(nent)?|@expo(nent)?/.*|react-native-reanimated|react-native-worklets)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/screens/**/*.tsx',
    'src/utils/**/*.ts',
    'src/api/**/*.ts',
  ],
  coverageThreshold: {
    global: {
      lines: 60,
    },
  },
};
