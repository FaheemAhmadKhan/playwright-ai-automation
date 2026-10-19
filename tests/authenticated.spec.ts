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

test('authenticated stock page shows the empty stock state', async ({ page }) => {
  await logIn(page);
  await page.goto('/app/maal');

  await expect(page.getByRole('heading', { name: /Stock list|مال کی لسٹ/ })).toBeVisible();
  await expect(page.getByText(/No items yet|ابھی کوئی مال درج نہیں/)).toBeVisible();
  await expect(page.getByRole('link', { name: /Add an item|نیا مال درج کریں/ })).toBeVisible();
});

test('sale page guides a new shop to add stock first', async ({ page }) => {
  await logIn(page);
  await page.goto('/app/bikri');

  await expect(page.getByRole('heading', { name: /Sale|بکری/ })).toBeVisible();
  await expect(page.getByText(/To sell, first add items to the stock list|بکری کے لیے پہلے مال کی لسٹ میں چیزیں درج کریں/)).toBeVisible();
  await expect(page.getByRole('link', { name: /Add items|مال درج کریں/ })).toHaveAttribute('href', '/app/maal/new');
});
