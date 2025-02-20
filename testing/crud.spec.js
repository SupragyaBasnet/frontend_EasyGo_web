import { expect, test } from '@playwright/test';
import mockData from './mockData.js'; // ✅ Use `import` for ES Modules

test.describe('CRUD Operations', () => {
  
  // ✅ 1. Create User
  test('Create User', async ({ page }) => {
    await page.goto('http://localhost:4000/users/create');
    await page.waitForSelector('#name', { timeout: 10000 });
    await page.fill('#name', mockData.user.name);
    await page.fill('#email', mockData.user.email);
    await page.fill('#phone', mockData.user.phone);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*users/);
  });

  // ✅ 2. Read User
  test('Read User', async ({ page }) => {
    await page.goto('http://localhost:4000/users');
    await page.waitForTimeout(5000);
    await expect(page.locator(`text=${mockData.user.name}`)).toBeVisible();
  });

  // ✅ 3. Update User
  test('Update User', async ({ page }) => {
    await page.goto('http://localhost:4000/users/1/edit');
    await page.waitForSelector('#name', { timeout: 10000 });
    await page.fill('#name', 'John Updated');
    await page.click('button[type="submit"]');
    await expect(page.locator('.success-message')).toContainText('User updated successfully');
  });

  // ✅ 4. Delete User
  test('Delete User', async ({ page }) => {
    await page.goto('http://localhost:4000/users');
    await page.waitForTimeout(5000);
    await page.click(`text=${mockData.user.name} >> button[aria-label="Delete"]`);
    await page.click('button.confirm-delete');
    await expect(page.locator(`text=${mockData.user.name}`)).not.toBeVisible();
  });

  // ✅ 5. Create Captain
  test('Create Captain', async ({ page }) => {
    await page.goto('http://localhost:4000/captains/create');
    await page.waitForSelector('#firstname', { timeout: 10000 });
    await page.fill('#firstname', mockData.captain.fullname.firstname);
    await page.fill('#lastname', mockData.captain.fullname.lastname);
    await page.fill('#phonenumber', mockData.captain.phonenumber);
    await page.fill('#email', mockData.captain.email);
    await page.fill('#password', mockData.captain.password);
    await page.fill('#vehicleName', mockData.captain.vehicle.name);
    await page.fill('#plate', mockData.captain.vehicle.plate);
    await page.fill('#capacity', mockData.captain.vehicle.capacity);
    await page.selectOption('#vehicleType', mockData.captain.vehicle.vehicleType);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*captains/);
  });

  // ✅ 6. Read Captain
  test('Read Captain', async ({ page }) => {
    await page.goto('http://localhost:4000/captains');
    await page.waitForTimeout(5000);
    await expect(page.locator(`text=${mockData.captain.fullname.firstname}`)).toBeVisible();
  });

  // ✅ 7. Update Captain
  test('Update Captain', async ({ page }) => {
    await page.goto('http://localhost:4000/captains/1/edit');
    await page.waitForSelector('#firstname', { timeout: 10000 });
    await page.fill('#firstname', 'Supragya Updated');
    await page.click('button[type="submit"]');
    await expect(page.locator('.success-message')).toContainText('Captain updated successfully');
  });

  // ✅ 8. Delete Captain
  test('Delete Captain', async ({ page }) => {
    await page.goto('http://localhost:4000/captains');
    await page.waitForTimeout(5000);
    await page.click(`text=${mockData.captain.fullname.firstname} >> button[aria-label="Delete"]`);
    await page.click('button.confirm-delete');
    await expect(page.locator(`text=${mockData.captain.fullname.firstname}`)).not.toBeVisible();
  });

  // ✅ 9. Create Ride
  test('Create Ride', async ({ page }) => {
    await page.goto('http://localhost:4000/rides/create');
    await page.waitForSelector('#pickup', { timeout: 10000 });
    await page.fill('#pickup', mockData.ride.pickup);
    await page.fill('#destination', mockData.ride.destination);
    await page.fill('#fare', mockData.ride.fare.toString());
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*rides/);
  });

  // ✅ 10. Read Ride
  test('Read Ride', async ({ page }) => {
    await page.goto('http://localhost:4000/rides');
    await page.waitForTimeout(5000);
    await expect(page.locator(`text=${mockData.ride.pickup}`)).toBeVisible();
  });

  // ✅ 11. Update Ride
  test('Update Ride', async ({ page }) => {
    await page.goto('http://localhost:4000/rides/1/edit');
    await page.waitForSelector('#pickup', { timeout: 10000 });
    await page.fill('#pickup', 'Updated Pickup Location');
    await page.click('button[type="submit"]');
    await expect(page.locator('.success-message')).toContainText('Ride updated successfully');
  });

  // ✅ 12. Delete Ride
  test('Delete Ride', async ({ page }) => {
    await page.goto('http://localhost:4000/rides');
    await page.waitForTimeout(5000);
    await page.click(`text=${mockData.ride.pickup} >> button[aria-label="Delete"]`);
    await page.click('button.confirm-delete');
    await expect(page.locator(`text=${mockData.ride.pickup}`)).not.toBeVisible();
  });

  // ✅ 13. Create Admin
  test('Create Admin', async ({ page }) => {
    await page.goto('http://localhost:4000/admins/create');
    await page.waitForSelector('#username', { timeout: 10000 });
    await page.fill('#username', mockData.admin.username);
    await page.fill('#email', mockData.admin.email);
    await page.fill('#password', mockData.admin.password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*admins/);
  });

  // ✅ 14. Read Admin
  test('Read Admin', async ({ page }) => {
    await page.goto('http://localhost:4000/admins');
    await page.waitForTimeout(5000);
    await expect(page.locator(`text=${mockData.admin.username}`)).toBeVisible();
  });

  // ✅ 15. Update Admin
  test('Update Admin', async ({ page }) => {
    await page.goto('http://localhost:4000/admins/1/edit');
    await page.waitForSelector('#username', { timeout: 10000 });
    await page.fill('#username', 'Admin Updated');
    await page.click('button[type="submit"]');
    await expect(page.locator('.success-message')).toContainText('Admin updated successfully');
  });

  // ✅ 16. Delete Admin
  test('Delete Admin', async ({ page }) => {
    await page.goto('http://localhost:4000/admins');
    await page.waitForTimeout(5000);
    await page.click(`text=${mockData.admin.username} >> button[aria-label="Delete"]`);
    await page.click('button.confirm-delete');
    await expect(page.locator(`text=${mockData.admin.username}`)).not.toBeVisible();
  });

});
