import * as path from "path";
import * as os from "os";

export interface CronField {
  readonly start: number;
  readonly end: number;
  readonly step: number;
  readonly isWildcard: boolean;
}

export interface CronResult {
  readonly valid: boolean;
  readonly message: string;
  readonly description?: string;
}

const RANGES = [
  [0, 59],
  [0, 23],
  [1, 31],
  [1, 12],
  [0, 6],
] as const;

function parseField(value: string, min: number, max: number): CronField {
  if (value === "*") {
    return { start: min, end: max, step: 1, isWildcard: true };
  }
  const parts = value.split("/");
  const step = parts.length > 1 ? parseInt(parts[1], 10) : 1;
  const range = parts[0];
  if (range === "*") {
    return { start: min, end: max, step, isWildcard: true };
  }
  if (isNaN(step) || step < 1) {
    throw new Error(`Invalid step: ${value}`);
  }
  const [startStr, endStr] = range.includes("-")
    ? range.split("-")
    : [range, range];
  const start = parseInt(startStr, 10);
  const end = parseInt(endStr, 10);
  if (isNaN(start) || isNaN(end) || start < min || end > max) {
    throw new Error(`Invalid range: ${value}`);
  }
  return { start, end, step, isWildcard: false };
}

export function describeCron(expression: string): CronResult {
  if (typeof expression !== "string") {
    return { valid: false, message: "Expression must be a string" };
  }
  const parts = expression.trim().split(/\s+/);
  if (parts.length < 5 || parts.length > 6) {
    return { valid: false, message: "Invalid number of fields (expected 5 or 6)" };
  }
  try {
    const fields = parts.map((p, i) => {
      const [minVal, maxVal] = RANGES[i] || [0, 59];
      return parseField(p, minVal, maxVal);
    });
    const [min, hour] = fields;
    const desc = [];
    desc.push(`Every ${min.step} minutes`);
    desc.push(
      `between ${String(hour.start).padStart(2, "0")}:${String(min.start).padStart(2, "0")} and ${String(hour.end).padStart(2, "0")}:${String(min.end).padStart(2, "0")}`
    );
    return { valid: true, message: "Valid", description: desc.join(", ") };
  } catch (error) {
    return { valid: false, message: error instanceof Error ? error.message : "Unknown error" };
  }
}

export function getDataDir(): string {
  return path.join(os.homedir(), ".cron-describe");
}