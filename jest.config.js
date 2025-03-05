/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)?$": ["ts-jest", {}]
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1" // @ 경로를 src 디렉토리로 매핑
  }
};
