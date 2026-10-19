import { test, expect } from '@playwright/test';

test('Playwright homepage exposes the documentation entry point', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Playwright/);
  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
});
