import { test, expect, type Page } from '@playwright/test';

const mobileNumber = process.env.KIRYANA_TEST_MOBILE;
const pin = process.env.KIRYANA_TEST_PIN;

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

test('authenticated dashboard shows the new shop and empty account totals', async ({ page }) => {
  await logIn(page);

  await expect(page.getByRole('link', { name: 'Faheem Freelance Culture' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Today's hisaab|آج کا حساب/ })).toBeVisible();
  await expect(page.getByText(/Cash in hand|کیش موجود/).locator('..')).toContainText('Rs 0');
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
