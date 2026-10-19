import { test, expect } from '@playwright/test';

test('landing page loads with the shop introduction', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Kiryana|کریانہ/i);
  await expect(
    page.getByRole('heading', { name: /Your whole shop's hisaab|دکان کا پورا حساب/i }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /Log in|لاگ ان/i }).first()).toBeVisible();
});

test('landing page exposes the language switcher', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('button', { name: /English|اردو/ })).toBeVisible();
});

test('login route is reachable', async ({ page }) => {
  await page.goto('/app/login');

  await expect(page).toHaveURL(/\/app\/login$/);
  await expect(page.locator('body')).not.toContainText('404');
});

test('shop registration route is reachable', async ({ page }) => {
  await page.goto('/app/signup');

  await expect(page).toHaveURL(/\/app\/signup$/);
  await expect(page.locator('body')).not.toContainText('404');
});
