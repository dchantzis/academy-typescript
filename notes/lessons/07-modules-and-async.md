# Lesson 7 — Modules, promises and external data

[Academy index](../README.md)

Lesson ID: L07  
Status: **Complete — covered and practised**  
Prerequisites: Lessons 0–6  
Estimated focused time: **95–135 minutes** (planning range, not a measured completion time)  
Last updated: 12 October 2026

## Chapter index

| Chapter | Topics | Estimate |
|---|---|---:|
| 7.1 | Modules: export, import and import type | 10–15 min |
| 7.2 | Promises, Promise<T>, resolution and rejection | 15–20 min |
| 7.3 | async/await and returned promises | 15–20 min |
| 7.4 | Errors, sequential work and Promise.all | 15–20 min |
| 7.5 | Fetch, HTTP status and unknown JSON validation | 20–30 min |
| 7.6 | Integration exercise and review | 20–30 min |

Status: **Complete**, including stock-service and customer-service integration exercises. Repeat from a brief for independent recall.

| Chapter | Focus | Estimate |
|---|---|---:|
| 7.1 | Modules: export, import, import type | 10–15 minutes |
| 7.2 | Promises, Promise<T>, resolution and rejection | 15–20 minutes |
| 7.3 | async/await and returned promises | 15–20 minutes |
| 7.4 | Errors, sequential work and Promise.all | 15–20 minutes |
| 7.5 | Fetch, HTTP failures and validating unknown JSON | 20–30 minutes |
| Final exercise | Modules, async lookup and validation together | 20–30 minutes |

### 7.1 First module exercise

```ts
// lessons/07-product.ts
export interface Product { sku: string; priceMinor: number; }
export function formatPrice(priceMinor: number): string {
  return `GBP ${(priceMinor / 100).toFixed(2)}`;
}
```

```ts
// lessons/07-modules.ts
import { formatPrice } from "./07-product.ts";
import type { Product } from "./07-product.ts";
const product: Product = { sku: "PRINT", priceMinor: 1200 };
console.log(formatPrice(product.priceMinor)); // GBP 12.00
```

Run npm run typecheck, then npm run lesson -- lessons/07-modules.ts inside the container. Import/export already makes each file a module; export {} is unnecessary here. Our tsconfig permits .ts import extensions with the tsx runner. A type-only import disappears; the function import is needed at runtime.

### Modules

```ts
// totals.ts
export function add(a: number, b: number): number {
  return a + b;
}

// lesson.ts, when using the local tsx practice runner
import { add } from "./totals.ts";
console.log(add(2, 3));
```

An export exposes a value from a file; import consumes it. `export type` and `import type` describe type-only usage. Import extension rules depend on the runner/compiler/module configuration: use the existing project's convention. The one-file exercises avoid that setup issue.

### Promises and async/await

A Promise represents eventual completion or failure. `async` functions always return promises. `await` obtains the resolved value or throws the rejection reason. It suspends that async function, not the whole JavaScript process.

```ts
async function getStock(sku: string): Promise<number> {
  return sku === "A" ? 3 : 0;
}

async function main(): Promise<void> {
  try {
    const quantity = await getStock("A");
    console.log(quantity);
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : String(error));
  }
}

void main();
```

`void main()` intentionally discards the promise value; it does not handle a rejection. Here main has its own try/catch. In application code, deliberately handle errors at an appropriate boundary.

```ts
const [a, b] = await Promise.all([getStock("A"), getStock("B")]);
```

This line belongs inside an async function. Promise.all waits for both, rejects if one rejects, and does not cancel the other operation. Use concurrency only when operations are independent. `forEach(async ...)` does not wait for all callbacks; use an awaited for...of loop or map plus Promise.all.

### Typed JSON requires runtime validation

```ts
type StockResponse = { sku: string; quantity: number };

function parseStock(value: unknown): StockResponse {
  if (typeof value !== "object" || value === null) {
    throw new Error("Expected an object");
  }
  if (!("sku" in value) || typeof value.sku !== "string") {
    throw new Error("Invalid SKU");
  }
  if (!("quantity" in value) || typeof value.quantity !== "number"
      || !Number.isSafeInteger(value.quantity) || value.quantity < 0) {
    throw new Error("Invalid quantity");
  }
  return { sku: value.sku, quantity: value.quantity };
}

async function fetchStock(url: string): Promise<StockResponse> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data: unknown = await response.json();
  return parseStock(data);
}
```

This fetch example needs an environment providing fetch, such as a modern browser or a suitable Node runtime. Network failures reject; HTTP errors such as 404 do not automatically reject fetch. JSON parsing can also throw. An `as StockResponse` cast would not prove the data is valid.

### Exercise 7 — revised integration brief

Create a module exporting StockResponse, parseStock and an async fake lookup. Store fixture data in a Map<string, unknown>; get must handle a missing entry. The async lookup returns Promise<StockResponse> after validation. In a second module, import the function and use import type for the response type.

Test valid data, null, missing quantity, a string quantity, zero stock and a rejected lookup. Await results and catch errors as unknown. First process SKUs sequentially, then process independent lookups with Promise.all and explain how the failure behaviour differs. Do not use any or as to silence input uncertainty.

The earlier smaller warm-up remains useful:

Create an async fake lookup returning a quantity. Await it and print whether an item is available. Make it throw for one SKU and handle the error. Run parseStock with valid data, null, a missing quantity and a string quantity.

**Recap:** async returns Promise<T>; await can throw; concurrency is explicit; HTTP status needs checking; JSON is an untrusted boundary.

### Lesson 7 notes from integration practice

- Importing a module executes its top-level runtime code. Keep demonstration logs in a separate runner so imports do not print unrelated output.
- `await isInStock(sku)` obtains a boolean but does not print it. Use the returned value explicitly.
- A synchronous Map.get does not need await, even inside an async function.
- `data === undefined` checks absence; `data === "undefined"` compares with a string.
- The parser validates its argument and returns a fresh object; it does not look up fixtures. The lookup retrieves fixtures and delegates validation. The runner chooses whether to log and continue or stop.
- Catching and logging inside a function declared `Promise<Customer>` without returning or rethrowing loses its required result. Let errors propagate when the caller owns recovery.
- Put try/catch inside a sequential loop to continue after each failed item. Rethrowing stops that flow.
- Promise.all rejects when an input rejects; it does not wait for a particular final SKU to discover failure, and it does not cancel other work. Successful results retain input order.
