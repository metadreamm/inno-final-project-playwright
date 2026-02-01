import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { logger } from "../utils/logger";

test.describe("Search tests", () => {
  test("1.2 Search products @smoke @search", async ({ page }) => {
    logger.info("Test: Search products");
    const searchQuery = "iPhone 14";

    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);

    await homePage.open();
    await homePage.searchProduct(searchQuery);

    const resultsDisplayed = await searchResultsPage.areResultsDisplayed();
    expect(resultsDisplayed).toBeTruthy();

    const titles = await searchResultsPage.getResultsTitle();
    logger.info(`Found ${titles.length} products`);
  });
});
