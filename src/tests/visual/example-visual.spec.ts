import { test, expect } from '../../fixtures/custom.fixture';

/*
 * Visual spec example with screenshot comparison.
 *
 * Requirements:
 * - The first run generates the baseline screenshots (--update-snapshots)
 * - Subsequent runs compare against those baseline screenshots
 * - Screenshots are saved in tests/visual/ as part of the repo
 *
 * Scripts:
 * - npm run test:visual          → runs visual tests
 * - npm run test:visual:update   → updates baseline screenshots
 *
 * Comparison thresholds (configured in playwright.config.ts):
 * - threshold: 0.2 (tolerated pixel difference)
 * - maxDiffPixels: 100 (maximum allowed different pixels)
 */

test.describe('Visual Regression', () => {
  test.beforeEach(async ({ examplePage }) => {
    await examplePage.navigate('/');
    await examplePage.waitForPageReady();
  });

  test('page should match snapshot', async ({ page }) => {
    // Full-page screenshot
    await expect(page).toHaveScreenshot('home-page-full.png', {
      fullPage: true,
    });
  });

  test('header should match snapshot', async ({ page }) => {
    // Screenshot of a specific element
    const header = page.locator('header');
    await expect(header).toHaveScreenshot('header.png');
  });
});
