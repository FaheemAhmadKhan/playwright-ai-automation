# Kiryana Playwright Test Report

**Application:** https://kiryana-pos-crk.pages.dev  
**Test date:** 2026-10-19  
**Environment:** Chromium, Playwright Test  
**Suite:** Public and authenticated smoke tests  

## Result

**9 passed, 0 failed**

The public suite completed successfully in approximately 5.6 seconds. The
authenticated suite completed successfully in approximately 18.0 seconds.
Both runs used one Chromium worker.

## Execution history

Each execution is recorded below. Cumulative totals count test-case results
across executions, so a skipped test is neither passed nor failed.

| Execution | Scope | Passed | Failed | Skipped | Cumulative passed | Cumulative failed | Cumulative skipped |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 2026-10-19 | Public and authenticated smoke tests with approved credentials | 9 | 0 | 0 | 9 | 0 | 0 |
| 2026-10-20 | Full configured suite without runtime credentials | 4 | 0 | 5 | 13 | 0 | 5 |
| 2026-10-20 | Full configured suite with supplied runtime credentials | 4 | 5 | 0 | 17 | 5 | 5 |
| 2026-10-20 | Full configured suite with corrected runtime credentials | 9 | 0 | 0 | 26 | 5 | 5 |
| 2026-10-20 | Expanded suite with invalid-login validation | 10 | 0 | 0 | 36 | 5 | 5 |
| 2026-10-20 | Expanded validation, network, and language suite | 15 | 0 | 0 | 51 | 5 | 5 |
| 2026-10-20 | Expanded responsive and registration-validation suite | 18 | 0 | 0 | 69 | 5 | 5 |
| 2026-10-20 | Expanded login-format validation suite | 20 | 0 | 0 | 89 | 5 | 5 |
| 2026-10-20 | Expanded authenticated logout suite | 21 | 0 | 0 | 110 | 5 | 5 |
| 2026-10-20 | Expanded session-refresh and authenticated-language suite | 23 | 0 | 0 | 133 | 5 | 5 |
| 2026-10-20 | Expanded protected-route and authenticated-mobile suite | 25 | 0 | 0 | 158 | 5 | 5 |
| 2026-10-20 | Chromium and Firefox cross-browser matrix | 50 | 0 | 0 | 208 | 5 | 5 |

### Latest execution

**50 passed, 0 failed, 0 skipped**

The public, validation, network, language, responsive, registration,
login-format, logout, session-refresh, protected-route, authenticated-language,
and authenticated-mobile tests all passed in both Chromium and Firefox. The
matrix completed in approximately 1.4 minutes using two workers.
The supplied
credentials were used only as runtime environment variables and were not
written to the repository.

## Coverage completed

| ID | Scenario | Result |
| --- | --- | --- |
| SM-001 | Landing page loads and displays the shop introduction | Passed |
| SM-002 | Landing page exposes the English/Urdu language switcher | Passed |
| SM-003 | Login route is reachable and does not return a 404 page | Passed |
| SM-004 | Shop-registration route is reachable and does not return a 404 page | Passed |
| SM-005 | Invalid login credentials are rejected | Passed |
| SM-006 | Login required fields are validated | Passed |
| SM-007 | Login submit remains protected during credential checks | Passed |
| SM-008 | Invalid mobile-number format is rejected | Passed |
| SM-009 | Invalid PIN format is rejected | Passed |
| NET-001 | Landing route returns HTTP 200 | Passed |
| NET-002 | Login route returns HTTP 200 | Passed |
| LOC-001 | Landing language switcher changes page language | Passed |
| RWD-001 | Landing page remains usable at a mobile viewport | Passed |
| RWD-002 | Login page remains usable at a mobile viewport | Passed |
| REG-001 | Shop registration required fields are validated | Passed |
| AUTH-001 | Authenticated dashboard shows the new shop and zero initial totals | Passed |
| AUTH-002 | Empty stock screen shows the add-item action | Passed |
| AUTH-003 | Seeded stock item appears in the sale flow | Passed |
| AUTH-004 | Seeded item can be added to a draft bill without completing the sale | Passed |
| AUTH-005 | Completed cash sale updates stock and dashboard totals | Passed |
| AUTH-006 | Authenticated user can log out | Passed |
| AUTH-007 | Authenticated session survives dashboard refresh | Passed |
| AUTH-008 | Authenticated dashboard switches to English | Passed |
| AUTH-009 | Authenticated dashboard remains usable on a mobile viewport | Passed |
| SEC-001 | Unauthenticated dashboard access redirects to login | Passed |

## Not covered yet

These workflows need an approved test account and test data before they should
be automated:

- Successful login, logout, session persistence, and refresh are covered;
  session expiry remains
- Boundary-length and additional invalid mobile number/PIN format validation
- Successful shop registration and duplicate web-address handling
- Product creation, editing, and deletion
- Sales/POS checkout and receipt generation
- Customer or supplier credit (udhaar) creation and settlement
- Dashboard totals and date filtering
- Urdu/English content verification across authenticated screens
- Responsive checks for additional authenticated screens and interactions
- Session expiry behavior
- WebKit full-suite stability; two cases crashed during the long combined
  WebKit run but passed when isolated

## Synthetic data created

- Item: `AI Test Rice`
- Quantity: 10 pieces
- Cost price: Rs 50 per piece
- Selling price: Rs 70 per piece
- Low-stock warning: 2 pieces
- Online shop visibility: Off

No sale was completed. The item was selected into a draft bill and the bill
screen was verified before the controlled cash-sale test was completed.

## Controlled transaction created

- Payment type: Cash
- Sale total: Rs 70
- Stock before sale: 10 pieces
- Stock after sale: 9 pieces
- Dashboard cash after sale: Rs 70
- Customer credit after sale: Rs 0

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
