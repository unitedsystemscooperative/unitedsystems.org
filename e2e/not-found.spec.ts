import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/not-found');

  await expect(page).toHaveTitle('United Systems Cooperative');
});

test('matches snapshot', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/not-found');

  await expect(page).toHaveScreenshot();
});
