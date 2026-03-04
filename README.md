# 🕰️ cron-describe

**Turn cryptic cron strings into plain English — instantly!** No more squinting at `*/15 9-17 * * 1-5` wondering what it actually means. `cron-describe` parses, validates, and explains cron expressions in human-readable text so you can debug schedules in seconds.

## 🚀 Quick Start

```bash
bun add cron-describe
# or
npm install cron-describe
```

## 📦 Installation

Install via your favorite package manager:

```bash
bun add cron-describe
# or
npm install cron-describe
# or
yarn add cron-describe
```

## 📖 API

### `describeCron(expression: string): CronResult`

Parses and describes a cron expression.

**Parameters:**
- `expression` (string): A cron expression (e.g., `*/15 9-17 * * 1-5`).

**Returns:**
- `CronResult`: An object with:
  - `valid` (boolean): Whether the expression is valid.
  - `message` (string): A validation message.
  - `description` (string | undefined): Human-readable description if valid.

**Example:**
```typescript
import { describeCron } from "cron-describe";

const result = describeCron("*/15 9-17 * * 1-5");
console.log(result.description);
// Output: "Every 15 minutes, between 09:00 and 17:00, Monday through Friday"
```

### `getDataDir(): string`

Returns the default data directory path for `cron-describe`.

**Returns:**
- `string`: The path to the data directory (e.g., `~/.cron-describe`).

**Example:**
```typescript
import { getDataDir } from "cron-describe";

console.log(getDataDir());
// Output: "/Users/yourname/.cron-describe" (or equivalent on your OS)
```

## 🧪 Examples

### Basic Usage
```typescript
import { describeCron } from "cron-describe";

const examples = [
  "*/5 * * * *",       // Every 5 minutes
  "0 0 * * *",         // Daily at midnight
  "0 9-17 * * 1-5",    // Weekdays, 9 AM to 5 PM
  "0 0 1 * *",         // First day of every month
  "0 0 * * 0",         // Every Sunday
];

examples.forEach(expr => {
  const result = describeCron(expr);
  console.log(`${expr} → ${result.description || result.message}`);
});
```

### Validation
```typescript
import { describeCron } from "cron-describe";

const invalidExpr = "not-a-cron";
const result = describeCron(invalidExpr);
console.log(result.valid); // false
console.log(result.message); // "Invalid number of fields (expected 5 or 6)"
```

## 🤝 Contributing

Love `cron-describe`? Want to make it even better? Contributions are welcome!

1. Fork the repo.
2. Create a feature branch (`git checkout -b my-feature`).
3. Commit your changes (`git commit -am "Add awesome feature"`).
4. Push to the branch (`git push origin my-feature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

Made with ❤️ for developers who hate deciphering cron syntax. Happy scheduling! 🎉