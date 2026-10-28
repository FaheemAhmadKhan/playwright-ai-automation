# Kiryana Playwright Test Report

**Application:** https://kiryana-pos-crk.pages.dev  
**Test date:** 2026-10-28  
**Environment:** Chromium, Playwright Test  
**Suite:** Public and authenticated smoke tests  

## Result

**Latest execution: 50 passed, 0 failed, 0 skipped**

The latest public and authenticated cross-browser matrix completed
successfully in approximately 1.9 minutes using two workers.

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
| 2026-10-28 | Chromium and Firefox cross-browser matrix with supplied runtime credentials | 50 | 0 | 0 | 258 | 5 | 5 |
| 2026-10-28 | Additional safe boundary, registration, authenticated UI, and product-form checks | 16 | 0 | 0 | 274 | 5 | 5 |
| 2026-10-28 | Final serial Chromium and Firefox expanded matrix | 66 | 0 | 0 | 340 | 5 | 5 |
| 2026-10-28 | Storage-state Chromium and WebKit investigation suites | 34 | 3 | 0 | 374 | 8 | 5 |
| 2026-10-28 | Final storage-state Chromium and Firefox expanded matrix | 71 | 0 | 0 | 445 | 8 | 5 |

### Latest execution

**71 passed, 0 failed, 0 skipped** in the latest Chromium and Firefox
storage-state run.

The public, validation, network, language, responsive, registration,
login-format, logout, session-refresh, protected-route, authenticated-language,
and authenticated-mobile tests all passed in both Chromium and Firefox on the
latest 2026-10-28 run. The expanded matrix completed in approximately
3.3 minutes using one worker to avoid shared-account login contention.
The supplied
credentials were used only as runtime environment variables and were not
written to the repository.

The storage-state setup now authenticates once per browser project and reuses
the state for authenticated tests. The final Chromium and Firefox matrix
passed 71/71 with this setup.
WebKit passed 31/34 in the investigation run; three cases experienced
WebKit/page-process crashes. The PIN-format and mobile-login cases passed when
isolated. The profit-page case reproduced a WebKit out-of-memory crash.

### Coverage completed today

The following additional checks were completed on 2026-10-28 using the
runtime-only test account:

- Boundary-length mobile-number and PIN rejection
- Invalid registration mobile number and mismatched PIN confirmation
- Authenticated English verification on stock and sale screens
- Authenticated mobile usability on stock and sale screens
- New-product form required-field validation without saving an item
- Product create, edit, and delete with cleanup
- Customer and supplier required-name validation without creating records
- Session clearing redirects to login (session-expiry simulation)
- Profit page seven-day summary and daily entries
- Empty customer ledger and new-customer action
- Empty supplier ledger and new-supplier action

The additional checks passed in Chromium and Firefox. No new shop, customer,
supplier, product, or sale was created during today's extension checks.

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
| VAL-001 | Boundary-length mobile and PIN values are rejected | Passed |
| REG-002 | Invalid registration mobile and mismatched PIN are rejected | Passed |
| LOC-002 | Authenticated stock and sale screens switch to English | Passed |
| RWD-003 | Authenticated stock and sale screens remain usable on mobile | Passed |
| PROD-001 | New-product form validates required fields without creating data | Passed |
| AUTH-010 | Clearing the session redirects to login | Passed |
| DASH-001 | Profit page shows seven-day and daily entries | Passed |
| CREDIT-001 | Empty customer ledger exposes creation action | Passed |
| CREDIT-002 | Empty supplier ledger exposes creation action | Passed |

## Not covered yet

These workflows need an approved test account and test data before they should
be automated:

- Successful login, logout, session persistence, and refresh are covered;
  true server-side session expiry remains
- Additional invalid mobile number/PIN format combinations
- Successful shop registration and duplicate web-address handling
- Product creation, editing, and deletion are now covered with cleanup
- Sales/POS checkout and receipt generation beyond the existing controlled sale
- Customer or supplier credit (udhaar) creation and settlement
- Dashboard date filtering; no date-filter control is exposed in the current
  profit/dashboard UI
- Full Urdu/English content verification across authenticated screens
- Responsive checks for additional authenticated screens and interactions
- WebKit full-suite stability; 31/34 passed in the latest investigation,
  with an authenticated profit-page out-of-memory crash and two page/context
  crashes in public login cases
- True server-side session expiry; client-side session clearing is covered,
  but forcing backend token expiry requires server or test-fixture control
- Successful registration and credit settlement remain intentionally unrun
  because they create persistent live records without a reset API

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
