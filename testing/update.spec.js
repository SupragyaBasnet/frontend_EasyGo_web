import { test, expect } from '@playwright/test';

test('CaptainSettings: updates theme setting and applies new theme', async ({ page }) => {
  // Intercept the update-settings API call
  await page.route('**/captains/update-settings', async (route, request) => {
    if (request.method() === 'PUT') {
      // For this test, simulate that the server responds with the updated theme.
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ theme: "dark" }),
      });
    } else {
      await route.continue();
    }
  });

  // For testing, pre-populate localStorage with dummy captain data and token.
  await page.addInitScript(() => {
    localStorage.setItem("token", "dummyToken");
    localStorage.setItem("user", JSON.stringify({
      _id: "captain123",
      fullname: { firstname: "John", lastname: "Doe" },
      theme: "light", // initial theme is light
    }));
  });

  // Navigate to the CaptainSettings page
  await page.goto('http://localhost:5173/captain-settings');

  // Locate the theme selector. (Ensure the select element renders with the expected options.)
  const themeSelect = page.locator('select');
  await expect(themeSelect).toBeVisible({ timeout: 10000 });

  // Change the theme to "dark"
  await themeSelect.selectOption('dark');

  // Optionally, trigger a blur or wait briefly if needed
  // await page.click('body');

  // Verify that the update was applied by checking the document's data-theme attribute.
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark', { timeout: 10000 });
});

test('Settings: updates theme and saves to localStorage', async ({ page }) => {
  // Intercept GET /profile API call to provide dummy user data
  await page.route('**/users/profile', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        _id: 'user123',
        fullname: { firstname: 'Alice', lastname: 'Smith' },
        phonenumber: '1234567890',
        nightMode: false,
        profilePicture: ""
      }),
    });
  });

  // Pre-populate localStorage with a dummy token and user data
  await page.addInitScript(() => {
    localStorage.setItem("token", "dummyToken");
    localStorage.setItem("user", JSON.stringify({
      _id: 'user123',
      fullname: { firstname: 'Alice', lastname: 'Smith' },
      phonenumber: '1234567890',
      nightMode: false,
      profilePicture: ""
    }));
  });

  // Navigate to the Settings page
  await page.goto('http://localhost:5173/settings');

  // Wait for the theme selector to be visible
  const themeSelect = page.locator('select');
  await expect(themeSelect).toBeVisible({ timeout: 10000 });

  // Change the theme to "dark"
  await themeSelect.selectOption('dark');

  // Verify that the document's data-theme attribute is updated to "dark"
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark', { timeout: 10000 });

  // Verify that localStorage now has "dark" stored for "daisyTheme"
  const storedTheme = await page.evaluate(() => localStorage.getItem("daisyTheme"));
  expect(storedTheme).toBe("dark");
});
// Full flow for a regular user
test('ForgotPassword: full flow for user', async ({ page }) => {
  // Intercept the send-otp API call
  await page.route('**/api/forgot-password/send-otp', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: "OTP sent successfully!" })
    });
  });

  // Intercept the verify-otp API call
  await page.route('**/api/forgot-password/verify-otp', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: "OTP verified successfully!" })
    });
  });

  // Intercept the reset-password API call
  await page.route('**/api/forgot-password/reset-password', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: "Password reset successfully!" })
    });
  });

  // Navigate to the ForgotPassword page
  await page.goto('http://localhost:5173/forgot-password');

  // --- Step 1: Send OTP ---
  await page.fill('input[placeholder="Enter your email"]', 'user@example.com');
  await page.selectOption('select', 'user');
  await page.click('button:has-text("Send OTP")');

  // Wait for heading to update to "Enter OTP" (Step 2)
  const heading = page.locator('h2');
  await expect(heading).toHaveText("Enter OTP", { timeout: 15000 });

  // --- Step 2: Verify OTP ---
  await page.fill('input[placeholder="Enter the OTP"]', '123456');
  await page.click('button:has-text("Verify OTP")');

  // Wait for heading to update to "Reset Your Password" (Step 3)
  await expect(heading).toHaveText("Reset Your Password", { timeout: 15000 });

  // --- Step 3: Reset Password ---
  await page.fill('input[placeholder="Enter new password"]', 'StrongP@ssword1');
  await page.fill('input[placeholder="Confirm your password"]', 'StrongP@ssword1');
  await page.click('button:has-text("Reset Password")');

  // Verify that after a successful reset, the user is navigated to "/login"
  await expect(page).toHaveURL(/.*\/login/, { timeout: 15000 });
});

// Full flow for a captain
test('ForgotPassword: full flow for captain', async ({ page }) => {
  // Intercept the send-otp API call
  await page.route('**/api/forgot-password/send-otp', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: "OTP sent successfully!" })
    });
  });

  // Intercept the verify-otp API call
  await page.route('**/api/forgot-password/verify-otp', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: "OTP verified successfully!" })
    });
  });

  // Intercept the reset-password API call
  await page.route('**/api/forgot-password/reset-password', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: "Password reset successfully!" })
    });
  });

  // Navigate to the ForgotPassword page
  await page.goto('http://localhost:5173/forgot-password');

  // Set the user type to "captain"
  await page.selectOption('select', 'captain');

  // --- Step 1: Send OTP ---
  await page.fill('input[placeholder="Enter your email"]', 'captain@example.com');
  await page.click('button:has-text("Send OTP")');

  // Wait for heading to update to "Enter OTP" (Step 2)
  const heading = page.locator('h2');
  await expect(heading).toHaveText("Enter OTP", { timeout: 15000 });

  // --- Step 2: Verify OTP ---
  await page.fill('input[placeholder="Enter the OTP"]', '123456');
  await page.click('button:has-text("Verify OTP")');

  // Wait for heading to update to "Reset Your Password" (Step 3)
  await expect(heading).toHaveText("Reset Your Password", { timeout: 15000 });

  // --- Step 3: Reset Password ---
  await page.fill('input[placeholder="Enter new password"]', 'StrongP@ssword1');
  await page.fill('input[placeholder="Confirm your password"]', 'StrongP@ssword1');
  await page.click('button:has-text("Reset Password")');

  // Verify that after a successful reset, the captain is navigated to "/captain-login"
  await expect(page).toHaveURL(/.*\/captain-login/, { timeout: 15000 });
});