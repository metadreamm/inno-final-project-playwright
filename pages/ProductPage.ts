import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../utils/logger";

export class ProductPage extends BasePage {
  private readonly addToCartButton: Locator;
  private readonly cartIcon: Locator;
  private readonly cartCount: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
    this.cartIcon = page.locator("#nav-cart");
    this.cartCount = page.locator("#nav-cart-count");
  }

  async addToCart(): Promise<void> {
    logger.step(1, "Click Add to cart button");
    await this.click(this.addToCartButton, "Add to Cart button");
  }

  async isProductAddedToCart(): Promise<boolean> {
    // Check cart counter instead of success message (more reliable)
    logger.info("Checking if product was added to cart");
    await this.cartCount.waitFor({ state: "visible" });

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
