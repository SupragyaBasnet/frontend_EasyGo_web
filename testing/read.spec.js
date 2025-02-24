import { test, expect } from '@playwright/test';

test.describe('User Settings - Read Operations', () => {
  // Test 1: Verify that the user profile card displays the correct information.
  test('Settings: displays user profile details', async ({ page }) => {
    // Intercept the GET request for user profile and return dummy data.
    await page.route('**/users/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          _id: "user123",
          fullname: { firstname: "Alice", lastname: "Smith" },
          phonenumber: "1234567890",
          profilePicture: ""
        }),
      });
    });

    // Pre-populate localStorage with a dummy token.
    await page.addInitScript(() => {
      localStorage.setItem("token", "dummyToken");
    });

    // Navigate to the Settings page.
    await page.goto('http://localhost:5173/settings');

    // Verify that the profile card displays the user's full name.
    const nameHeading = page.locator('h2').filter({ hasText: /Alice/i });
    await expect(nameHeading).toBeVisible({ timeout: 10000 });

    // Verify that the phone number is displayed.
    const phoneText = page.locator('text=1234567890');
    await expect(phoneText).toBeVisible({ timeout: 10000 });
  });

  // Test 2: Verify that the theme stored in localStorage is applied to the document.
  test('Settings: applies stored theme from localStorage', async ({ page }) => {
    // Set the theme in localStorage.
    await page.addInitScript(() => {
      localStorage.setItem("daisyTheme", "cupcake");
    });

    // Navigate to the Settings page.
    await page.goto('http://localhost:5173/settings');

    // Verify that the document has the correct data-theme attribute.
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'cupcake', { timeout: 10000 });
  });
});


test.describe('CaptainSettings - Read Operations', () => {
  // Test 1: Verify that the captain profile card displays the correct information.
  test('CaptainSettings: displays captain profile details', async ({ page }) => {
    // Intercept the GET request for captain profile and return dummy data.
    await page.route('**/captains/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          captain: {
            _id: "captain123",
            fullname: { firstname: "Captain", lastname: "Marvel" },
            phonenumber: "9876543210",
            profilePicture: "",
            theme: "light"
          }
        }),
      });
    });

    // Pre-populate localStorage with a dummy token.
    await page.addInitScript(() => {
      localStorage.setItem("token", "dummyToken");
    });

    // Navigate to the CaptainSettings page.
    await page.goto('http://localhost:5173/captain-settings');

    // Verify that the profile card displays the captain's full name.
    const nameHeading = page.locator('h2').filter({ hasText: /Captain/i });
    await expect(nameHeading).toBeVisible({ timeout: 10000 });

    // Verify that the phone number is displayed.
    const phoneText = page.locator('text=9876543210');
    await expect(phoneText).toBeVisible({ timeout: 10000 });
  });

  // Test 2: Verify that the theme stored in localStorage is applied on the CaptainSettings page.
  test('CaptainSettings: applies stored theme from localStorage', async ({ page }) => {
    // Pre-populate localStorage with a theme (e.g., "synthwave")
    await page.addInitScript(() => {
      localStorage.setItem("daisyTheme", "synthwave");
    });

    // Navigate to the CaptainSettings page.
    await page.goto('http://localhost:5173/captain-settings');

    // Verify that the document has the correct data-theme attribute.
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'synthwave', { timeout: 10000 });
  });
});