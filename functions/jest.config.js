/**
 * npx ts-jest config:init
 *
 * This will create a file named jest.config.js with a setting for jest to use the preprocessor js-test.
 * @see https://blog.logrocket.com/testing-typescript-apps-using-jest/
 */

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
