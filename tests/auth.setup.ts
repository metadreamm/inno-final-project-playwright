import { test, expect } from "@playwright/test";
import { config } from "../config/config";
import * as fs from "fs";

// Path to save authenticated session state
const authFile = "playwright/.auth/amazon-user.json";

/**
 * Authentication setup - runs once before all tests
 * Saves session to avoid login in each test and bypass captcha
 */
test("authenticate", async ({ page }) => {
  // Skip if session already exists
  if (fs.existsSync(authFile)) {
    const stats = fs.statSync(authFile);
    const hoursSinceModified = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60);

    // Reuse session if less than 24 hours old
    if (hoursSinceModified < 24) {
      console.log("Using existing session");
      return;
    }
  }

  await page.goto(config.baseUrl);

  await page.getByRole("link", { name: "Account & Lists" }).hover();
  await page.getByRole("link", { name: "Sign in" }).first().click();

  await page.getByLabel("Email").fill(config.credentials.email);
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Password").fill(config.credentials.password);
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByRole("link", { name: /Hello,/ })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
