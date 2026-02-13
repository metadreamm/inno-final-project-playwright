import { Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductPage";

/**
 * Helper function to add a product to cart
 * Used across multiple tests to avoid code duplication.
 */
export async function addProductToCart(page: Page): Promise<ProductPage> {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);
  const productPage = new ProductPage(page);

  await homePage.open();
  await homePage.searchProduct("123");
  await searchResultsPage.clickFirstProduct();
  await productPage.addToCart();

  return productPage;
}
