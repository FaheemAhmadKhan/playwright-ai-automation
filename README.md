# Playwright AI Automation

A clean starter workspace for experimenting with AI-assisted Playwright testing.

## Getting started

```powershell
npm install
npx playwright install
npm test
```

The example test runs against `https://playwright.dev`. Set `baseURL` in
`playwright.config.ts` when connecting the suite to another application.

## Useful commands

```powershell
npm run test:headed
npm run test:ui
npm run report
```

Authenticated tests require runtime-only environment variables and do not
store credentials in the repository:

```powershell
$env:KIRYANA_TEST_MOBILE = '<test mobile number>'
$env:KIRYANA_TEST_PIN = '<test PIN>'
npx playwright test authenticated.spec.ts
```

## Suggested AI-assisted workflow

1. Describe the user journey and expected outcome.
2. Ask AI to propose a test using accessible roles and user-facing locators.
3. Review the generated test for stable assertions, isolation, and test data cleanup.
4. Run the test and use the trace or HTML report to refine failures.
5. Keep reusable fixtures and page objects under `tests/` as the suite grows.
