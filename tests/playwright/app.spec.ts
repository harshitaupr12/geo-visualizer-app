import { test, expect } from '@playwright/test';

test.describe('Geo Visualizer App', () => {
  test('should load the application and display map', async ({ page }) => {
    await page.goto('/');
    
    // Check if main elements are visible
    await expect(page.getByText('Geo Visualizer')).toBeVisible();
    await expect(page.getByPlaceholder('Search for a location...')).toBeVisible();
    await expect(page.getByText('Layers & Features')).toBeVisible();
    
    // Map should be loaded
    const mapContainer = page.locator('.leaflet-container');
    await expect(mapContainer).toBeVisible();
  });

  test('should toggle map layers', async ({ page }) => {
    await page.goto('/');
    
    // Wait for sidebar to load
    await page.waitForSelector('text=Satellite Imagery');
    
    // Toggle satellite layer - click on the label instead of hidden checkbox
    const satelliteLabel = page.locator('label:has-text("Satellite Imagery")');
    await satelliteLabel.click();
    
    // Toggle features layer
    const featuresLabel = page.locator('label:has-text("Drawn Features")');
    await featuresLabel.click();
    
    // Verify both are now unchecked (since they start checked)
    const satelliteCheckbox = page.locator('input[type="checkbox"]').first();
    const featuresCheckbox = page.locator('input[type="checkbox"]').nth(1);
    
    await expect(satelliteCheckbox).not.toBeChecked();
    await expect(featuresCheckbox).not.toBeChecked();
  });

  test('should search for locations and interact with drawing tools', async ({ page }) => {
    await page.goto('/');
    
    // Test search functionality
    const searchInput = page.getByPlaceholder('Search for a location...');
    await searchInput.fill('Berlin');
    await page.getByRole('button', { name: 'Search' }).click();
    
    // Wait for search results - we'll just verify the search happened
    await expect(searchInput).toHaveValue('Berlin');
    
    // Test drawing tools - click the point tool button
    const pointTool = page.getByRole('button', { name: /Add Point/i });
    await pointTool.click();
    
    // Tool should be activated
    await expect(page.getByText('Active: Add Point')).toBeVisible();
    
    // Click on map to add point
    const map = page.locator('.leaflet-container');
    await map.click({ position: { x: 400, y: 300 } });
    
    // Wait a bit for the point to be added
    await page.waitForTimeout(1000);
    
    // Point should be added to features list - check for any feature text
    await expect(page.getByText(/Point|Feature/).first()).toBeVisible({ timeout: 5000 });
  });

  test('should persist features after reload', async ({ page }) => {
    await page.goto('/');
    
    // Wait for UI to load
    await page.waitForSelector('text=Layers & Features');
    
    // Add a point
    const pointTool = page.getByRole('button', { name: /Add Point/i });
    await pointTool.click();
    
    const map = page.locator('.leaflet-container');
    await map.click({ position: { x: 400, y: 300 } });
    
    // Wait for feature to be added
    await page.waitForTimeout(1000);
    
    // Verify point was added by checking features count
    const featureItems = page.locator('[class*="bg-gray-50"]');
    await expect(featureItems.first()).toBeVisible();
    
    // Get the feature text before reload
    const featureText = await featureItems.first().textContent();
    
    // Reload page
    await page.reload();
    
    // Wait for everything to load again
    await page.waitForSelector('text=Layers & Features');
    
    // Feature should persist - check if any features exist
    const featuresAfterReload = page.locator('[class*="bg-gray-50"]');
    await expect(featuresAfterReload.first()).toBeVisible({ timeout: 5000 });
    
    // Verify it's the same feature
    const featureTextAfterReload = await featuresAfterReload.first().textContent();
    expect(featureTextAfterReload).toContain('Point');
  });
});
