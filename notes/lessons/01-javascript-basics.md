# Lesson 1 — JavaScript data types and syntax

[Academy index](../README.md)

Lesson ID: L01  
Status: **Complete — covered and practised**  
Prerequisites: Lessons 0–0  
Estimated focused time: **75–110 minutes** (planning range, not a measured completion time)  
Last updated: 12 October 2026

## Chapter index

| Chapter | Topics | Estimate |
|---|---|---:|
| 1.1 | Variables, const/let/var and primitive types | 10–15 min |
| 1.2 | Numbers, precision, bigint and symbol | 10–15 min |
| 1.3 | null, undefined, typeof and arrays | 10–15 min |
| 1.4 | References, mutation and copies | 10–15 min |
| 1.5 | Conversion, coercion and truthiness | 10–15 min |
| 1.6 | Objects, loops, equality and template strings | 10–15 min |
| 1.7 | Exercises and review | 15–20 min |

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

### Data types: values first, TypeScript annotations later

In JavaScript, a value has a runtime type. Ordinary JavaScript variables can be reassigned to values of different types. TypeScript adds rules about which assignments your program permits before execution.

```js
let value = 3;
value = "three"; // valid JavaScript
```

In TypeScript, `let value = 3` normally infers `number`; assigning a string then produces a type error. We cover inference properly in Lesson 4. Keep this distinction in mind: runtime behaviour comes from JavaScript; static checking comes from TypeScript.

### The primitive types

| Type | Example | How to think about it |
|---|---|---|
| string | `"Print"` | Text; single quotes, double quotes or backticks |
| number | `3`, `12.5` | Ordinary numeric values; no separate int/float type |
| boolean | `true`, `false` | Logical state |
| undefined | `undefined` | Often a missing or unassigned value |
| null | `null` | Often an explicitly empty value |
| bigint | `9007199254740993n` | Large integers; distinct from number |
| symbol | `Symbol("id")` | Unique identity, often for special property keys |

Spend practice time on the first five. Recognise bigint and symbol without attempting mastery now.

```js
const title = "Print";
const price = 12.5;
const available = true;
let deliveryDate;             // undefined
const cancelledAt = null;     // explicitly empty
const largeId = 9007199254740993n;
const internalKey = Symbol("id");
```

The final `n` marks a bigint literal; bigint does not represent fractional numbers. Arithmetic such as `largeId + 1n` works; mixing bigint and number in arithmetic, such as `largeId + 1`, throws. Built-in JSON serialization does not handle bigint automatically. Each call to `Symbol("id")` produces a distinct symbol even when the description matches.

### Numbers, invalid values and precision

Use minor units for our monetary examples. `1200` means £12.00. A number annotation alone does not promise an integer, a positive value, or a valid price.

```js
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(Number("bad")); // NaN
console.log(Number.isNaN(Number("bad"))); // true
console.log(Number.isInteger(2.5)); // false
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isSafeInteger(9007199254740993)); // false
```

`NaN` is a special number value, despite its name. Use `Number.isNaN` rather than comparing a value with NaN. For bounded integer domain values, consider `Number.isSafeInteger` plus your business range checks.

### null and undefined

```js
const order = { cancelledAt: null };
let deliveryDate;
console.log(deliveryDate === undefined); // true
console.log(order.cancelledAt === null); // true
```

A missing object property also reads as undefined. Accessing a property of null or undefined throws unless guarded. Unlike a typical PHP unset-variable access, reading an entirely undeclared JS variable throws a ReferenceError. A declared variable without an assigned value is different.

`null` and `undefined` are distinct: `null === undefined` is false. Our types and API conventions should state which represents absence. JSON has null, but no undefined value: JSON serialization omits undefined-valued object properties and represents undefined array entries as null.

### Checking types at runtime

`typeof` is a JavaScript operator returning a string describing a value's type. These checks execute; they are not TypeScript annotations.

```js
console.log(typeof "Print");      // string
console.log(typeof 1200);         // number
console.log(typeof false);        // boolean
console.log(typeof undefined);    // undefined
console.log(typeof 1n);           // bigint
console.log(typeof Symbol("id")); // symbol
console.log(typeof {});           // object
console.log(typeof []);           // object
console.log(typeof null);         // object — historical quirk
console.log(typeof (() => 1));    // function
console.log(Array.isArray([]));   // true
```

Check null with `value === null`; check arrays with `Array.isArray(value)`. Checking `typeof value === "object"` alone does not establish that it is a non-null object with particular fields. Functions are callable objects, though typeof reports function.

In PHP, you may reach for `is_string`, `is_array` or `gettype`. In JS, typeof is useful for primitives, while arrays and object shapes require more specific checks.

### Primitive values versus objects

Primitive values are immutable. Reassigning a variable creates a different binding value; it does not change the old primitive. Objects, including arrays, can be mutated, and multiple variables can hold references to the same object.

```js
let firstQuantity = 2;
let secondQuantity = firstQuantity;
secondQuantity = 3;
console.log(firstQuantity); // 2

const original = { quantity: 2 };
const shared = original;
shared.quantity = 3;
console.log(original.quantity); // 3
console.log(shared === original); // true
console.log({ quantity: 3 } === { quantity: 3 }); // false
```

JavaScript passes arguments by value. When that value is an object reference, the function can mutate the shared object. Reassigning the function's parameter does not reassign the caller's variable. Avoid the misleading shortcut “all objects are passed by reference”. PHP objects have similar sharing behaviour; PHP arrays generally use copy-on-write semantics.

`const` prevents rebinding a variable, not mutation of the object it refers to. Object identity also explains why identical-looking objects do not compare equal with ===. We will practise shallow copies in Lesson 2.

### Explicit conversion versus implicit coercion

Conversion is deliberate; coercion occurs as part of another operation. JS and PHP conversion rules differ, so do not assume familiar PHP outcomes.

```js
console.log(Number("3") + 1); // 4: explicit conversion
console.log(String(3));       // "3"
console.log("3" + 1);         // "31": implicit string conversion
console.log("3" - 1);         // 2: implicit numeric conversion
console.log(Number(""));     // 0: usually undesirable for a required field
console.log(Number("3x"));   // NaN
console.log(parseInt("3x", 10)); // 3: parses an initial integer portion
console.log(Boolean("false")); // true: non-empty string
console.log(Boolean("0"));     // true: differs from PHP's "0"
console.log(Boolean([]));      // true: differs from PHP's empty array
```

Do not parse a text boolean with Boolean unless truthiness is what you intend. Compare explicitly with the accepted text values. For a required numeric field, reject blank strings before numeric conversion, then validate the converted value.

Prefer === and !== over coercing equality. Truthiness is appropriate for some conditions; explicit null/undefined checks are better when zero or empty text is meaningful.

### Small TypeScript preview

```ts
let quantity: number = 2;
const title: string = "Print";
const available: boolean = true;
const cancelledAt: string | null = null;
const note: string | undefined = undefined;
```

These are type annotations. `|` means “one of these types”; we practise unions in Lesson 5. Types follow names. Use lowercase primitive names. TypeScript still uses number for both integers and decimals; it does not introduce PHP-style int and float types.

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

### Exercise 1A: inspect types and sharing

Practice file: `application/lessons/01-data-types.js`. Run it with `./dev lesson lessons/01-data-types.js`. Use a JS file for deliberate coercion examples; TypeScript may reject some of them even though JavaScript can run them.

1. Create a string, number, boolean, null value, unassigned variable, array and object. Print each value and its typeof result.
2. Explain why typeof cannot distinguish an array from a plain object or null.
3. Predict `"5" + 2`, `Number("5") + 2`, `Boolean("false")` and `Boolean([])` before running them.
4. Assign one object to two variables. Change quantity through the second and inspect the first.
5. Repeat with a primitive number and explain the different result.
6. Optional: inspect a bigint and two symbols with the same description.

The solution is in [Core solutions — Solution 1A](../reference/core-solutions.md#solution-1a).

### Exercise 1

Create three items with `name`, `priceMinor` and `quantity`. Using a loop, calculate their total. Print a message containing the result. Include one item with zero quantity. Do this in JavaScript first.

**Recap:** primitive versus object values; typeof quirks; null versus undefined; deliberate conversion; const/let; object and array syntax; for...of; strict equality; template strings.
