import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    browserName: 'chromium', // ✅ Force Playwright to use Chromium
    headless: false, // Run in non-headless mode for debugging
  },
});
