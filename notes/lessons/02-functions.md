# Lesson 2 — Functions and modern syntax

[Academy index](../README.md)

Lesson ID: L02  
Status: **Complete — covered and practised**  
Prerequisites: Lessons 0–1  
Estimated focused time: **65–95 minutes** (planning range, not a measured completion time)  
Last updated: 12 October 2026

## Chapter index

| Chapter | Topics | Estimate |
|---|---|---:|
| 2.1 | Named functions, defaults and arrows | 10–15 min |
| 2.2 | Callbacks and closures | 15–20 min |
| 2.3 | Object and array destructuring | 10–15 min |
| 2.4 | Spread and rest | 10–15 min |
| 2.5 | Optional chaining and nullish coalescing | 10–15 min |
| 2.6 | Exercise and review | 10–15 min |

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

### Callback and closure reminders from practice

```js
function applyToPrice(price, operation) {
  return operation(price);
}
const double = (value) => value * 2;
console.log(applyToPrice(1200, double)); // 2400

function makeMinimumChecker(minimum) {
  return (total) => total >= minimum;
}
const freeDelivery = makeMinimumChecker(5000);
console.log(freeDelivery(7500)); // true
```

The first call supplies a function; applyToPrice later calls it with 1200. A closure has two stages: makeMinimumChecker receives and remembers minimum, then the returned function receives total. Each factory call creates its own captured context. Array rest collects remaining elements (possibly an empty array); spread copies the outer array. A default parameter or destructuring default applies to undefined, not null.
