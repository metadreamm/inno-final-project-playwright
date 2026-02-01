import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../utils/logger";

export class ProuctPage extends BasePage {
  private readonly addToCartButton: Locator;
  private readonly addedToCartMessage: Locator;
  private readonly cartIcon: Locator;
  private readonly cartCount: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.locator("#add-to-cart-button");
    this.addedToCartMessage = page.locator(`#NATC_SMART_WAGON_CONF_MSG_SUCCESS,
        [data-feature-id="addToCart"] .a-alert-success, #attachDisplayAddBase498`);
    this.cartIcon = page.locator("#nav-cart");
    this.cartCount = page.locator("#nav-cart-count");
  }

  async addToCart(): Promise<void> {
    logger.step(1, "Click Add to cart button");
    await this.click(this.addToCartButton, "Add to Cart button");
  }

  async isProductAddedToCart(): Promise<boolean> {
    logger.info('Checking if "Added to Cart" message is displayed');
    await this.page.waitForTimeout(1000);

    const cartCount = await this.cartCount.innerText();
    return parseInt(cartCount) > 0;
  }

  async getCartCount(): Promise<string> {
    return await this.getText(this.cartCount);
  }

  async goToCart(): Promise<void> {
    logger.info("Clicking on cart icon");
    await this.click(this.cartIcon, "Cart icon");
  }
}
