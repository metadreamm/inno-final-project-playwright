type LogLevel = "info" | "warn" | "error" | "debug";

// Provides formatted console output with timestamps and log levels
class Logger {
  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  info(message: string): void {
    console.log(this.formatMessage("info", message));
  }

  warn(message: string): void {
    console.warn(this.formatMessage("warn", message));
  }

  error(message: string): void {
    console.error(this.formatMessage("error", message));
  }

  debug(message: string): void {
    if (process.env.DEBUG) {
      console.log(this.formatMessage("debug", message));
    }
  }

  step(stepNumber: number, description: string): void {
    this.info(`Step ${stepNumber}: ${description}`);
  }
}

export const logger = new Logger();
