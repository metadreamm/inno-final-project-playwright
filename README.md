# Playwright Test Framework for Amazon

## Tech Stack

- TypeScript
- Playwright
- Allure Reports
- Jenkins CI (Docker)

## Project Structure

```
├── pages/          # Page Object Models
├── tests/          # Test specs
├── config/         # Configuration
├── utils/          # Logger and helpers
├── Jenkinsfile     # CI pipeline
└── docker-compose.yml  # Jenkins in Docker
```

## Setup

1. `npm install`
2. `npx playwright install chromium`
3. Create `.env` file (see `.env.example`)

## Run Tests

```bash
npm test                            # All tests
npx playwright test --grep @smoke   # Only smoke tests
```

## Jenkins Setup

1. `docker-compose up -d`
2. Open `http://localhost:8080`
3. Add credentials: `AMAZON_EMAIL`, `AMAZON_PASSWORD` (Secret text)
4. Create Pipeline from SCM → Git → Jenkinsfile

## Test Cases

<details>
  <summary><b>1.1 Successful authorization</b></summary>
  
  **Preconditions:** User is registered in the system
  
  **Steps:**
  1. Hover over 'Account & Lists' in header
  2. Click on [Sign-In]
  3. Enter valid email and click [Continue]
  4. Enter valid password and click [Sign-In]
  
  **Expected Result:** User is successfully authorized
</details>

<details>
  <summary><b>1.2 Search products</b></summary>
  
  **Preconditions:** User is logged in the system
  
  **Steps:**
  1. Enter valid value in the search field
  2. Click on [Search]
  
  **Expected Result:** Searched products appear on the screen
</details>

<details>
  <summary><b>1.3 Adding product to cart</b></summary>
  
  **Preconditions:**
  - User is logged in the system
  - Product page is opened
  - Shopping cart is empty
  
  **Steps:**
  1. Click on [Add to Cart] on product's page
  
  **Expected Result:** Cart counter changes to 1
</details>

<details>
  <summary><b>1.4 Product displayed in cart</b></summary>
  
  **Preconditions:**
  - User is logged in the system
  - One product added in cart
  
  **Steps:**
  1. Click on the shopping cart icon
  
  **Expected Result:** "Shopping Cart" page is opened, added product is displayed
</details>

## Issues & Solutions

### Amazon CAPTCHA on login

**Problem:** CAPTCHA appears during login, causing tests to fail.  
**Solution:** Use `storageState` - authenticate once in `auth.setup.ts`, save session to `playwright/.auth/amazon-user.json`, reuse in all tests.

### Click intercepted by overlay/image

**Problem:** Clicking on product title link fails - element intercepted by image overlay.  
**Solution:** Click on product image (`img.s-image`) instead of title link.

### Cart header locator

**Problem:** Amazon renders cart header as `<h1>` or `<h2>`.
**Solution:** Use multiple selectors: `h1:has-text("Shopping Cart"), h2:has-text("Shopping Cart")`

### Page not loaded before assertion

**Problem:** `isCartPageOpened()` returns false because page not fully loaded.  
**Solution:** Add `waitForLoadState('domcontentloaded')` and small timeout before checking.

### Jenkins: "Batch scripts can only run on Windows"

**Problem:** Jenkinsfile used `bat` commands but Jenkins runs in Linux container.  
**Solution:** Replace `bat` with `sh` in Jenkinsfile.

### Jenkins: Node.js 25.x missing libatomic.so.1

**Problem:** Latest Node.js doesn't work in Jenkins container.  
**Solution:** Use Node.js 20.x LTS in Jenkins Tools configuration.

### Jenkins: Empty .env file

**Problem:** `.env` not in repo (gitignore), tests fail without credentials.  
**Solution:** Use Jenkins Credentials and `environment` block in Jenkinsfile.
