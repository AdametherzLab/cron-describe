import * as path from "path";
import * as os from "os";

export const DEFAULT_DATA_DIR = path.join(os.homedir(), ".cron-describe");

export type CronField = "minute" | "hour" | "dayOfMonth" | "month" | "dayOfWeek";

export interface CronPart {
  readonly type: "step" | "range" | "value" | "all";
  readonly start?: number;
  readonly end?: number;
  readonly step?: number;
  readonly value?: number;
}

export interface ParsedCron {
  readonly minute: CronPart[];
  readonly hour: CronPart[];
  readonly dayOfMonth: CronPart[];
  readonly month: CronPart[];
  readonly dayOfWeek: CronPart[];
  readonly raw: string;
}

export interface ValidationError {
  readonly field: CronField;
  readonly message: string;
  readonly index: number;
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: ValidationError[];
  readonly parsed?: ParsedCron;
}

export interface Config {
  readonly dataDir: string;
  readonly maxEntries: number;
}

export interface Description {
  readonly text: string;
  readonly raw: string;
}

export interface CronExpression {
  readonly minute: number | number[];
  readonly hour: number | number[];
  readonly dayOfMonth: number | number[];
  readonly month: number | number[];
  readonly dayOfWeek: number | number[];
}

export function getDefaultConfig(): Config {
  return {
    dataDir: DEFAULT_DATA_DIR,
    maxEntries: 100,
  };
}