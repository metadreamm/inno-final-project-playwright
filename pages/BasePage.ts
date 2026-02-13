import { Page, Locator } from "@playwright/test";
import { logger } from "../utils/logger";
import { config } from "../config/config";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Click with visibility wait
  async click(locator: Locator, description: string): Promise<void> {
    logger.info(`Clicking on ${description}`);
    await locator.click();
  }

  // Fill input field with text
  async fill(locator: Locator, text: string, description: string): Promise<void> {
    logger.info(`Filling "${description}" with value`);
    await locator.fill(text);
  }

  // Hover with visibility wait
  async hover(locator: Locator, description: string): Promise<void> {
    logger.info(`Hovering over ${description}`);
    await locator.hover();
  }

  async waitForElement(locator: Locator, description: string): Promise<void> {
    logger.info(`Waiting for ${description}`);
    await locator.waitFor({ state: "visible" });
  }

  // Get text content of element
  async getText(locator: Locator): Promise<string> {
    return await locator.innerText();
  }
}
