import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { logger } from "../utils/logger";

test.describe("Login tests", () => {
  test("1.1 Successful authorization @smoke @login", async ({ page }) => {
    logger.info("Test: Successful authorization");

    const homePage = new HomePage(page);

    await homePage.open();

    const isLoggedIn = await homePage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });
});
