//create
import { expect, test } from '@playwright/test';
test('UserSignup: registers a new user and navigates to login page', async ({ page }) => {
  // Intercept POST requests to the /users/register endpoint
  await page.route('**/users/register', async (route, request) => {
    if (request.method() === 'POST') {
      // Define the mock response
      const mockResponse = {
        user: { id: 1, email: 'john@example.com' },
        token: 'fakeToken123'
      };
      // Fulfill the intercepted request with the mock response
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify(mockResponse),
      });
    } else {
      route.continue();
    }
  });

  // Navigate to the UserSignup page (adjust the URL as per your app)
  await page.goto('http://localhost:5173/signup');

  // Fill out the form fields
  await page.fill('input[placeholder="First Name"]', 'John');
  await page.fill('input[placeholder="Last Name"]', 'Doe');
  await page.fill('input[type="email"]', 'john@example.com');
  // Phone number field – note the placeholder might be different
  await page.fill('input[placeholder="**********"]', '9876543210');
  // Fill in a strong password that meets the regex requirement
  await page.fill('input[placeholder="Enter your password"]', 'StrongP@ssword1');

  // Submit the form
  await page.click('button[type="submit"]');

  // Verify navigation to the login page (assuming URL contains '/login')
  await expect(page).toHaveURL(/.*\/login/);
});
test('CaptainSignup: registers a new captain and navigates to captain login page', async ({ page }) => {
  // Intercept POST requests to the /captains/register endpoint.
  await page.route('**/captains/register', async (route, request) => {
    if (request.method() === 'POST') {
      // Define your mock response.
      const mockResponse = {
        captain: { id: 1, email: 'captain@example.com' },
        token: 'fakeCaptainToken',
      };
      // Fulfill the intercepted request with the mock response.
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify(mockResponse),
      });
    } else {
      route.continue();
    }
  });

  // Navigate to the CaptainSignup page.
  // Ensure that the URL matches the one served by your Vite app. Here, we assume port 5173.
  await page.goto('http://localhost:5173/captain-signup');

  // Fill out the form fields.
  await page.fill('input[placeholder="First Name"]', 'CaptainFirst');
  await page.fill('input[placeholder="Last Name"]', 'CaptainLast');
  await page.fill('input[type="email"]', 'captain@example.com');
  await page.fill('input[placeholder="**********"]', '9876543210');
  // Use a strong password meeting the criteria (at least 8 characters, uppercase, lowercase, number, and special character)
  await page.fill('input[placeholder="Enter your password"]', 'StrongP@ssword1');

  // Fill out vehicle information.
  await page.fill('input[placeholder="Enter vehicle name"]', 'My Vehicle');
  await page.fill('input[placeholder="Enter vehicle plate"]', 'AB-1234');
  await page.fill('input[placeholder="Enter vehicle capacity"]', '4');
  // Select the vehicle type (for example, "car")
  await page.selectOption('select', { label: 'car' });

  // Click the "Sign Up" button.
  await page.click('button[type="submit"]');

  // Assert that the app navigates to the captain login page.
  await expect(page).toHaveURL(/.*\/captain-login/);
});


test('UserLogin: logs in a user and navigates to home page', async ({ page }) => {
  await page.route('**/users/login', async (route, request) => {
    const mockResponse = {
      user: { id: 1, phonenumber: '9876543210', email: 'john@example.com' },
      token: 'fakeUserToken123'
    };
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockResponse),
    });
  });

  await page.goto('http://localhost:5173/login');
  
  await page.fill('input[placeholder="**********"]', '9876543210');
  await page.fill('input[placeholder="Enter your password"]', 'StrongP@ssword1');
  
  // Log the current URL before clicking
  console.log('Before login:', await page.url());
  
  await page.click('button[type="submit"]');
  
  // Wait for navigation
  await page.waitForNavigation({ timeout: 10000 });

  // Log the current URL after login
  console.log('After login:', await page.url());

  await expect(page).toHaveURL(/.*\/home/, { timeout: 10000 });
});

test('CaptainLogin: logs in a captain and navigates to captain home page', async ({ page }) => {
  // Mock the captain login API response
  await page.route('**/captains/login', async (route, request) => {
    const mockResponse = {
      captain: { id: 1, phonenumber: '9876543210', email: 'captain@example.com' },
      token: 'fakeCaptainToken123'
    };
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockResponse),
    });
  });

  // Go to the captain login page
  await page.goto('http://localhost:5173/captain-login');

  // Fill in the captain login form
  await page.fill('input[placeholder="**********"]', '9876543210'); // Assuming it's phone number
  await page.fill('input[placeholder="Enter your password"]', 'CaptainP@ssword1');
  
  // Log the current URL before clicking the submit button
  console.log('Before captain login:', await page.url());

  // Click the submit button
  await page.click('button[type="submit"]');
  
  // Wait for the page to navigate after login
  await page.waitForNavigation({ timeout: 10000 });

  // Log the current URL after the login attempt
  console.log('After captain login:', await page.url());

  // Now check if the URL changed to the captain's home page
  await expect(page).toHaveURL(/.*\/captain-home/, { timeout: 10000 });
});
