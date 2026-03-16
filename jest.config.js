/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jsdom",
  testMatch: [
    "<rootDir>/src/**/*.spec.ts",
    "<rootDir>/src/**/*.test.ts",
    "<rootDir>/test/unit/**/*.spec.ts",
    "<rootDir>/test/unit/**/*.test.ts",
  ],
  transform: {
    "^.+.(js|jsx|ts|tsx)?$": ["ts-jest",{}],
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest" // @/app/main/one 처럼 @ 경로 설정
  },
};