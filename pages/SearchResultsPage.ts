import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../utils/logger";

export class SearchResultsPage extends BasePage {
  private readonly searchResults: Locator;
  private readonly firstProductLink: Locator;

  constructor(page: Page) {
    super(page);
    this.searchResults = page.locator('[data-component-type="s-search-result"]');
    this.firstProductLink = page
      .locator('[data-component-type="s-search-result"]')
      .first()
      .locator("h2 a.a-link-normal");
  }

  async getResultsCount(): Promise<number> {
    await this.searchResults.first().waitFor({ state: "visible" });
    return await this.searchResults.count();
  }

  async areResultsDisplayed(): Promise<boolean> {
    logger.info("Checking if search results are displayed");
    await this.searchResults.first().waitFor({ state: "visible", timeout: 10000 });
    return await this.searchResults.first().isVisible();
  }

  async clickFirstProduct(): Promise<void> {
    logger.info("Clicking on first product in search results");
    //await this.click(this.firstProductLink, "First product link");
    const firstProductImage = this.page.locator('[data-component-type="s-search-result"] img.s-image').first();
    await firstProductImage.click();
  }

  async getResultsTitle(): Promise<string[]> {
    const titles: string[] = [];
    const count = await this.searchResults.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const title = await this.searchResults.nth(i).locator("h2").innerText();
      titles.push(title);
    }
    return titles;
  }
}
