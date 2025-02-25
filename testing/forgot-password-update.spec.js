// //update
// import { test, expect } from '@playwright/test';

// // Test 1: Send OTP and move to step 2
// test('ForgotPassword: sends OTP and transitions to step 2', async ({ page }) => {
//   // Intercept the send-otp API call
//   await page.route('**/api/forgot-password/send-otp', async (route, request) => {
//     if (request.method() === 'POST') {
//       const mockResponse = { message: "OTP sent successfully!" };
//       await route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         body: JSON.stringify(mockResponse)
//       });
//     } else {
//       await route.continue();
//     }
//   });

//   await page.goto('http://localhost:5173/forgot-password');
  
//   // Fill in the email and user type
//   await page.fill('input[type="email"]', 'test@example.com');
//   await page.selectOption('select', 'user'); // Assuming option value "user" exists
  
//   // Click the Send OTP button
//   await page.click('button:has-text("Send OTP")');
  
//   // Verify that the heading changes to "Enter OTP" (step 2)
//   const heading = page.locator('h2');
//   await expect(heading).toHaveText("Enter OTP", { timeout: 10000 });
// });

// // Test 2: Verify OTP and move to step 3
// test('ForgotPassword: verifies OTP and transitions to step 3', async ({ page }) => {
//   // Intercept the verify-otp API call
//   await page.route('**/api/forgot-password/verify-otp', async (route, request) => {
//     if (request.method() === 'POST') {
//       const mockResponse = { message: "OTP verified successfully!" };
//       await route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         body: JSON.stringify(mockResponse)
//       });
//     } else {
//       await route.continue();
//     }
//   });
  
//   // Start at step 2 (simulate that the component is already at OTP entry)
//   await page.goto('http://localhost:5173/forgot-password');
  
//   // Here, we assume that navigating to the URL will show step 1,
//   // so we manually set the step to 2 by clicking a button or simulating state.
//   // For testing purposes, you might set a query param or trigger a JS function.
//   // For this example, we assume the test can fill the OTP field.
//   // Fill in OTP and click Verify OTP button
//   await page.fill('input[placeholder="Enter the OTP"]', '123456');
//   await page.click('button:has-text("Verify OTP")');
  
//   // Verify that the heading changes to "Reset Your Password" (step 3)
//   const heading = page.locator('h2');
//   await expect(heading).toHaveText("Reset Your Password", { timeout: 10000 });
// });

// // Test 3: Reset password for a user and navigate to /home
// test('ForgotPassword: resets password for user and navigates to home', async ({ page }) => {
//   // Intercept the reset-password API call
//   await page.route('**/api/forgot-password/reset-password', async (route, request) => {
//     if (request.method() === 'POST') {
//       const mockResponse = { message: "Password reset successfully!" };
//       await route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         body: JSON.stringify(mockResponse)
//       });
//     } else {
//       await route.continue();
//     }
//   });
  
//   // Navigate to forgot password page (assume step 3 is reached)
//   await page.goto('http://localhost:5173/forgot-password');
  
//   // For testing purposes, simulate that step is already 3.
//   // Fill in the new password and confirm password fields.
//   await page.fill('input[placeholder="Enter new password"]', 'StrongP@ssword1');
//   await page.fill('input[placeholder="Confirm your password"]', 'StrongP@ssword1');
  
//   // Click the Reset Password button
//   await page.click('button:has-text("Reset Password")');
  
//   // Verify that the user is navigated to "/home"
//   await expect(page).toHaveURL(/.*\/home/, { timeout: 10000 });
// });

// // Test 4: Reset password for a captain and navigate to /captain-home
// test('ForgotPassword: resets password for captain and navigates to captain home', async ({ page }) => {
//   // Intercept the reset-password API call
//   await page.route('**/api/forgot-password/reset-password', async (route, request) => {
//     if (request.method() === 'POST') {
//       const mockResponse = { message: "Password reset successfully!" };
//       await route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         body: JSON.stringify(mockResponse)
//       });
//     } else {
//       await route.continue();
//     }
//   });
  
//   // Navigate to forgot password page (assume step 3 is reached)
//   await page.goto('http://localhost:5173/forgot-password');
  
//   // Set the user type to "captain" by selecting the option (if not already set)
//   await page.selectOption('select', 'captain');
  
//   // Fill in the new password and confirm password fields.
//   await page.fill('input[placeholder="Enter new password"]', 'StrongP@ssword1');
//   await page.fill('input[placeholder="Confirm your password"]', 'StrongP@ssword1');
  
//   // Click the Reset Password button
//   await page.click('button:has-text("Reset Password")');
  
//   // Verify that the captain is navigated to "/captain-home"
//   await expect(page).toHaveURL(/.*\/captain-home/, { timeout: 10000 });
// });
