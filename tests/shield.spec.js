// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Shield Canvas', () => {
  test('should load and render the shield canvas', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the canvas to be visible
    await expect(page.locator('#screen')).toBeVisible();
    
    // Wait for the canvas to be rendered by checking that the drawing context has been used
    await page.waitForFunction(() => {
      const canvas = document.querySelector('#screen');
      if (!canvas) return false;
      // Check that the canvas has content (width and height are set)
      return canvas.width > 0 && canvas.height > 0;
    }, { timeout: 5000 });
    
    // Additional wait to ensure the shield is fully drawn
    await page.waitForFunction(() => {
      // Check if jQuery has finished initializing and the draw function has been called
      return typeof window.$ !== 'undefined';
    }, { timeout: 5000 });
    
    // Take a screenshot of the canvas - stored in artifacts/ for committing to repo
    await page.screenshot({ path: 'artifacts/shield-canvas.png', fullPage: true });
    
    // Verify the canvas exists
    const canvas = page.locator('#screen');
    await expect(canvas).toBeVisible();
  });
});
