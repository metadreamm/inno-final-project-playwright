import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../utils/logger";

export class CartPage extends BasePage {
  private readonly cartHeader: Locator;
  private readonly cartItems: Locator;
  private readonly deleteButton: Locator;

  constructor(page: Page) {
    super(page);
    // Amazon may render cart header as h1 or h2 depending on page version
    this.cartHeader = page.locator('h1:has-text("Shopping Cart"), h2:has-text("Shopping Cart")');
    // Handles different cart HTML structures - with/without Active Items container
    this.cartItems = page.locator('[data-name="Active Items"] .sc-list-item, .sc-list-item');
    this.deleteButton = page.locator('input[data-action="delete-active"]').first();
  }

  async isCartPageOpened(): Promise<boolean> {
    logger.info("Checking if Cart page is opened");
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForTimeout(1000);
    return await this.cartHeader.isVisible();
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async isProductDisplayed(): Promise<boolean> {
    logger.info("Checking if product is displayed in cart");
    const count = await this.getCartItemsCount();
    return count > 0;
  }

  async clearCart(): Promise<void> {
    logger.info("Clearing cart");
    while (await this.deleteButton.isVisible()) {
      await this.deleteButton.click();
      await this.page.waitForTimeout(1000);
    }
  }
}
