import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../utils/logger";

export class HomePage extends BasePage {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly helloUserLink: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByRole("searchbox");
    this.searchButton = page.locator("#nav-search-submit-button");
    this.helloUserLink = page.getByRole("link", { name: /Hello,/ });
  }

  async open(): Promise<void> {
    logger.info("Opening Amazon home page");
    await this.page.goto("/");
  }

  async searchProduct(productName: string): Promise<void> {
    logger.step(1, `Enter "${productName}" in search field`);
    await this.fill(this.searchInput, productName, "Search input");

    logger.step(2, "Click Search button");
    await this.click(this.searchButton, "Search button");
  }

  async isUserLoggedIn(): Promise<boolean> {
    return await this.helloUserLink.isVisible();
  }
}
