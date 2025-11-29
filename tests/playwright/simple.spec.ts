import { test, expect } from '@playwright/test';

test.describe('Geo Visualizer - Basic Tests', () => {
  test('application loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check main application elements
    await expect(page.getByText('Geo Visualizer')).toBeVisible({ timeout: 10000 });
    await expect(page.getByPlaceholder('Search for a location...')).toBeVisible();
    
    // Map should load
    const mapContainer = page.locator('.leaflet-container');
    await expect(mapContainer).toBeVisible();
    
    // Sidebar should be visible
    await expect(page.getByText('Layers & Features')).toBeVisible();
  });

  test('map controls are accessible', async ({ page }) => {
    await page.goto('/');
    
    // Wait for map
    await page.waitForSelector('.leaflet-container');
    
    // Check zoom controls
    await expect(page.locator('button[title="Zoom In"]')).toBeVisible();
    await expect(page.locator('button[title="Zoom Out"]')).toBeVisible();
    await expect(page.locator('button[title="Fullscreen"]')).toBeVisible();
    
    // Check drawing tools
    await expect(page.getByRole('button', { name: /Pan/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Add Point/i })).toBeVisible();
  });

  test('search functionality works', async ({ page }) => {
    await page.goto('/');
    
    const searchInput = page.getByPlaceholder('Search for a location...');
    await searchInput.fill('Berlin, Germany');
    
    // Verify input works
    await expect(searchInput).toHaveValue('Berlin, Germany');
    
    // Search button should be clickable
    const searchButton = page.getByRole('button', { name: 'Search' });
    await expect(searchButton).toBeEnabled();
  });

  test('layer controls are present', async ({ page }) => {
    await page.goto('/');
    
    // Check layer section exists
    await expect(page.getByText('Map Layers')).toBeVisible();
    await expect(page.getByText('Satellite Imagery')).toBeVisible();
    await expect(page.getByText('Drawn Features')).toBeVisible();
    
    // Check toggle switches exist
    const toggleSwitches = page.locator('input[type="checkbox"]');
    await expect(toggleSwitches).toHaveCount(2);
  });
});
