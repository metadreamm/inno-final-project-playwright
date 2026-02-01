import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { logger } from "../utils/logger";

test.describe("Cart tests", () => {
  // Clear cart before each test to ensure clean state
  test.beforeEach(async ({ page }) => {
    const cartPage = new CartPage(page);
    await page.goto("/cart");
    await cartPage.clearCart();
  });

  // Clean cart after each test
  test.afterEach(async ({ page }) => {
    const cartPage = new CartPage(page);
    await page.goto("/cart");
    await cartPage.clearCart();
  });

  test("1.3 Adding product to cart @smoke @cart", async ({ page }) => {
    logger.info("Test: Adding product to cart");

    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const productPage = new ProductPage(page);

    await homePage.open();
    await homePage.searchProduct("123");
    await searchResultsPage.clickFirstProduct();

    await productPage.addToCart();

    const isAdded = await productPage.isProductAddedToCart();
    expect(isAdded).toBeTruthy();

    const cartCount = await productPage.getCartCount();
    expect(parseInt(cartCount)).toBeGreaterThanOrEqual(1);
  });

  test("1.4 Added product is displayed in cart @smoke @cart", async ({ page }) => {
    logger.info("Test: Product displayed in cart");

    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.open();
    await homePage.searchProduct("123");
    await searchResultsPage.clickFirstProduct();
    await productPage.addToCart();

    await productPage.goToCart();

    const isCartOpened = await cartPage.isCartPageOpened();
    expect(isCartOpened).toBeTruthy();

    const isProductDisplayed = await cartPage.isProductDisplayed();
    expect(isProductDisplayed).toBeTruthy();
  });
});
