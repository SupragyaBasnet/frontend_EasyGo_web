import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run dev', // Adjust this command to match your app's start command
    port: 5173,
    timeout: 120 * 1000, // Increase timeout if necessary
    reuseExistingServer: !process.env.CI,
  },
  // other config options...
});
