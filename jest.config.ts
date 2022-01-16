/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

import type { Config } from '@jest/types';
import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: './' });

const jestConfig: Config.InitialOptions = {
  clearMocks: true,

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/src/**/data/',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/data/',
    '<rootDir>/src/.+/data/',
    '<rootDir>/src/components/markdown/',
  ],
  coverageReporters: ['json', 'json-summary', 'text', 'lcov', 'clover'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },

  moduleDirectories: ['node_modules', 'src'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^public/(.*)': '<rootDir>/public/$1',
    '^@/(.*)': '<rootDir>/src/$1',
    '^#/(.*)': '<rootDir>/src/pages/api/$1',
    '^~/(.*)': '<rootDir>/src/modules/$1',
  },

  // Automatically reset mock state between every test
  resetMocks: true,

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src'],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: 'jest-circus',

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['dotenv/config'],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],

  // The number of seconds after which a test is considered as slow and reported as such in the results.
  // slowTestThreshold: 5,

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-jsdom',

  // This option allows use of a custom test runner
  testRunner: 'jest-circus/runner',

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],

  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],

  // Whether to use watchman for file crawling
  // watchman: true,
};

export default createJestConfig(jestConfig);
