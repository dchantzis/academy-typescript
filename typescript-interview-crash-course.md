# TypeScript crash course: from rusty JavaScript to peer programming

Prepared for Dimitrios • 1 October 2026

## Purpose and assumptions

You are an experienced backend engineer with strong PHP/Laravel knowledge and previous JavaScript, MooTools and jQuery experience. Assume JavaScript syntax is now rusty enough to require a reference. This guide rebuilds that syntax before adding TypeScript.

The interview is a screen-shared peer programming session. The task, framework and environment are unknown. We will prepare with plain TypeScript, data transformations and business rules. This is an interview preparation guide, not exhaustive language mastery or a React course.

## How to study

For each lesson: read the example, type it yourself, run it, change one requirement, then attempt the exercise. Consult the solutions only after an attempt. On the next day, repeat the exercise from an empty file. Reading is useful; writing is what makes syntax available under pressure.

Examples are independent unless explicitly marked as a complete application. Do not paste all examples into one file: names repeat. JavaScript examples can run as JavaScript; TypeScript examples require a TypeScript runner or compilation.

Keep a personal error log at the end. Record the error, its cause and your correction in your own words.

## Roadmap and time budget

The original 4–6 hours is a first exposure target. With rusty JavaScript, plan approximately 10–14 focused hours across 2–3 days, with breaks. These are estimates; slow down when syntax is still hard to reproduce.

| Session | Focus | Approximate time |
|---|---|---|
| Day 1, A | Lessons 1–2: JS syntax and functions | 90 minutes |
| Day 1, B | Lesson 3: data transformations | 60 minutes |
| Day 1, C | Lessons 4–5: types, unions and narrowing | 90 minutes |
| Day 2, A | Repeat yesterday's exercises without solutions | 45 minutes |
| Day 2, B | Lessons 6–7: reuse and async | 90 minutes |
| Day 2, C | Lesson 8: practical application | 90 minutes |
| Day 2, D | First mock session and review | 60 minutes |
| Optional Day 3 | Fresh mock, repair weak areas, revision | 2–3 hours |

If time runs short, prioritise lessons 1–5, the application, and one mock. Learn to recognise classes and utility types; do not spend hours on advanced generics. Avoid starting a large React application before the basics are comfortable.

### Progress checklist

- [ ] Write a function and an object without copying.
- [ ] Loop over an array and calculate a result.
- [ ] Use map, filter and find; explain their outputs.
- [ ] Type parameters, return values and object properties.
- [ ] Handle missing values without assertions.
- [ ] Model states with a union and narrow them.
- [ ] Write and await a Promise-returning function.
- [ ] Explain why typed JSON still requires validation.
- [ ] Complete the small application and check its edge cases.
- [ ] Complete a timed mock while explaining decisions.

## 0. Running the exercises

### Fastest starting point

Use the [TypeScript Playground](https://www.typescriptlang.org/play). Enable strict checking in its compiler options. Paste one example at a time, inspect errors, and run it. This avoids setup blocking the first lesson.

### Local practice

In a new practice directory, with Node.js and npm already installed:

```bash
mkdir typescript-practice
cd typescript-practice
npm init -y
npm install --save-dev typescript tsx
```

Create `lesson.ts`. Run and separately type-check it:

```bash
npx tsx lesson.ts
npx tsc --noEmit --strict --target ES2022 --module ESNext --moduleResolution bundler lesson.ts
```

`npm` manages packages. Local dependencies live in `node_modules`; `package.json` describes the project and `package-lock.json` records resolved dependencies. `npx` invokes package executables; the commands above use your installed local tools. `tsx` runs TS but does not replace the separate compiler check. `tsc` is the TypeScript compiler; `--noEmit` asks it to check without writing JavaScript.

An editor error, a compiler error and a runtime exception are different things. Check all three. In the interview, use the existing project's scripts and configuration rather than replacing them.

## 1. JavaScript syntax you need again

### Variables and primitive values

```js
const name = "Dimitrios";
let count = 0;
count += 1;
const active = true;
const missing = null;
let notAssigned; // undefined
console.log(name, count, active);
```

No `$` prefix. Prefer `const` unless you need reassignment; use `let` when you do. Both are block-scoped. Older `var` has function scope and different hoisting behaviour; avoid it in new exercises.

`const` prevents reassignment, not mutation:

```js
const user = { name: "Dimitrios" };
user.name = "Dimitris"; // allowed
// user = {};          // reassignment is not allowed
```

JavaScript normally uses `number` for both integers and floating-point numbers. For money here, use integer minor units: 1299 means £12.99. This avoids many decimal rounding problems; it does not provide unlimited integer precision.

### Objects versus arrays

```js
const user = { id: 1, name: "Dimitrios" };
const names = ["Dimitrios", "Alex"];
console.log(user.name);
console.log(user["name"]);
console.log(names[0]);
```

An object is not a PHP associative array, although it often fills a similar role. JS arrays are ordered lists. Property pairs use `:` rather than PHP's `=>`. A missing property or out-of-range array access evaluates to `undefined`.

### Conditions, loops and equality

```js
const quantities = [2, 0, 3];
let total = 0;
for (const quantity of quantities) {
  if (quantity > 0) {
    total += quantity;
  }
}
console.log(total); // 5
```

`for...of` iterates values; `for...in` iterates enumerable property names and is generally the wrong choice for an array's values. Use `===` and `!==` by default. `==` performs coercion: `"1" == 1` is true, whereas `"1" === 1` is false.

Falsy values include `false`, `0`, `""`, `null`, `undefined` and `NaN`. Empty arrays and empty objects are truthy—unlike a PHP empty array. Do not use a truthiness check when zero or an empty string is a legitimate value.

### Strings and conversion

```js
const name = "Dimitrios";
const greeting = `Hello, ${name}`;
const quantity = Number("3");
console.log(greeting, quantity);
```

Template strings use backticks. `+` can concatenate strings: `"3" + 1` is `"31"`. Validate numeric conversions: `Number("bad")` produces `NaN`; `Number("")` produces zero. Consider `Number.isFinite` and `Number.isInteger` where appropriate.

### Exercise 1

Create three items with `name`, `priceMinor` and `quantity`. Using a loop, calculate their total. Print a message containing the result. Include one item with zero quantity. Do this in JavaScript first.

**Recap:** const/let, object braces, array brackets, dot access, for...of, strict equality, template strings.

## 2. Functions and modern syntax

### Named functions, defaults and arrows

```js
function lineTotal(priceMinor, quantity = 1) {
  return priceMinor * quantity;
}

const double = (value) => value * 2;
const triple = (value) => {
  return value * 3;
};
```

An expression after `=>` is returned automatically. A block after `=>` needs an explicit `return`. To return an object directly, wrap it: `(id) => ({ id })`. An arrow is not a PHP `=>` key/value pair.

Functions are values: pass them to other functions. A callback is simply a function supplied for another function to call. A closure retains access to its surrounding lexical variables.

```js
function makeMultiplier(factor) {
  return (value) => value * factor;
}
const timesTen = makeMultiplier(10);
console.log(timesTen(3)); // 30
```

Arrow functions capture the surrounding `this`; ordinary functions have `this` determined by how they are called. Do not blindly replace methods with arrows. This is more relevant to object/class methods than our pure functions.

### Destructuring

```js
const item = { name: "Print", priceMinor: 1200, quantity: 2 };
const { name, quantity } = item;
const { priceMinor: price } = item; // rename the local variable
const [first, second] = ["a", "b"];
```

Destructuring extracts values. It does not define a type. A destructuring default is used for `undefined`, not `null`.

### Spread and rest

```js
const original = { id: 1, active: false };
const updated = { ...original, active: true };
const numbers = [1, 2];
const extended = [...numbers, 3];

function sum(...values) {
  return values.reduce((total, value) => total + value, 0);
}
```

Spread expands an object/array; rest collects arguments. Later object properties override earlier ones. Copies are shallow: nested objects are still shared. JS object assignment shares a reference; PHP arrays have different copy-on-write semantics.

### Optional chaining and nullish coalescing

```js
const customer = { address: null };
const city = customer.address?.city ?? "Unknown";
const count = 0;
console.log(count || 10); // 10
console.log(count ?? 10); // 0
```

`?.` stops on null/undefined and yields undefined. `??` defaults only for null/undefined. `||` defaults for every falsy value. PHP's `?->` and `??` are useful comparisons, but `?.` also works for JS property access.

### Exercise 2

Write `describeItem(item)` returning `"Print: 2 units"`. Destructure the input inside the function. Create a copy with quantity 3 without mutating the original. Add a function that returns a provided discount, defaulting to zero only when the discount is null or undefined.

**Recap:** named function first; arrows for short callbacks; destructuring extracts; spread shallow-copies; ?? preserves zero.

## 3. Arrays and data transformations

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

## 4. TypeScript foundations

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

## 5. Missing values, unions and narrowing

### Optional versus nullable

```ts
type Customer = {
  id: string;
  email?: string;
  phone: string | null;
};
```

Email may be absent; reading it produces string or undefined. Phone must be present but may be null. With strict null checking, handle these possibilities explicitly.

```ts
function emailLabel(customer: Customer): string {
  if (customer.email === undefined) {
    return "No email";
  }
  return customer.email.toLowerCase();
}
```

The condition narrows the type. For a nullable number, compare to null rather than using `if (value)`, which also excludes zero.

### Unions and literal types

```ts
type OrderStatus = "pending" | "paid" | "cancelled";

function formatId(id: string | number): string {
  if (typeof id === "number") {
    return id.toString();
  }
  return id.trim();
}
```

A union means one of the listed possibilities. A literal type restricts a value to an exact value. An intersection `A & B` requires satisfying both types; it is not a choice between them.

### Discriminated unions

```ts
type PaymentResult =
  | { kind: "success"; reference: string }
  | { kind: "failure"; reason: string };

function paymentMessage(result: PaymentResult): string {
  if (result.kind === "success") {
    return `Paid: ${result.reference}`;
  }
  return `Failed: ${result.reason}`;
}
```

The shared `kind` property identifies the variant. This is stronger than a boolean plus unrelated optional fields, which permits confusing combinations.

`never` represents a value that cannot occur. It can enforce exhaustive switches:

```ts
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`);
}

function statusLabel(status: OrderStatus): string {
  switch (status) {
    case "pending": return "Awaiting payment";
    case "paid": return "Paid";
    case "cancelled": return "Cancelled";
    default: return assertNever(status);
  }
}
```

Adding a new status makes the missing case a compiler error at assertNever.

### any, unknown and assertions

`any` disables useful checking for that value. `unknown` accepts arbitrary values but requires narrowing before use. Use unknown at uncertain boundaries.

```ts
function describe(value: unknown): string {
  if (typeof value === "string") return value;
  return "Not a string";
}
```

`value as Customer` asserts your belief; it does not convert or validate. `value!` asserts it is not null/undefined; it adds no runtime check. Prefer checks where absence is possible. `as const` preserves literal types and marks literal properties readonly at the type level; it does not deeply freeze runtime objects.

### Exercise 5

Create `LookupResult` with found/item and missing/sku variants. Write a function producing a message for each. Then add an error/message variant and update the handling. Explain how the discriminant gives access to the right fields.

**Recap:** optional differs from nullable; unions model alternatives; checks narrow; unknown requires proof; assertions provide none.

## 6. Generics, utilities and classes: focused introduction

### Generics preserve relationships

```ts
function first<T>(values: T[]): T | undefined {
  return values[0];
}
const number = first([1, 2]);
const name = first(["Dimitrios", "Alex"]);
```

`T` is a placeholder type selected for each call, usually inferred. The output relates to the input element type. `any` would lose that relationship. PHP generics commonly appear in static-analysis annotations; TypeScript supports them directly.

```ts
function getId<T extends { id: string }>(value: T): string {
  return value.id;
}
```

`extends` constrains the accepted shape here; it is not class inheritance in this example.

### Useful utilities

```ts
type Customer = { id: string; name: string; email: string };
type CustomerUpdate = Partial<Customer>;
type CustomerSummary = Pick<Customer, "id" | "name">;
type NewCustomer = Omit<Customer, "id">;
type CustomerView = Readonly<Customer>;
const stock: Record<string, number> = { A: 2, B: 0 };
```

Partial makes properties optional; Pick selects; Omit excludes; Readonly blocks assignment through that type; Record describes keyed values. These utilities are shallow. Partial is not automatically a safe update DTO: consider whether id should be editable.

A string Record annotation does not ensure every possible key exists at runtime. Compiler option `noUncheckedIndexedAccess` adds undefined to many unchecked index reads; it is separate from strict mode.

### Classes and access modifiers

```ts
class Inventory {
  private quantities = new Map<string, number>();

  constructor(public readonly name: string) {}

  setQuantity(sku: string, quantity: number): void {
    this.quantities.set(sku, quantity);
  }

  getQuantity(sku: string): number {
    return this.quantities.get(sku) ?? 0;
  }
}
```

Constructor parameter properties declare and assign fields in one step. `public`, `protected` and `private` resemble PHP visibility, but TypeScript private is chiefly a type-checking restriction. JavaScript `#field` provides runtime private fields. Readonly prevents reassignment through the type, not all mutations of nested data.

### Enums versus unions

```ts
type Status = "pending" | "paid";
enum StatusEnum {
  Pending = "pending",
  Paid = "paid",
}
```

Regular enums create runtime values as well as types. String-literal unions need no generated enum object and often suit API values. Follow existing project conventions. Do not memorise advanced enum details for this preparation.

### Exercise 6

Write a generic `last<T>` returning the final element or undefined. Define an update type that allows changing customer name/email but excludes id. Optional: implement the Inventory class and explain Map.get's missing case.

**Recap:** generics retain relationships; utilities transform types; readonly is not deep freezing; classes are available, not compulsory.

## 7. Modules, promises and external data

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
      || !Number.isInteger(value.quantity) || value.quantity < 0) {
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

### Exercise 7

Create an async fake lookup returning a quantity. Await it and print whether an item is available. Make it throw for one SKU and handle the error. Run parseStock with valid data, null, a missing quantity and a string quantity.

**Recap:** async returns Promise<T>; await can throw; concurrency is explicit; HTTP status needs checking; JSON is an untrusted boundary.

## 8. Practical application: order preparation

### Requirements

Implement an order preparation function. Each line has SKU, unit price in minor units and quantity. Reject empty orders, negative/non-integer prices and non-positive/non-integer quantities. Calculate the total. Check stock through an injected async function. Return a discriminated result. Do not mutate the input.

For this first version require unique SKUs. Reject duplicates explicitly; otherwise checking each duplicate independently could approve an order exceeding total stock. Payment, persistence, HTTP and reservations are outside this exercise. A successful check does not reserve stock.

### Suggested working order

1. Define Item, Order and the result type.
2. Implement a synchronous total function.
3. Implement validation with a loop and Set.
4. Inject and await stock lookup.
5. Handle insufficient stock.
6. Decide whether lookup failure should throw or return a result; explain your choice.
7. Check representative cases before refactoring.

### Example cases

| Input | Expected |
|---|---|
| A at 1000 × 2 and B at 500 × 1, adequate stock | Ready, total 2500 |
| Empty lines | Invalid |
| Quantity 0 or 1.5 | Invalid |
| Negative price | Invalid |
| Repeated SKU | Invalid |
| Stock below quantity | Insufficient stock |
| Lookup rejects | Lookup failure |

Try the implementation before reading the solution below. For a second attempt, remove the unique-SKU restriction and aggregate demand by SKU. Discuss conflicting prices and keep total calculation separate from stock demand.

## 9. Peer programming rehearsal

### Working aloud

Start with: “Let me confirm the inputs and expected output. What should happen for an empty list or invalid quantity?” Give a small example, agree the simplest behaviour, and implement one step.

Useful language:

- “I'll start with a loop so the business rule is visible.”
- “This lookup can miss, so I'll model and handle that explicitly.”
- “The compiler is showing a possible undefined value; I'll check that branch.”
- “This assertion would hide the uncertainty. I'd rather validate the input.”
- “Is that lookup independent, or does the second operation depend on the first?”
- “Let me check the signature in the editor, then continue.”

Explain decisions at natural boundaries. You do not need to narrate every keystroke. Accept suggestions, clarify them and incorporate them. Ask whether documentation, internet search and AI assistance are permitted before using them during the actual interview.

### Mock A: 45 minutes

Build a function grouping transactions by account and summing amounts in minor units. Each transaction has id, accountId, amountMinor and status (pending/settled/reversed). Include settled transactions only. Return accounts ordered by total descending. Clarify whether negative amounts are allowed.

After the first version: deduplicate by transaction id. Clarify which record wins when duplicates disagree. Then discuss how you would obtain transactions asynchronously and validate JSON. Start with the synchronous implementation; do not build HTTP infrastructure first.

### Mock B: 45 minutes

Implement a feature evaluator with a global enabled flag and per-user boolean overrides. An explicit false override must take precedence just like true. Clarify missing features and missing users. Add optional allowed segments, agreeing precedence before coding. Your domain knowledge helps; practise writing it in TS rather than translating a large existing solution.

### Review rubric

- Did I clarify behaviour before choosing a data structure?
- Did I write a working small step early?
- Did I handle missing values and edge cases?
- Did I explain types and runtime checks separately?
- Did I use compiler feedback rather than bypass it?
- Did I check behaviour with examples?
- Did I collaborate when requirements changed?

## 10. Exercise solutions

These are possible solutions, not the only correct ones. Do not memorise them.

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

### Complete application solution

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
    if (!Number.isInteger(item.priceMinor) || item.priceMinor < 0
        || !Number.isInteger(item.quantity) || item.quantity <= 0) {
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
      if (!Number.isInteger(available) || available < 0) {
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

## 11. Quick revision reference

| PHP habit/concept | JS / TS equivalent or difference |
|---|---|
| `$name` | `name`, declared with const/let |
| `['sku' => 'A']` | `{ sku: "A" }` for an object |
| `foreach ($items as $item)` | `for (const item of items)` |
| `$object->name` | `object.name` |
| `function f(int $n): int` | `function f(n: number): number` |
| Nullable `?string` | `string \| null` |
| Optional field | `email?: string`, may read as undefined |
| `array_map` | `items.map(callback)` |
| `array_filter` | `items.filter(callback)` |
| `??` | `??`, null/undefined default |
| Runtime class/type enforcement | TS types usually disappear; validate boundaries |
| Associative-array copy | Object/array spread is shallow; assignment shares references |

```ts
type Item = { sku: string; quantity: number };
const items: Item[] = [];
function count(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
const found = items.find((item) => item.sku === "A");
const quantity = found?.quantity ?? 0;
```

### Common errors and fixes

| Symptom | What to investigate |
|---|---|
| Parameter implicitly has any | Add a boundary type or provide contextual typing |
| Possibly undefined | Handle missing result/property before using it |
| Property absent on union | Narrow to the correct variant |
| Promise used as a value | Await it inside an async function |
| Arrow returns undefined | A block body needs return |
| Numeric result becomes a string | Check input conversion and + operands |
| Sort changed original input | Copy the array before sort |
| Error hidden by as or ! | Replace assumption with a check where needed |

### Before the interview

- Confirm the repository/environment if the interviewer can share it.
- Run the existing project and test command ahead of time if available.
- Practise screen sharing, editor font size and terminal switching.
- Know how to inspect a compiler error and method signature.
- Clarify permitted references and assistance.
- Spend the final session repeating weak exercises, not collecting new topics.

## 12. Personal revision notes

| Date | What I struggled with | Correction/example | Repeat tomorrow? |
|---|---|---|---|
| | | | |

After each session, write three things you can now do and one thing to repeat. Begin the next session with that repetition.

## Further reference

These are references, not extra prerequisite reading. Consult the relevant section when a question arises. Examples and exercises in this guide are original teaching material.

- [TypeScript Handbook: Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript Handbook: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
