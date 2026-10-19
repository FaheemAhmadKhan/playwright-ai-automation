# Kiryana Playwright Test Report

**Application:** https://kiryana-pos-crk.pages.dev  
**Test date:** 2026-10-19  
**Environment:** Chromium, Playwright Test  
**Suite:** Public and authenticated smoke tests  

## Result

**8 passed, 0 failed**

The public suite completed successfully in approximately 5.6 seconds. The
authenticated suite completed successfully in approximately 18.0 seconds.
Both runs used one Chromium worker.

## Coverage completed

| ID | Scenario | Result |
| --- | --- | --- |
| SM-001 | Landing page loads and displays the shop introduction | Passed |
| SM-002 | Landing page exposes the English/Urdu language switcher | Passed |
| SM-003 | Login route is reachable and does not return a 404 page | Passed |
| SM-004 | Shop-registration route is reachable and does not return a 404 page | Passed |
| AUTH-001 | Authenticated dashboard shows the new shop and zero initial totals | Passed |
| AUTH-002 | Empty stock screen shows the add-item action | Passed |
| AUTH-003 | Seeded stock item appears in the sale flow | Passed |
| AUTH-004 | Seeded item can be added to a draft bill without completing the sale | Passed |

## Not covered yet

These workflows need an approved test account and test data before they should
be automated:

- Successful login and logout
- Invalid mobile number and invalid PIN validation
- New shop registration and duplicate web-address handling
- Product creation, editing, and deletion
- Sales/POS checkout and receipt generation
- Customer or supplier credit (udhaar) creation and settlement
- Dashboard totals and date filtering
- Urdu/English content verification across authenticated screens
- Mobile viewport and responsive layout checks
- Session expiry, refresh, and unauthorized-route behavior

## Synthetic data created

- Item: `AI Test Rice`
- Quantity: 10 pieces
- Cost price: Rs 50 per piece
- Selling price: Rs 70 per piece
- Low-stock warning: 2 pieces
- Online shop visibility: Off

No sale was completed. The item was selected into a draft bill and the bill
screen was verified, but the completion action was intentionally not clicked.

## Test account

A dedicated test shop was created with the approved test details. The phone
number and PIN were supplied only at runtime and were not written to a file,
committed, or pushed to GitHub. Authenticated tests read credentials from
`KIRYANA_TEST_MOBILE` and `KIRYANA_TEST_PIN` environment variables.

## Recommendations

1. Provide a dedicated staging or test account; do not use production
   credentials in the repository or chat.
2. Define resettable test data for products, customers, suppliers, and sales.
3. Add authenticated Playwright storage state so business-flow tests do not
   repeat login setup.
4. Run the suite in Chromium, Firefox, and WebKit before release.
5. Add CI execution on every pull request and retain the HTML report and trace
   for failures.

## Files

- [playwright.config.ts](./playwright.config.ts)
- [tests/playwright-home.spec.ts](./tests/playwright-home.spec.ts)
