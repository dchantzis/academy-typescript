# Lesson 3 — Arrays and collections

[Academy index](../README.md)

Lesson ID: L03  
Status: **Complete — covered and practised**  
Prerequisites: Lessons 0–2  
Estimated focused time: **70–100 minutes** (planning range, not a measured completion time)  
Last updated: 12 October 2026

## Chapter index

| Chapter | Topics | Estimate |
|---|---|---:|
| 3.1 | map, filter and find | 15–20 min |
| 3.2 | some, every and reduce | 10–15 min |
| 3.3 | Sorting, copying and mutation | 10–15 min |
| 3.4 | forEach and direct callbacks | 5–10 min |
| 3.5 | Map, Set and keyed storage reminders | 15–20 min |
| 3.6 | Order-summary exercise and review | 15–20 min |

```js
const items = [
  { sku: "A", priceMinor: 1000, quantity: 2 },
  { sku: "B", priceMinor: 500, quantity: 0 },
  { sku: "C", priceMinor: 750, quantity: 1 },
];

const skus = items.map((item) => item.sku);
const available = items.filter((item) => item.quantity > 0);
const selected = items.find((item) => item.sku === "A");
const total = items.reduce(
  (sum, item) => sum + item.priceMinor * item.quantity,
  0,
);
```

| Method | Result | Typical purpose |
|---|---|---|
| map | New array, one output per input | Transform |
| filter | New array of matching elements | Select many |
| find | First match or undefined | Select one |
| some | Boolean | Any match? |
| every | Boolean | All match? |
| reduce | Accumulated result | Aggregate |
| forEach | undefined | Side effects |

`filter` and `map` do not deep-copy objects. `every` returns true for an empty array; `some` returns false. Decide whether this is correct for your business rule.

### Sorting and mutation

```js
const prices = [20, 3, 100];
const ascending = [...prices].sort((a, b) => a - b);
```

`sort` mutates its input. Default sorting compares string representations, so use a numeric comparator. Negative means a comes before b, positive means after, zero means equivalent ordering.

A clear loop is acceptable. Do not force a complicated reduce merely to look modern.

### Map and Set

```js
const uniqueSkus = [...new Set(["A", "A", "B"])];
const quantities = new Map();
quantities.set("A", 2);
console.log(quantities.get("A")); // 2
```

`Set` stores unique values; `Map` stores key/value entries and supports keys beyond strings. Object uniqueness uses reference identity, not deep equality. These help with deduplication and lookups.

### Exercise 3

Using the items above: return positive-quantity items, return their SKUs, calculate the total, find a missing SKU and handle its absence, and return items ordered by price without changing the input array.

**Recap:** filter selects, map transforms, find may miss, reduce needs an initial accumulator, sort mutates.

### Map, Record and object shapes: retrieval reference

An interface describes a type; a Map stores runtime entries. Record is a type describing a plain object, not an array and not a runtime constructor. The storage choice does not change how callers invoke the class's public methods.

| Operation | Map | Plain object typed as Record |
|---|---|---|
| Store/replace | `map.set(key, value)` | `object[key] = value` |
| Read | `map.get(key)` | `object[key]` |
| Exists | `map.has(key)` | `Object.hasOwn(object, key)` |
| Remove | `map.delete(key)` | `delete object[key]` |
| Count | `map.size` | `Object.keys(object).length` |

Map.set takes **two arguments**, not one object containing a key and value. Map has no add method; Set has add. Map.get returns undefined when missing. An entry containing zero still exists. `get(key) ?? 0` gives a fallback but does not distinguish missing from present-zero; use has when that distinction matters. Array.map transforms a list and is unrelated to the Map collection.

```ts
class StockTracker {
  #stock: Map<string, number> = new Map();
  setStock(sku: string, quantity: number): void {
    this.#stock.set(sku, quantity);
  }
  getStock(sku: string): number {
    return this.#stock.get(sku) ?? 0;
  }
  hasSku(sku: string): boolean {
    return this.#stock.has(sku);
  }
}
```

Use `Map<string, Product>` when each entry is a Product, or `Record<string, Product>` for a plain-object lookup. Use a `Product` property when storing one product. Class method parameters determine whether callers pass separate arguments or an object; an object can be supplied inline.
