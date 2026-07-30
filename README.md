# Playwright Automation Framework

Generic and reusable UI test automation framework built with **Playwright** and **TypeScript**. Uses the **Page Object Model (POM)** pattern to keep tests clean, maintainable, and scalable.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- npm (included with Node.js)

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install

# 3. Copy and configure environment variables
cp .env.example .env
# Edit .env with the URL and credentials of your application
```

## Project structure

```
├── .github/workflows/playwright.yml   # CI/CD
├── src/
│   ├── config/env.config.ts           # Environment variable loading
│   ├── pages/
│   │   ├── base.page.ts               # Abstract base class (do not modify)
│   │   └── example.page.ts            # Page Object template
│   ├── tests/
│   │   ├── example.spec.ts            # Functional test template
│   │   └── visual/example-visual.spec.ts  # Visual test template
│   ├── fixtures/custom.fixture.ts     # Fixtures with Page Objects
│   ├── utils/
│   │   ├── helpers.ts                 # Generic helper functions
│   │   └── data-generator.ts          # Random data generation
│   └── data/test-data.ts              # Reusable test data
├── .env.example
├── playwright.config.ts               # Playwright configuration
├── tsconfig.json
└── package.json
```

---

## Quick start guide: how to get started

### 1. Create a Page Object

Copy `src/pages/example.page.ts` and adapt it to your page:

```ts
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  // ── Locators ──
  private readonly usernameInput = '#username';
  private readonly passwordInput = '#password';
  private readonly submitButton  = 'button[type="submit"]';
  private readonly errorMessage  = '.alert-error';

  // ── Actions ──
  async login(username: string, password: string): Promise<void> {
    await this.fillField(this.usernameInput, username);
    await this.fillField(this.passwordInput, password);
    await this.clickAndWait(this.submitButton);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  async isLoginPageVisible(): Promise<boolean> {
    return this.isVisible(this.usernameInput);
  }
}
```

**Rules for Page Objects:**
- Always extend `BasePage` — it already includes `page`, `navigate()`, `fillField()`, `clickAndWait()`, `waitForElement()`, etc.
- Define locators as `private readonly` properties at the top of the class.
- Each method represents a user action. Do not expose locators outside the class.
- Use `data-testid` as selectors when your app supports them. If not, use CSS selectors or text selectors.

### 2. Register the Page Object in the fixtures

Open `src/fixtures/custom.fixture.ts` and add your new page:

```ts
import { LoginPage } from '../pages/login.page';      // <-- import

type MyFixtures = {
  examplePage: ExamplePage;
  loginPage: LoginPage;                                // <-- declare type
};

const fixtures = {
  examplePage: async ({ page }, use) => {
    await use(new ExamplePage(page));
  },
  loginPage: async ({ page }, use) => {                // <-- initialize
    await use(new LoginPage(page));
  },
};
```

### 3. Write a test spec

Create your spec in `src/tests/` using the fixtures:

```ts
import { test, expect } from '../fixtures/custom.fixture';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate('/login');
  });

  test('should login with valid credentials', async ({ loginPage }) => {
    await loginPage.login('user', 'pass');
    // verify we are no longer on the login page
    const isVisible = await loginPage.isLoginPageVisible();
    expect(isVisible).toBe(false);
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    await loginPage.login('bad', 'wrong');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Invalid');
  });
});
```

**Rules for specs:**
- Import `test` and `expect` from `../fixtures/custom.fixture` (not from `@playwright/test`).
- Group related tests with `test.describe`.
- Use `test.beforeEach` to navigate to the page and set up the initial state.
- One `test` = one atomic scenario. If you need to verify several things in the same flow, create multiple tests or use `test.step`.
- Name files with the pattern `feature.spec.ts`.

### 4. Add visual tests

To compare screenshots and detect visual regressions:

```ts
import { test, expect } from '../../fixtures/custom.fixture';

test('login page should match design', async ({ page, loginPage }) => {
  await loginPage.navigate('/login');
  await expect(page).toHaveScreenshot('login-page.png', { fullPage: true });
});
```

- The first run generates the baseline screenshots with: `npm run test:visual:update`
- Subsequent runs compare against those screenshots.
- Screenshots are saved alongside the tests and must be committed to the repo.

### 5. Use the helpers and data-generator

```ts
import { generateRandomEmail, generateRandomString } from '../utils/helpers';
import { generateUser, generateFormData } from '../utils/data-generator';

const user = generateUser();                  // { username, password, email }
const user2 = generateUser({ username: 'admin' }); // partial override
const form = generateFormData();              // { firstName, lastName, email, ... }
const email = generateRandomEmail('myapp.com');
```

### 6. Use reusable test data

Define static data in `src/data/test-data.ts` to avoid repeating them in specs:

```ts
import { TestData } from '../data/test-data';

const { username, password } = TestData.credentials.default;
await loginPage.login(username, password);
```

---

## Available scripts

| Script | Description |
|---|---|
| `npm test` | Runs all tests (headless) |
| `npm run test:headed` | Runs tests with the browser visible |
| `npm run test:ui` | Opens Playwright UI mode (visual debug) |
| `npm run test:visual` | Runs only visual tests |
| `npm run test:visual:update` | Updates baseline screenshots for visual tests |
| `npm run report:html` | Opens the Playwright HTML report |
| `npm run report:allure` | Generates and opens the Allure report |

## CI/CD

The GitHub Actions workflow (`.github/workflows/playwright.yml`) runs the tests automatically on every push and PR to `main`. It runs on all 3 browsers (Chromium, Firefox, WebKit) and uploads the HTML and Allure reports as artifacts.

For CI to work, set the `BASE_URL` variable in the repository secrets/variables in GitHub.

## Recommended patterns

- **One spec per feature/page**: `login.spec.ts`, `checkout.spec.ts`, `dashboard.spec.ts`.
- **Do not duplicate locators**: if two specs need the same page, they share the same Page Object.
- **Use fixtures for repetitive setup**: authentication, test data, etc.
- **Do not use `page.locator()` directly in specs**: encapsulate everything in the Page Object.
- **Atomic tests**: each test verifies a single thing. If it fails, you know exactly what broke.
- **`data-testid`**: ask devs to add `data-testid` to key elements. It makes tests immune to CSS or text changes.
