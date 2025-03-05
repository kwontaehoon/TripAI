/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+.(js|jsx|ts|tsx)?$": ["ts-jest",{}],
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest" // @/app/main/one 처럼 @ 경로 설정
  },
};