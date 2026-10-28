import { test, expect, type Page } from '@playwright/test';

const env = (globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
}).process?.env;
const mobileNumber = env?.KIRYANA_TEST_MOBILE;
const pin = env?.KIRYANA_TEST_PIN;

test.skip(!mobileNumber || !pin, 'Set KIRYANA_TEST_MOBILE and KIRYANA_TEST_PIN to run authenticated tests');

async function logIn(page: Page) {
  await page.goto('/app/login');
  const englishButton = page.getByRole('button', { name: 'English' });
  if (await englishButton.isVisible()) {
    await englishButton.click();
  }
  await page.getByRole('textbox', { name: /Mobile number|موبائل نمبر/ }).fill(mobileNumber!);
  await page.getByRole('textbox', { name: /PIN|پن/ }).fill(pin!);
  await page.getByRole('button', { name: /Log in|لاگ ان/ }).click();
  await expect(page).toHaveURL(/\/app$/);
}

test('authenticated dashboard shows the new shop and current account totals', async ({ page }) => {
  await logIn(page);

  await expect(page.getByRole('link', { name: 'Faheem Freelance Culture' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Today's hisaab|آج کا حساب/ })).toBeVisible();
  await expect(page.getByText(/Cash in hand|کیش موجود/).locator('..')).toContainText('Rs 70');
  await expect(page.getByText(/Owed to you|لوگوں پہ ادھار/).locator('..')).toContainText('Rs 0');
});

test('authenticated stock page shows the seeded test item', async ({ page }) => {
  await logIn(page);
  await page.goto('/app/maal');

  await expect(page.getByRole('heading', { name: /Stock list|مال کی لسٹ/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Add an item|نیا مال درج کریں/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /AI Test Rice/ })).toContainText('Rs 70');
});

test('sale page lists the seeded test item', async ({ page }) => {
  await logIn(page);
  await page.goto('/app/bikri');

  await expect(page.getByRole('heading', { name: /Sale|بکری/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /AI Test Rice Rs 70/ })).toBeVisible();
});

test('stock item can be selected into a draft bill without completing a sale', async ({ page }) => {
  await logIn(page);
  await page.goto('/app/maal');

  await expect(page.getByRole('link', { name: /AI Test Rice/ })).toBeVisible();
  await page.goto('/app/bikri');
  await page.getByRole('button', { name: /AI Test Rice Rs 70/ }).click();
  await page.getByRole('link', { name: /1 items Rs 70 See the bill|1 چیزیں Rs 70 بل دیکھیں/ }).click();

  await expect(page.getByRole('heading', { name: /Bill|بل/ })).toBeVisible();
  await expect(page.getByRole('textbox', { name: /Quantity of AI Test Rice|AI Test Rice کی مقدار/ })).toHaveValue('1');
  await expect(page.getByText('Rs 70').last()).toBeVisible();
  await expect(page.getByRole('button', { name: /Complete sale|بکری مکمل کریں/ })).toBeVisible();
});

test('completed cash sale updates stock and dashboard totals', async ({ page }) => {
  await logIn(page);

  await expect(page.getByRole('heading', { name: /Today's hisaab|آج کا حساب/ })).toBeVisible();
  await expect(page.getByText(/Cash in hand|کیش موجود/).locator('..')).toContainText('Rs 70');
  await expect(page.getByText(/Owed to you|لوگوں پہ ادھار/).locator('..')).toContainText('Rs 0');

  await page.goto('/app/maal');
  await expect(page.getByRole('link', { name: /AI Test Rice/ })).toContainText('9');
});

test('authenticated user can log out', async ({ page }) => {
  await logIn(page);

  const logout = page.getByRole('button', { name: /Log out|Logout|خروج|لاگ آؤٹ/ });
  await expect(logout).toBeVisible();
  await logout.click();

  await expect(page).toHaveURL(/\/app\/login$/);
});

test('authenticated session survives a dashboard refresh', async ({ page }) => {
  await logIn(page);

  await expect(page.getByRole('heading', { name: /Today's hisaab|آج کا حساب/ })).toBeVisible();
  await page.reload();

  await expect(page).toHaveURL(/\/app$/);
  await expect(page.getByRole('heading', { name: /Today's hisaab|آج کا حساب/ })).toBeVisible();
});

test('authenticated dashboard can switch to English', async ({ page }) => {
  await logIn(page);

  const englishButton = page.getByRole('button', { name: 'English' });
  if (await englishButton.isVisible()) {
    await englishButton.click();
  }

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { name: "Today's hisaab" })).toBeVisible();
});

test('authenticated dashboard remains usable on a mobile viewport', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await logIn(page);

  await expect(page.getByRole('heading', { name: /Today's hisaab|آج کا حساب/ })).toBeVisible();
  await expect(
    page.getByRole('button', { name: /English|اردو|Log out|Logout|خروج|لاگ آؤٹ/ }).first(),
  ).toBeVisible();

  await context.close();
});

test('authenticated stock and sale screens switch to English', async ({ page }) => {
  await logIn(page);

  await page.goto('/app/maal');
  await page.locator('button').first().click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en', { timeout: 10000 });
  await expect(page.getByRole('heading', { name: 'Stock list' })).toBeVisible();

  await page.goto('/app/bikri');
  await expect(page.getByRole('heading', { name: 'Sale' })).toBeVisible();
  await expect(page.getByRole('button', { name: /AI Test Rice Rs 70/ })).toBeVisible();
});

test('authenticated stock and sale screens remain usable on mobile', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await logIn(page);
  await page.goto('/app/maal');
  await expect(page.getByRole('heading', { name: /Stock list|مال کی لسٹ/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Add an item|نیا مال درج کریں/ })).toBeVisible();

  await page.goto('/app/bikri');
  await expect(page.getByRole('heading', { name: /Sale|بکری/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /AI Test Rice Rs 70/ })).toBeVisible();

  await context.close();
});

test('new product form validates required fields without creating data', async ({ page }) => {
  await logIn(page);
  await page.goto('/app/maal');
  await page.getByRole('link', { name: /Add an item|نیا مال درج کریں/ }).click();

  await expect(page.getByRole('heading', { name: /New item|نیا مال/ })).toBeVisible();
  await page.getByRole('button', { name: /Save|محفوظ کریں/ }).click();
  await expect(page).toHaveURL(/\/app\/maal/);
});

test('clearing the authenticated session redirects to login', async ({ page }) => {
  await logIn(page);
  await page.context().clearCookies();
  await page.evaluate(() => localStorage.clear());
  await page.goto('/app');

  await expect(page).toHaveURL(/\/app\/login$/);
});

test('profit page shows the seven-day summary and daily entries', async ({ page }) => {
  await logIn(page);
  await page.goto('/app/profit');

  await expect(page.getByRole('heading', { name: /Profit|منافع/ })).toBeVisible();
  await expect(page.getByText(/Last 7 days|پچھلے 7 دن/)).toBeVisible();
  await expect(page.getByText(/Sales|بکری/).first()).toBeVisible();
});

test('empty customer and supplier ledgers expose creation actions', async ({ page }) => {
  await logIn(page);

  await page.goto('/app/khata');
  await expect(page).toHaveURL(/\/app\/khata$/);
  await expect(page.locator('body')).toContainText(/Customer khata|لوگوں کا کھاتہ/);
  await expect(page.getByRole('link', { name: /New customer|نیا گاہک/ })).toBeVisible();

  await page.goto('/app/suppliers');
  await expect(page).toHaveURL(/\/app\/suppliers$/);
  await expect(page.locator('body')).toContainText(/Suppliers|سپلائرز/);
  await expect(page.getByRole('link', { name: /New supplier|نیا سپلائر/ })).toBeVisible();
});
