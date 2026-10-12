# Core exercise solutions

[Academy index](../README.md)

These are possible solutions, not the only correct ones. Do not memorise them.

### Solution 1A

```js
const values = ["Print", 1200, true, null, undefined, [], {}];
for (const value of values) {
  console.log(value, typeof value);
}
console.log(Array.isArray([])); // true
console.log("5" + 2);          // "52"
console.log(Number("5") + 2);  // 7
console.log(Boolean("false")); // true
console.log(Boolean([]));      // true

const original = { quantity: 2 };
const shared = original;
shared.quantity = 3;
console.log(original.quantity); // 3

let first = 2;
let second = first;
second = 3;
console.log(first); // 2

console.log(typeof 1n); // bigint
console.log(Symbol("id") === Symbol("id")); // false
```

The runtime type labels are string, number, boolean, object, undefined, object, object. Array.isArray handles the array case; equality with null handles null. Object assignment shares identity; number assignment copies a primitive value.

### Solution 1

```js
const items = [
  { name: "Print", priceMinor: 1200, quantity: 2 },
  { name: "Book", priceMinor: 2000, quantity: 1 },
  { name: "Card", priceMinor: 300, quantity: 0 },
];
let total = 0;
for (const item of items) {
  total += item.priceMinor * item.quantity;
}
console.log(`Total: ${total} minor units`); // 4400
```

### Solution 2

```js
function describeItem(item) {
  const { name, quantity } = item;
  return `${name}: ${quantity} units`;
}
const original = { name: "Print", quantity: 2 };
const changed = { ...original, quantity: 3 };
function getDiscount(discount) {
  return discount ?? 0;
}
```

### Solution 3

```js
const items = [
  { sku: "A", priceMinor: 1000, quantity: 2 },
  { sku: "B", priceMinor: 500, quantity: 0 },
  { sku: "C", priceMinor: 750, quantity: 1 },
];
const positive = items.filter((item) => item.quantity > 0);
const skus = positive.map((item) => item.sku);
const total = items.reduce((sum, item) => sum + item.priceMinor * item.quantity, 0);
const missing = items.find((item) => item.sku === "X");
console.log(missing?.sku ?? "Not found");
const sorted = [...items].sort((a, b) => a.priceMinor - b.priceMinor);
```

Total is 2750. The sorted array is new; its elements remain the same object references.

### Solution 4

```ts
type Item = { sku: string; priceMinor: number; quantity: number };
function getTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.priceMinor * item.quantity, 0);
}
console.log(getTotal([{ sku: "A", priceMinor: 1000, quantity: 2 }]));
```

Types establish number, not non-negative integer. Those business constraints still need validation.

### Solution 5

```ts
type Item = { sku: string; priceMinor: number; quantity: number };
type LookupResult =
  | { kind: "found"; item: Item }
  | { kind: "missing"; sku: string }
  | { kind: "error"; message: string };

function message(result: LookupResult): string {
  switch (result.kind) {
    case "found": return `Found ${result.item.sku}`;
    case "missing": return `Missing ${result.sku}`;
    case "error": return result.message;
  }
}
```

### Solution 6

```ts
function last<T>(values: T[]): T | undefined {
  return values[values.length - 1];
}
type Customer = { id: string; name: string; email: string };
type CustomerUpdate = Partial<Pick<Customer, "name" | "email">>;
```

### Solution 7

```ts
async function fakeStock(sku: string): Promise<number> {
  if (sku === "FAIL") throw new Error("Lookup unavailable");
  return sku === "A" ? 3 : 0;
}
async function main(): Promise<void> {
  for (const sku of ["A", "B", "FAIL"]) {
    try {
      const quantity = await fakeStock(sku);
      console.log(sku, quantity > 0 ? "Available" : "Unavailable");
    } catch (error: unknown) {
      console.log(error instanceof Error ? error.message : String(error));
    }
  }
}
void main();
```

For parseStock, valid input returns a fresh object; null, missing quantity and string quantity throw. A runtime validator must inspect fields, not merely assert the type.

### Earlier application baseline (unique-SKU policy)

This preserves the earlier exercise. It rejects repeated SKUs and uses an injected function; it is not the final Lesson 8 policy. Use the [final prepareOrder reference in Lesson 8](../lessons/08-order-application.md) for aggregated demand and the repository interface.

Paste this block alone into a file or Playground. It includes its own domain types and checks.

```ts
type Item = { sku: string; priceMinor: number; quantity: number };
type Order = { id: string; items: Item[] };
type StockLookup = (sku: string) => Promise<number>;
type PreparationResult =
  | { kind: "ready"; totalMinor: number }
  | { kind: "invalid"; reason: string }
  | { kind: "insufficient"; sku: string; available: number }
  | { kind: "lookupFailure"; reason: string };

function getTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.priceMinor * item.quantity, 0);
}

async function prepareOrder(
  order: Order,
  lookup: StockLookup,
): Promise<PreparationResult> {
  if (order.items.length === 0) {
    return { kind: "invalid", reason: "Order is empty" };
  }

  const seen = new Set<string>();
  for (const item of order.items) {
    if (!Number.isSafeInteger(item.priceMinor) || item.priceMinor < 0
        || !Number.isSafeInteger(item.quantity) || item.quantity <= 0) {
      return { kind: "invalid", reason: `Invalid line: ${item.sku}` };
    }
    if (seen.has(item.sku)) {
      return { kind: "invalid", reason: `Duplicate SKU: ${item.sku}` };
    }
    seen.add(item.sku);
  }

  try {
    for (const item of order.items) {
      const available = await lookup(item.sku);
      if (!Number.isSafeInteger(available) || available < 0) {
        return { kind: "lookupFailure", reason: "Invalid stock response" };
      }
      if (available < item.quantity) {
        return { kind: "insufficient", sku: item.sku, available };
      }
    }
  } catch (error: unknown) {
    return {
      kind: "lookupFailure",
      reason: error instanceof Error ? error.message : String(error),
    };
  }

  return { kind: "ready", totalMinor: getTotal(order.items) };
}

function check(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

async function main(): Promise<void> {
  const lookup: StockLookup = async (sku) => sku === "A" ? 3 : 1;
  const order: Order = {
    id: "order-1",
    items: [
      { sku: "A", priceMinor: 1000, quantity: 2 },
      { sku: "B", priceMinor: 500, quantity: 1 },
    ],
  };
  const result = await prepareOrder(order, lookup);
  check(result.kind === "ready" && result.totalMinor === 2500, "Valid order");
  check(order.items[0]?.quantity === 2, "Input should be unchanged");

  const empty = await prepareOrder({ id: "empty", items: [] }, lookup);
  check(empty.kind === "invalid", "Empty order");

  for (const quantity of [0, -1, 1.5]) {
    const invalid = await prepareOrder({
      id: "invalid",
      items: [{ sku: "A", priceMinor: 1000, quantity }],
    }, lookup);
    check(invalid.kind === "invalid", "Invalid quantity");
  }

  const negative = await prepareOrder({
    id: "negative",
    items: [{ sku: "A", priceMinor: -1, quantity: 1 }],
  }, lookup);
  check(negative.kind === "invalid", "Negative price");

  const duplicate = await prepareOrder({
    id: "duplicate",
    items: [
      { sku: "A", priceMinor: 1000, quantity: 2 },
      { sku: "A", priceMinor: 1000, quantity: 2 },
    ],
  }, lookup);
  check(duplicate.kind === "invalid", "Duplicate SKU");

  const insufficient = await prepareOrder(order, async () => 0);
  check(insufficient.kind === "insufficient", "Insufficient stock");

  const failure = await prepareOrder(order, async () => {
    throw new Error("Offline");
  });
  check(failure.kind === "lookupFailure", "Lookup failure");
  console.log("All checks passed", result);
}

main().catch((error: unknown) => {
  console.error(error);
  throw error;
});
```

The lookup is injected, making behaviour easy to check without HTTP. Checks are sequential for clarity and early exit. Validation precedes external calls. Lookup failure is modelled separately from invalid input. Limits to discuss: trusted typed Order input, integer precision for very large totals, stock changing after lookup, lack of reservation, and the deliberate duplicate-SKU rule. Production code would address these according to requirements.
