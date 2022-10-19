module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  moduleFileExtensions: ["js", "ts"],
  moduleDirectories: ["node_modules"],
  globals: {
    NODE_ENV: "test",
  },
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["jest-extended/all"],
  testMatch: ["**/*.test.ts"],
};
