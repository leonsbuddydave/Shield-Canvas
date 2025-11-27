// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Shield Canvas', () => {
  test('should load and render the shield canvas', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the canvas to be visible
    await expect(page.locator('#screen')).toBeVisible();
    
    // Wait for scripts to load and canvas to render
    await page.waitForTimeout(3000);
    
    // Take a screenshot of the canvas
    await page.screenshot({ path: 'artifacts/shield-canvas.png', fullPage: true });
    
    // Verify the canvas exists
    const canvas = page.locator('#screen');
    await expect(canvas).toBeVisible();
  });
});
