# Lesson 8 — Practical order application

[Academy index](../README.md)

Lesson ID: L08  
Status: **Complete — covered and practised**  
Prerequisites: Lessons 0–7  
Estimated focused time: **60–90 minutes** (planning range, not a measured completion time)  
Last updated: 12 October 2026

## Chapter index

| Chapter | Topics | Estimate |
|---|---|---:|
| 8.1 | Clarify requirements; domain and result types | 5–10 min |
| 8.2 | Totals, validation and duplicate policy | 10–15 min |
| 8.3 | Async repository and stock checking | 10–15 min |
| 8.4 | Automated tests and debugging | 15–20 min |
| 8.5 | Requirement change: aggregate SKU demand | 10–15 min |
| 8.6 | Review, mutation checks and limitations | 10–15 min |

Status: **Complete**. Chapters 8.1–8.6 were practised and the final test suite passed. The final duplicate policy allows repeated SKUs and checks their combined demand.

### 8.1 Requirements, domain and result types

Working files in our project:

- `application/lessons/lesson-08/08-order.ts`
- `application/lessons/lesson-08/08-stock-repository.ts`
- `application/tests/08-order.test.ts`

Each OrderItem has `sku`, `priceMinor` and `quantity`. Prices and totals remain in minor units. Reject empty orders, unsafe/fractional/negative prices and unsafe/fractional/non-positive quantities. Zero price is valid. Missing stock means zero. Preparing an order checks availability without reserving or consuming stock.

```ts
export interface OrderItem {
  sku: string;
  priceMinor: number;
  quantity: number;
}
export type OrderValidation =
  | { valid: true }
  | { valid: false; error: string };
export type PreparationResult =
  | { kind: "ready"; totalMinor: number }
  | { kind: "invalid"; error: string }
  | { kind: "insufficient"; sku: string; available: number }
  | { kind: "lookupFailure"; error: string };
export interface StockRepository {
  getAvailable(sku: string): Promise<number>;
  hasSku(sku: string): Promise<boolean>;
}
```

hasSku was added for Map/interface practice. prepareOrder needs only getAvailable: missing SKU is insufficient stock, while lookupFailure represents an operation throwing.

### 8.2 Totals and validation

calculateLineTotal returns `item.priceMinor * item.quantity`. calculateOrderTotal sums line totals using for...of, with zero as the initial accumulator and a final return. Empty totals return zero even though preparing an empty order is invalid: these functions have different responsibilities.

validateOrder returns an OrderValidation value; normal invalid input does not throw. Inspect `validation.valid`, then use `validation.error` in the narrowed failure branch. Use Number.isSafeInteger and domain range checks. Convert to pounds only when formatting for display, not during total calculation.

### 8.3 Async repository and stock checking

```ts
// 08-stock-repository.ts
import type { StockRepository } from "./08-order.ts";
export class InMemoryStockRepository implements StockRepository {
  private stock: Map<string, number>;
  constructor(stock: Map<string, number>) {
    this.stock = stock;
  }
  async getAvailable(sku: string): Promise<number> {
    return this.stock.get(sku) ?? 0;
  }
  async hasSku(sku: string): Promise<boolean> {
    return this.stock.has(sku);
  }
}
```

Map.get returns a value or undefined; Map.has returns a boolean. Checking `map.has(sku) !== undefined` is always true. `"quantity" in map` does not check stored entries. Map.set takes two arguments: key and value.

An async method wraps its returned number in a promise. Await getAvailable inside try/catch; return insufficient if available is below demand and lookupFailure on an exception. Keep the domain module independent of the concrete repository: it needs the interface, not an import of InMemoryStockRepository.

### 8.4 Automated tests and debugging

Tests live under tests/ because our script runs `tsx --test tests/*.test.ts`. Import source from `../lessons/lesson-08/08-order.ts`. Imported source should not execute demo logging.

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { calculateLineTotal } from "../lessons/lesson-08/08-order.ts";

test("calculates a line total in minor units", () => {
  assert.equal(calculateLineTotal({
    sku: "PRINT", priceMinor: 1200, quantity: 2,
  }), 2400);
});
```

Use assert.equal for primitive values and assert.deepEqual for result objects. Async tests await prepareOrder before asserting. A test without an assertion can pass despite the wrong returned value. A passing suite does not replace `npm run typecheck`.

We deliberately changed a calculation to expose a regression, read actual versus expected values, then restored it. We also used an object satisfying StockRepository as a fake: getAvailable throws a chosen Error, allowing a predictable lookupFailure assertion. A second fake succeeds for PRINT then throws for BOOK, testing failure after prior successful work. A valid interface does not guarantee successful runtime operations.

Cases practised: line totals, empty total, multiple lines, repeated-line total, invalid empty order, zero price, zero quantity, fractional price, existing/missing stock, present-zero SKU, ready order, insufficient stock, repository failures, duplicate policy and unchanged input.

### 8.5 Requirement change: aggregate SKU demand

Initial rule: reject duplicates with Set<string>. Revised rule: allow duplicates and sum demand per SKU using Map<string, number>.

First write a failing test: two PRINT lines each request 2, stock is 3, expected insufficient. The initial implementation returns invalid Duplicate SKU. That is an expected failure against the changed requirement.

```ts
const quantitiesBySku = new Map<string, number>();
for (const item of items) {
  const currentQuantity = quantitiesBySku.get(item.sku) ?? 0;
  quantitiesBySku.set(item.sku, currentQuantity + item.quantity);
}
```

Storing only currentQuantity leaves every first entry at zero. Add the current line's quantity. Iterating `for (const [sku, requestedQuantity] of quantitiesBySku)` destructures each key/value entry.

Keep price totals based on original lines, so differing line prices remain part of the calculation. Update the old duplicate-rejection test to expect ready when combined demand fits stock; do not retain contradictory policies in the suite.

| Example | Final expected result |
|---|---|
| PRINT price 2000, quantity 1, twice; stock 5 | ready, totalMinor 4000 |
| PRINT price 1200, quantity 2, twice; stock 3 | insufficient, sku PRINT, available 3 |
| Missing SKU with positive demand | insufficient, available 0 |
| Repository throws Error("Stock service unavailable") | lookupFailure with that message |

<details>
<summary>Final prepareOrder reference — open after attempting the exercise</summary>

This function belongs in 08-order.ts alongside the types, validateOrder and calculateOrderTotal.

```ts
export async function prepareOrder(
  items: OrderItem[],
  repository: StockRepository,
): Promise<PreparationResult> {
  const validation = validateOrder(items);
  if (!validation.valid) {
    return { kind: "invalid", error: validation.error };
  }

  const quantitiesBySku = new Map<string, number>();
  for (const item of items) {
    const currentQuantity = quantitiesBySku.get(item.sku) ?? 0;
    quantitiesBySku.set(item.sku, currentQuantity + item.quantity);
  }

  for (const [sku, requestedQuantity] of quantitiesBySku) {
    try {
      const available = await repository.getAvailable(sku);
      if (available < requestedQuantity) {
        return { kind: "insufficient", sku, available };
      }
    } catch (error: unknown) {
      return {
        kind: "lookupFailure",
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
  return { kind: "ready", totalMinor: calculateOrderTotal(items) };
}
```

</details>

### 8.6 Mutation checks and limitations

Snapshot the order with `items.map((item) => ({ ...item }))`, await preparation, and deepEqual items against the snapshot. Our fields are primitives, so copying each object is enough here. `const originalItems = items` shares the same array and can hide mutations. Also assert that stock remains unchanged after preparation.

Limitations reviewed:

- Ready means sufficient when checked, not reserved. Two orders requesting 4 with stock 5 can both receive ready, even sequentially, because preparation never reduces stock. State the reservation assumption explicitly.
- Production reservations need an atomic check-and-reserve operation, such as an appropriate transaction with locking or a conditional update. Merely adding subtraction after a separate lookup does not guarantee safety under concurrency.
- Safe integer inputs do not guarantee safe products or sums. Line multiplication, order totals and aggregated quantities can exceed Number.MAX_SAFE_INTEGER. Production code should guard calculated values or choose a suitable representation.
- The in-memory repository assumes valid stock numbers. A real external adapter should validate returned data before exposing it to domain logic.
- SKU-format rules, conflicting price policy, payments, persistence, retries and reservations were not implemented. Clarify these requirements before extending the design.

**Completion:** meaningful tests passed after the policy change, input and stock remained unchanged, and implementation limitations were discussed. Independent fluency is the next goal in Lesson 9.
