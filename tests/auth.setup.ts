import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';
const env = (globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
}).process?.env;
const mobileNumber = env?.KIRYANA_TEST_MOBILE;
const pin = env?.KIRYANA_TEST_PIN;

setup('authenticate test account', async ({ page }) => {
  setup.skip(!mobileNumber || !pin, 'Set KIRYANA_TEST_MOBILE and KIRYANA_TEST_PIN');

  await page.goto('/app/login');
  const englishButton = page.getByRole('button', { name: 'English' });
  if (await englishButton.isVisible()) {
    await englishButton.click();
  }
  await page.getByRole('textbox', { name: /Mobile number|موبائل نمبر/ }).fill(mobileNumber!);
  await page.getByRole('textbox', { name: /PIN|پن/ }).fill(pin!);
  await page.getByRole('button', { name: /Log in|لاگ ان/ }).click();
  await expect(page).toHaveURL(/\/app$/);
  await page.context().storageState({ path: authFile });
});
