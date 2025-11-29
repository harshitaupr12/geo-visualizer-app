import { test as setup } from '@playwright/test';

setup('global setup', async ({ page }) => {
  // Navigate to the app and wait for it to be fully loaded
  await page.goto('/');
  await page.waitForSelector('.leaflet-container', { timeout: 10000 });
});
