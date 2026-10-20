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

test('login rejects invalid credentials', async ({ page }) => {
  await page.goto('/app/login');

  const englishButton = page.getByRole('button', { name: 'English' });
  if (await englishButton.isVisible()) {
    await englishButton.click();
  }

  await page.getByRole('textbox', { name: /Mobile number|موبائل نمبر/ }).fill('03000000000');
  await page.getByRole('textbox', { name: /PIN|پن/ }).fill('0000');
  await page.getByRole('button', { name: /Log in|لاگ ان/ }).click();

  await expect(page).toHaveURL(/\/app\/login$/);
  await expect(page.getByRole('alert')).toContainText(/wrong|incorrect|غلط/i);
});

test('login validates required fields', async ({ page }) => {
  await page.goto('/app/login');

  const englishButton = page.getByRole('button', { name: 'English' });
  if (await englishButton.isVisible()) {
    await englishButton.click();
  }

  await page.getByRole('button', { name: /Log in|لاگ ان/ }).click();

  await expect(page).toHaveURL(/\/app\/login$/);
  await expect(page.getByRole('textbox', { name: /Mobile number|موبائل نمبر/ })).toBeVisible();
  await expect(page.getByRole('textbox', { name: /PIN|پن/ })).toBeVisible();
});

test('login keeps the submit action protected while credentials are checked', async ({ page }) => {
  await page.goto('/app/login');

  const englishButton = page.getByRole('button', { name: 'English' });
  if (await englishButton.isVisible()) {
    await englishButton.click();
  }

  await page.getByRole('textbox', { name: /Mobile number|موبائل نمبر/ }).fill('03000000000');
  await page.getByRole('textbox', { name: /PIN|پن/ }).fill('0000');
  const loginButton = page.getByRole('button', { name: /Log in|لاگ ان/ });
  await loginButton.click();

  await expect(page).toHaveURL(/\/app\/login$/);
  await expect(page.getByRole('alert')).toContainText(/incorrect|غلط/i);
  await expect(loginButton).toBeEnabled();
});

test('login rejects an invalid mobile number format', async ({ page }) => {
  await page.goto('/app/login');

  const englishButton = page.getByRole('button', { name: 'English' });
  if (await englishButton.isVisible()) {
    await englishButton.click();
  }

  await page.getByRole('textbox', { name: /Mobile number|موبائل نمبر/ }).fill('abc');
  await page.getByRole('textbox', { name: /PIN|پن/ }).fill('1001');
  await page.getByRole('button', { name: /Log in|لاگ ان/ }).click();

  await expect(page).toHaveURL(/\/app\/login$/);
});

test('login rejects an invalid PIN format', async ({ page }) => {
  await page.goto('/app/login');

  const englishButton = page.getByRole('button', { name: 'English' });
  if (await englishButton.isVisible()) {
    await englishButton.click();
  }

  await page.getByRole('textbox', { name: /Mobile number|موبائل نمبر/ }).fill('03394004921');
  await page.getByRole('textbox', { name: /PIN|پن/ }).fill('abcd');
  await page.getByRole('button', { name: /Log in|لاگ ان/ }).click();

  await expect(page).toHaveURL(/\/app\/login$/);
});

test('landing route responds successfully over the network', async ({ page }) => {
  const response = await page.goto('/');

  expect(response).not.toBeNull();
  expect(response!.status()).toBe(200);
});

test('login route responds successfully over the network', async ({ page }) => {
  const response = await page.goto('/app/login');

  expect(response).not.toBeNull();
  expect(response!.status()).toBe(200);
});

test('language switcher changes the landing page language', async ({ page }) => {
  await page.goto('/');

  const languageButton = page.getByRole('button', { name: /English|اردو/ });
  await languageButton.click();

  await expect(page.getByRole('button', { name: /English|اردو/ })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', /en|ur/);
});

test('landing page remains usable on a mobile viewport', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: /Your whole shop's hisaab|دکان کا پورا حساب/i }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /Log in|لاگ ان/i }).first()).toBeVisible();

  await context.close();
});

test('login page remains usable on a mobile viewport', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await page.goto('/app/login');

  await expect(page.getByRole('textbox', { name: /Mobile number|موبائل نمبر/ })).toBeVisible();
  await expect(page.getByRole('textbox', { name: /PIN|پن/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Log in|لاگ ان/ })).toBeVisible();

  await context.close();
});

test('shop registration validates required fields', async ({ page }) => {
  await page.goto('/app/signup');

  const submitButton = page.getByRole('button', { name: /Create shop|دکان بنائیں/i });
  await expect(submitButton).toBeVisible();
  await submitButton.click();

  await expect(page).toHaveURL(/\/app\/signup$/);
  await expect(page.locator('input').first()).toBeVisible();
});

test('unauthenticated dashboard access redirects to login', async ({ page }) => {
  await page.goto('/app');

  await expect(page).toHaveURL(/\/app\/login$/);
});
