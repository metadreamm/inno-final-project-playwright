/**
 * Application configuration
 * Values are loaded from environment variables (.env file or CI secrets)
 */
export const config = {
  baseUrl: process.env.BASE_URL || "https://www.amazon.com",
  credentials: {
    email: process.env.USER_EMAIL || "",
    password: process.env.USER_PASSWORD || "",
  },
  timeouts: {
    default: 30000,
    short: 5000,
    long: 60000,
  },
};
