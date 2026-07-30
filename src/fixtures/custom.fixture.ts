import { test as base, Page } from '@playwright/test';
import { ExamplePage } from '../pages/example.page';

/*
 * Custom fixtures: extends Playwright test to inject
 * Page Objects automatically into each test.
 *
 * To add a new Page Object:
 * 1. Import your page (e.g.: import { LoginPage } from '../pages/login.page')
 * 2. Declare its type in MyFixtures (e.g.: loginPage: LoginPage)
 * 3. Add the initialization in the fixtures object
 *
 * Example:
 *   type MyFixtures = {
 *     examplePage: ExamplePage;
 *     loginPage: LoginPage;   // <-- new
 *   };
 *
 *   const fixtures = {
 *     examplePage: async ({ page }, use) => { ... },
 *     loginPage: async ({ page }, use) => {   // <-- new
 *       await use(new LoginPage(page));
 *     },
 *   };
 */

type MyFixtures = {
  examplePage: ExamplePage;
};

const fixtures = {
  examplePage: async ({ page }: { page: Page }, use: (p: ExamplePage) => Promise<void>) => {
    const examplePage = new ExamplePage(page);
    await use(examplePage);
  },
};

export const test = base.extend<MyFixtures>(fixtures);
export { expect } from '@playwright/test';
