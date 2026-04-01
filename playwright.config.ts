import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./test",
  timeout: 60000,
  use: {
    baseURL: "http://localhost:5173",
    headless: true,
  },
});