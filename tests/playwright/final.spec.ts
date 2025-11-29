import { test, expect } from '@playwright/test';

test.describe('Geo Visualizer - Final Tests', () => {
  test('application loads successfully with all main components', async ({ page }) => {
    await page.goto('/');
    
    // Check main application elements with generous timeout
    await expect(page.getByText('Geo Visualizer')).toBeVisible({ timeout: 15000 });
    await expect(page.getByPlaceholder('Search for a location...')).toBeVisible();
    
    // Map should load
    const mapContainer = page.locator('.leaflet-container');
    await expect(mapContainer).toBeVisible({ timeout: 15000 });
    
    // Sidebar should be visible
    await expect(page.getByText('Layers & Features')).toBeVisible();
  });

  test('all map controls are present and accessible', async ({ page }) => {
    await page.goto('/');
    
    // Wait for map to ensure everything is loaded
    await page.waitForSelector('.leaflet-container', { timeout: 15000 });
    
    // Check zoom controls exist
    await expect(page.locator('button[title="Zoom In"]')).toBeVisible();
    await expect(page.locator('button[title="Zoom Out"]')).toBeVisible();
    await expect(page.locator('button[title="Fullscreen"]')).toBeVisible();
    
    // Check drawing tools exist
    await expect(page.getByRole('button', { name: /Pan/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Add Point/i })).toBeVisible();
  });

  test('search functionality is operational', async ({ page }) => {
    await page.goto('/');
    
    const searchInput = page.getByPlaceholder('Search for a location...');
    await expect(searchInput).toBeVisible();
    
    // Test input functionality
    await searchInput.fill('Berlin, Germany');
    await expect(searchInput).toHaveValue('Berlin, Germany');
    
    // Search button should be enabled
    const searchButton = page.getByRole('button', { name: 'Search' });
    await expect(searchButton).toBeEnabled();
  });

  test('layer management interface is functional', async ({ page }) => {
    await page.goto('/');
    
    // Wait for sidebar to load completely
    await page.waitForSelector('text=Layers & Features');
    
    // Check layer section exists with exact text matching
    await expect(page.getByText('Map Layers', { exact: true })).toBeVisible();
    await expect(page.getByText('Satellite Imagery', { exact: true })).toBeVisible();
    
    // Use more specific selector for "Drawn Features" to avoid multiple matches
    await expect(page.getByRole('heading', { name: /Drawn Features/ })).toBeVisible();
    
    // Check toggle switches exist
    const toggleSwitches = page.locator('input[type="checkbox"]');
    const count = await toggleSwitches.count();
    expect(count).toBeGreaterThanOrEqual(1); // At least one toggle exists
  });
});
