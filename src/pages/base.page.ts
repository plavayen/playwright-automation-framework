import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForElement(selector: string, timeout = 10_000): Promise<Locator> {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout });
    return locator;
  }

  async getText(selector: string): Promise<string> {
    const element = await this.waitForElement(selector);
    return (await element.textContent()) ?? '';
  }

  async clickAndWait(selector: string): Promise<void> {
    await this.page.click(selector);
    await this.page.waitForLoadState('networkidle');
  }

  async fillField(selector: string, value: string): Promise<void> {
    const element = await this.waitForElement(selector);
    await element.fill(value);
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.locator(selector).isVisible();
  }

  async takeScreenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({ fullPage: true, path: `screenshots/${name}.png` });
  }
}
