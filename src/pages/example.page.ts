import { BasePage } from './base.page';

/*
 * ExamplePage: template to create your own Page Objects.
 *
 * To create a new Page Object:
 * 1. Copy this file and rename it (e.g.: login.page.ts)
 * 2. Define your locators with descriptive names
 * 3. Create action methods that use BasePage helpers
 * 4. Register the page in custom.fixture.ts
 *
 * Usage in tests:
 *   test('my test', async ({ examplePage }) => {
 *     await examplePage.navigate('/some-path');
 *     await examplePage.performAction();
 *   });
 */
export class ExamplePage extends BasePage {
  // ── Locators ──────────────────────────────────────────────
  // Define your selectors here. Use data-testid when possible,
  // otherwise CSS selectors or text selectors.

  private readonly heading = 'h1';
  private readonly mainContent = '[data-testid="main-content"]';

  // ── Actions ───────────────────────────────────────────────
  // Each method represents a user action on the page.

  async getHeadingText(): Promise<string> {
    return this.getText(this.heading);
  }

  async isContentLoaded(): Promise<boolean> {
    return this.isVisible(this.mainContent);
  }

  async waitForPageReady(): Promise<void> {
    await this.waitForElement(this.mainContent);
  }
}
