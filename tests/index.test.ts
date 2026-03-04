import { describe, it, expect } from "bun:test";
import { describeCron, getDataDir } from "../src/index";

describe("describeCron", () => {
  it("should return valid description for simple cron expression", () => {
    const result = describeCron("*/15 9-17 * * 1-5");
    expect(result.valid).toBeTrue();
    expect(result.description).toBeDefined();
    expect(result.description).toInclude("Every 15 minutes");
  });

  it("should return invalid for non-string input", () => {
    const result = describeCron(null as unknown as string);
    expect(result.valid).toBeFalse();
    expect(result.message).toInclude("must be a string");
  });

  it("should return invalid for malformed cron expression", () => {
    const result = describeCron("invalid");
    expect(result.valid).toBeFalse();
    expect(result.message).toInclude("Invalid number of fields");
  });

  it("should handle wildcard expressions", () => {
    const result = describeCron("* * * * *");
    expect(result.valid).toBeTrue();
    expect(result.description).toBeDefined();
  });

  it("should return invalid for out-of-range values", () => {
    const result = describeCron("60 * * * *");
    expect(result.valid).toBeFalse();
    expect(result.message).toInclude("Invalid range");
  });
});

describe("getDataDir", () => {
  it("should return a valid path", () => {
    const dataDir = getDataDir();
    expect(dataDir).toBeString();
    expect(dataDir).toInclude(".cron-describe");
  });
});