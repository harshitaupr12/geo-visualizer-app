import { test, expect } from '@playwright/test';

test.describe('Basic Working Tests', () => {
  test('app loads and shows basic elements', async ({ page }) => {
    // Give more time for app to load
    await page.goto('/', { timeout: 30000 });
    
    // Wait for React to load
    await page.waitForTimeout(3000);
    
    // Check basic elements exist
    const title = page.getByText('Geo Visualizer');
    await expect(title).toBeVisible({ timeout: 10000 });
    
    // Check map container exists
    const mapContainer = page.locator('.leaflet-container');
    await expect(mapContainer).toBeVisible({ timeout: 10000 });
  });

  test('map controls are present', async ({ page }) => {
    await page.goto('/', { timeout: 30000 });
    await page.waitForTimeout(3000);
    
    // Check zoom controls
    const zoomIn = page.locator('button[title="Zoom In"]');
    const zoomOut = page.locator('button[title="Zoom Out"]');
    
    await expect(zoomIn).toBeVisible({ timeout: 5000 });
    await expect(zoomOut).toBeVisible({ timeout: 5000 });
  });

  test('drawing tools are accessible', async ({ page }) => {
    await page.goto('/', { timeout: 30000 });
    await page.waitForTimeout(3000);
    
    // Check drawing tools exist
    const pointTool = page.getByRole('button', { name: /Add Point/i });
    await expect(pointTool).toBeVisible({ timeout: 5000 });
    
    const polygonTool = page.getByRole('button', { name: /Draw Polygon/i });
    await expect(polygonTool).toBeVisible({ timeout: 5000 });
  });
});
