import { test, expect } from '@playwright/test';

test('Settings: deletes account and navigates to signup', async ({ page }) => {
  // Intercept DELETE API call to delete account
  await page.route('**/users/delete', async (route, request) => {
    if (request.method() === 'DELETE') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: "Account deleted successfully!" })
      });
    } else {
      await route.continue();
    }
  });

  // Pre-populate localStorage with dummy token and user data so Settings page renders
  await page.addInitScript(() => {
    localStorage.setItem("token", "dummyToken");
    localStorage.setItem("user", JSON.stringify({
      _id: "user123",
      fullname: { firstname: "Alice", lastname: "Smith" },
      phonenumber: "1234567890",
      profilePicture: ""
    }));
  });

  // Navigate to the Settings page
  await page.goto('http://localhost:5173/settings');

  // Click the "Delete Account" option (assumes the text "Delete Account" is visible)
  await page.click('text=Delete Account');

  // Wait for the Delete Account confirmation modal to appear.
  // We assume the modal shows a heading with "Confirm Delete"
  const modalHeading = page.locator('text=Confirm Delete');
  await expect(modalHeading).toBeVisible({ timeout: 10000 });

  // Click the "Yes" button in the modal to confirm deletion
  await page.click('button:has-text("Yes")');

  // Verify that after deletion, the app navigates to the signup page ("/signup")
  await expect(page).toHaveURL(/.*\/signup/, { timeout: 10000 });
});


test('CaptainSettings: deletes account and navigates to captain signup', async ({ page }) => {
  // Intercept the DELETE API call to the delete endpoint
  await page.route('**/captains/delete', async (route, request) => {
    if (request.method() === 'DELETE') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: "Account deleted successfully!" })
      });
    } else {
      await route.continue();
    }
  });

  // Pre-populate localStorage with dummy captain data and token
  await page.addInitScript(() => {
    localStorage.setItem("token", "dummyToken");
    localStorage.setItem("user", JSON.stringify({
      _id: "captain123",
      fullname: { firstname: "Captain", lastname: "Marvel" },
      phonenumber: "9876543210",
      profilePicture: "",
      theme: "light"
    }));
  });

  // Navigate to the CaptainSettings page
  await page.goto('http://localhost:5173/captain-settings');

  // Click the "Delete Account" option.
  // Adjust the selector if needed; here we assume that the text "Delete Account" is visible.
  await page.click('text=Delete Account');

  // Wait for the delete confirmation modal to appear.
  // We assume the modal contains a heading "Confirm Delete"
  const modalHeading = page.locator('text=Confirm Delete');
  await expect(modalHeading).toBeVisible({ timeout: 10000 });

  // Click the "Yes" button in the modal to confirm deletion.
  await page.click('button:has-text("Yes")');

  // Verify that after deletion, the app navigates to the captain signup page.
  await expect(page).toHaveURL(/.*\/captain-signup/, { timeout: 10000 });
});

// Test 3: Cancel delete operation on Settings page
test('Settings: cancel account deletion and remain on settings page', async ({ page }) => {
  // For this test, we do not intercept the DELETE API because we are canceling deletion.
  
  // Pre-populate localStorage with dummy token and user data
  await page.addInitScript(() => {
    localStorage.setItem("token", "dummyToken");
    localStorage.setItem("user", JSON.stringify({
      _id: "user123",
      fullname: { firstname: "Alice", lastname: "Smith" },
      phonenumber: "1234567890",
      profilePicture: ""
    }));
  });
  
  // Navigate to the Settings page
  await page.goto('http://localhost:5173/settings');
  
  // Click the "Delete Account" option.
  await page.click('text=Delete Account');
  
  // Wait for the delete confirmation modal to appear.
  const modalHeading = page.locator('text=Confirm Delete');
  await expect(modalHeading).toBeVisible({ timeout: 10000 });
  
  // Click the "No" button in the modal to cancel deletion.
  await page.click('button:has-text("No")');
  
  // Verify that the modal is closed and the URL remains on settings
  await expect(modalHeading).toHaveCount(0, { timeout: 10000 });
  await expect(page).toHaveURL(/.*\/settings/, { timeout: 10000 });
});

test('CaptainSettings: cancel account deletion and remain on captain settings page', async ({ page }) => {
  // Pre-populate localStorage with dummy token and captain data
  await page.addInitScript(() => {
    localStorage.setItem("token", "dummyToken");
    localStorage.setItem("user", JSON.stringify({
      _id: "captain123",
      fullname: { firstname: "Captain", lastname: "Marvel" },
      phonenumber: "9876543210",
      profilePicture: "",
      theme: "light"
    }));
  });

  // Navigate to the CaptainSettings page
  await page.goto('http://localhost:5173/captain-settings');

  // Click the "Delete Account" option (assumes "Delete Account" text is visible)
  await page.click('text=Delete Account');

  // Wait for the delete confirmation modal to appear.
  const modalHeading = page.locator('text=Confirm Delete');
  await expect(modalHeading).toBeVisible({ timeout: 10000 });

  // Click the "No" button in the modal to cancel deletion.
  await page.click('button:has-text("No")');

  // Verify that the modal is closed and the URL remains on the CaptainSettings page.
  await expect(modalHeading).toHaveCount(0, { timeout: 10000 });
  await expect(page).toHaveURL(/.*\/captain-settings/, { timeout: 10000 });
});
