import { Page, Locator } from "@playwright/test";
import { logger } from "../utils/logger";
import { config } from "../config/config";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Клик с ожиданием видимости элемента
  async click(locator: Locator, description: string): Promise<void> {
    logger.info(`Clicking on ${description}`);
    await locator.waitFor({ state: "visible", timeout: config.timeouts.default });
    await locator.click();
  }

  // Ввод текста с очисткой поля
  async fill(locator: Locator, text: string, description: string): Promise<void> {
    logger.info(`Filling "${description}" with value`);
    await locator.waitFor({ state: "visible", timeout: config.timeouts.default });
    await locator.fill(text);
  }

  // Hover с ожиданием
  async hover(locator: Locator, description: string): Promise<void> {
    logger.info(`Hovering over ${description}`);
    await locator.waitFor({ state: "visible", timeout: config.timeouts.default });
    await locator.hover();
  }

  // Ожидание элемента
  async waitForElement(locator: Locator, description: string): Promise<void> {
    logger.info(`Waiting for ${description}`);
    await locator.waitFor({ state: "visible", timeout: config.timeouts.default });
  }

  // Получение текста элемента
  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: "visible" });
    return await locator.innerText();
  }
}
