import { test, expect } from '../fixtures/custom.fixture';

/*
 * Functional spec example.
 *
 * Recommended structure:
 * - test.describe: groups tests for the same feature/page
 * - test.beforeEach: navigates to the page and sets up state
 * - test: an atomic scenario (one verification per test)
 *
 * Always use the custom fixtures (do not import test from @playwright/test)
 * so that Page Objects are injected automatically.
 */

test.describe('Example Page', () => {
  test.beforeEach(async ({ examplePage }) => {
    // Navigate to the URL before each test
    await examplePage.navigate('/');
    await examplePage.waitForPageReady();
  });

  test('should load the page successfully', async ({ examplePage }) => {
    const isLoaded = await examplePage.isContentLoaded();
    expect(isLoaded).toBe(true);
  });

  test('should display the heading', async ({ examplePage }) => {
    const headingText = await examplePage.getHeadingText();
    expect(headingText).toBeTruthy();
    // expect(headingText).toBe('Expected Heading'); // adjust according to your app
  });
});
