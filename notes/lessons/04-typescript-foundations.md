# Lesson 4 — TypeScript foundations

[Academy index](../README.md)

Lesson ID: L04  
Status: **Complete — covered and practised**  
Prerequisites: Lessons 0–3  
Estimated focused time: **60–95 minutes** (planning range, not a measured completion time)  
Last updated: 12 October 2026

## Chapter index

| Chapter | Topics | Estimate |
|---|---|---:|
| 4.1 | Inference, annotations, objects and arrays | 10–15 min |
| 4.2 | Typed functions and optional properties | 10–15 min |
| 4.3 | Function types and callbacks | 5–10 min |
| 4.4 | void and direct function callbacks | 5–10 min |
| 4.5 | Aliases, interfaces, extends and structural typing | 10–15 min |
| 4.6 | Tuples and destructuring | 5–10 min |
| 4.7 | Typed-order exercise and review | 15–20 min |

JavaScript defines what runs. TypeScript adds compile-time checking and editor assistance. Most type syntax disappears before runtime. A type annotation is not input validation.

### Inference and annotations

```ts
const name = "Dimitrios";
let quantity = 2; // inferred number
const prices: number[] = [1000, 500];

function lineTotal(priceMinor: number, quantity: number): number {
  return priceMinor * quantity;
}
```

Annotations follow the name, unlike PHP parameter types. Use lowercase `string`, `number`, `boolean`, not boxed `String`/`Number`. Inference means you need not annotate every local variable. Annotate function boundaries and domain models clearly.

### Object types, aliases and interfaces

```ts
type Item = {
  sku: string;
  priceMinor: number;
  quantity: number;
  description?: string;
};

const item: Item = { sku: "A", priceMinor: 1000, quantity: 2 };

interface Customer {
  id: string;
  name: string;
}
```

`type` names a type, including unions and primitives. `interface` primarily describes object shapes and can extend other interfaces; interfaces support declaration merging. Both work for many object models. Use either consistently; do not make this a lengthy interview debate.

Types are structural: a value with the required compatible properties can satisfy a type without explicitly implementing it. PHP interfaces are nominal contracts implemented by declared classes. Fresh object literals can receive extra-property checks; this is not a general guarantee that runtime objects contain only listed fields.

### Arrays, tuples and function types

```ts
const items: Item[] = [];
const pair: [string, number] = ["A", 2];
type PriceCalculator = (item: Item) => number;
const calculate: PriceCalculator = (item) => item.priceMinor * item.quantity;
```

A tuple describes positions and their types; `number[]` describes an array of numbers. Prefer a named object if tuple positions would be unclear.

`void` describes a function whose return value is not intended to be used. A callback typed as returning void can still be supplied a function returning a value; the caller ignores that value.

### Exercise 4

Type the earlier items and total function. Add `getTotal(items: Item[]): number`. Deliberately pass a string quantity and inspect the error. Then fix the input rather than silencing the compiler.

**Recap:** types follow names; inference reduces noise; aliases/interfaces describe shapes; types do not validate runtime data.

### Practice reminders: callbacks, interfaces and tuples

```ts
function applyToPrice(
  price: number,
  operation: (value: number) => number,
): number {
  return operation(price);
}
console.log(applyToPrice(1200, (value) => value + 300)); // 1500

interface ProductBase { sku: string; priceMinor: number; }
interface Describable { description?: string; }
interface OrderItem extends ProductBase, Describable { quantity: number; }

function printItem(item: OrderItem): void {
  console.log(`${item.sku}: ${item.description ?? "No description"}`);
}
function formatPrice(price: [number, string]): string {
  const [amountMinor, currency] = price;
  return `${currency} ${(amountMinor / 100).toFixed(2)}`;
}
```

`items.forEach(printItem)` passes the function directly; `items.forEach((item) => printItem(item))` wraps the call. Both work here. Contextual typing supplies callback parameter types. A required Item does not need optional chaining on the item itself; its optional description may still need a fallback. Empty descriptions are preserved by ??.

Interface extends combines required shapes; it does not inherit executable code. Compatible shapes work even when their type names differ. `typeof` cannot identify an interface at runtime. `pop()` removes an element and may return undefined, so it is not a harmless inspection operation.

Tuple positions are checked. Calling formatPrice with `["GBP", 44]` fails type checking; executing that deliberate error through tsx produces `44 NaN`. toFixed returns a string and must be applied to the major-unit amount after division.

Completed practice: `exercises/04-typed-order.ts` combined OrderItem, line totals, reduce, formatting and forEach; expected total GBP 44.00.
