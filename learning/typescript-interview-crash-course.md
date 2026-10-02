# TypeScript crash course: from rusty JavaScript to peer programming

Prepared for Dimitrios • 1 October 2026

## Purpose and assumptions

You are an experienced backend engineer with strong PHP/Laravel knowledge and previous JavaScript, MooTools and jQuery experience. Assume JavaScript syntax is now rusty enough to require a reference. This guide rebuilds that syntax before adding TypeScript.

The interview is a screen-shared peer programming session. The task, framework and environment are unknown. We will prepare with plain TypeScript, data transformations and business rules. This is an interview preparation guide, not exhaustive language mastery or a React course.

## How to study

For each lesson: read the example, type it yourself, run it, change one requirement, then attempt the exercise. Consult the solutions only after an attempt. On the next day, repeat the exercise from an empty file. Reading is useful; writing is what makes syntax available under pressure.

Examples are independent unless explicitly marked as a complete application. Do not paste all examples into one file: names repeat. JavaScript examples can run as JavaScript; TypeScript examples require a TypeScript runner or compilation.

Keep a personal error log at the end. Record the error, its cause and your correction in your own words.

## Maintaining and extending this guide

This document has a fixed interview core (Lessons 0–9), named reference appendices, and an append-only area for additional lessons. Lesson numbers stay stable: the next new lesson is Lesson 10. Appendices do not consume lesson numbers.

For future additions, ask: “Create Lesson 10 on [topic] as an appendable Markdown section.” Tell me the latest lesson number, relevant prerequisites, and any environment changes. You do not need to upload the whole guide for an independent new lesson. For revisions to an existing lesson, provide just that lesson, including any solution or notes you want preserved.

Each new lesson contains its own metadata, explanation, examples, exercise, hidden solution, recap and references. This prevents additions from requiring changes to earlier solution sections or the original roadmap. Keep code examples self-contained, or explicitly name required files. Existing lessons refer to the core solutions appendix; future lessons contain their own solutions.

Append the supplied section after the final lesson in the “Additional lessons” area. You can also keep each section as a separate file under `notes/`, such as `notes/10-database-access.md`. A Markdown heading beginning with `##` appears in VS Code's Outline, so no manually maintained table of contents is required.

The laptop/Git repository is your current working copy. I cannot see edits there automatically. Independent additions need only their relevant context; precise edits or integration reviews require the affected section. This avoids reconstructing unseen changes.

### New lesson template

```text
## Lesson 10. Title

Lesson ID: L10
Prerequisites: Lessons ...
Priority: Interview core / optional extension
Estimated time: ...
Practice file: application/lessons/10-topic.ts

### Goal
### Explanation and PHP comparisons
### Worked examples
### Common mistakes
### Exercise
### Solution
### Recap and completion checklist
### References
```

Use a collapsed solution block in actual new lessons:

```html
<details>
<summary>Solution — open after attempting the exercise</summary>

Place the Markdown explanation and fenced code here, with blank lines around them.

</details>
```

## Roadmap and time budget

The original 4–6 hours is a first exposure target. With rusty JavaScript, plan approximately 10–14 focused hours across 2–3 days, with breaks. These are estimates; slow down when syntax is still hard to reproduce.

| Session | Focus | Approximate time |
|---|---|---|
| Day 1, setup | Lesson 0: tools, project files and Docker workflow | 30–45 minutes |
| Day 1, A | Lessons 1–2: JS data types, syntax and functions | 90–120 minutes |
| Day 1, B | Lesson 3: data transformations | 60 minutes |
| Day 1, C | Lessons 4–5: types, unions and narrowing | 90 minutes |
| Day 2, A | Repeat yesterday's exercises without solutions | 45 minutes |
| Day 2, B | Lessons 6–7: reuse and async | 90 minutes |
| Day 2, C | Lesson 8: practical application | 90 minutes |
| Day 2, D | First mock session and review | 60 minutes |
| Optional Day 3 | Fresh mock, repair weak areas, revision | 2–3 hours |

If time runs short, prioritise lessons 1–5, the application, and one mock. Learn to recognise classes and utility types; do not spend hours on advanced generics. Avoid starting a large React application before the basics are comfortable.

### Progress checklist

- [ ] Explain how the project is created, how dependencies are installed, and how execution differs from type checking.
- [ ] Identify runtime types, convert values deliberately, and explain object sharing.
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

## 0. Understanding and creating a TypeScript environment

### Goal

Understand what each tool does, which files we write, which files are generated, and how our Docker environment runs the code.

Do not run the project initialisation commands in our existing application directory. It is already initialised. They are explained here so you can recreate a project independently.

### 0.1 The tools and their responsibilities

| Tool | Responsibility | Familiar PHP comparison |
|---|---|---|
| Node.js | Executes JavaScript outside a browser | PHP CLI |
| npm | Manages packages and project commands | Composer, plus named scripts |
| TypeScript / `tsc` | Checks types and can compile TypeScript into JavaScript | Some overlap with PHPStan, but also compilation |
| tsx | Lets us run TypeScript without manually compiling first | A convenient execution tool; no direct equivalent needed |
| Docker | Provides the environment containing these tools | The same role as our PHP/Python containers |

Node.js is the runtime, not a framework. It provides JavaScript with capabilities such as filesystem access and server networking.

TypeScript adds type syntax and checking to JavaScript. Our setup uses `tsc` to check types and `tsx` to execute files. Running a file through tsx does not prove it passes type checking.

### 0.2 Where the application lives

On the laptop:

```text
academy-typescript/
  application/
```

Inside the container, that same directory is mounted at:

```text
/var/www
```

Therefore:

```text
Laptop:    application/lessons/01-basics.ts
Container: /var/www/lessons/01-basics.ts
```

Editing the laptop file changes what the container sees.

The Dockerfile installs the environment. The application directory contains the project that runs in that environment.

### 0.3 Creating a project from scratch

With Node.js and npm available, a typical initialisation sequence is:

```bash
mkdir example-project
cd example-project

npm init -y
npm install --save-dev typescript tsx @types/node
npx tsc --init
```

These commands have different jobs.

#### `npm init -y`

Creates `package.json` with default project metadata.

`-y` accepts defaults rather than asking interactive questions.

It does not install TypeScript or create application code.

#### `npm install --save-dev typescript tsx @types/node`

Installs three development dependencies:

- `typescript`: provides the compiler/type checker, `tsc`.
- `tsx`: runs TypeScript files.
- `@types/node`: tells TypeScript about Node APIs.

It also:

- Adds dependencies to `package.json`.
- Creates or updates `package-lock.json`.
- Installs packages into `node_modules/`.

`--save-dev` records these as development tools rather than runtime dependencies.

#### `npx tsc --init`

Invokes the installed TypeScript compiler and generates `tsconfig.json`.

The generated configuration is a starting point. We adjust it for our project.

`npx` can invoke package executables. Here it finds the locally installed `tsc`. When a requested package is missing, npx can offer to download it; it is not limited to local tools.

### 0.4 Which files do I write?

| File or directory | Created by | My responsibility |
|---|---|---|
| `package.json` | `npm init`, or written directly | Configure metadata/scripts; use npm to manage dependencies |
| `package-lock.json` | npm | Commit it; normally do not edit manually |
| `node_modules/` | npm | Do not edit or commit |
| `tsconfig.json` | `tsc --init`, or written directly | Choose appropriate compiler settings |
| `.ts` source files | Me | Write the application |
| Dockerfile and Compose file | Me or a template | Configure the environment |
| `dev` and startup scripts | Me or a template | Optional workflow helpers |

For our course, the supplied `package.json` and `tsconfig.json` were written in advance.

That is why our startup scripts do not run `npm init` or `tsc --init`: those files already exist.

### 0.5 Understanding `package.json`

This is similar in purpose to `composer.json`.

It declares dependencies and named commands. For example:

```json
"scripts": {
  "lesson": "tsx",
  "watch": "tsx watch",
  "typecheck": "tsc --noEmit",
  "test": "tsx --test tests/*.test.ts"
}
```

Running:

```bash
npm run typecheck
```

looks up `scripts.typecheck` and executes:

```bash
tsc --noEmit
```

npm makes locally installed executables from `node_modules/.bin` available to these scripts. TypeScript does not need to be installed globally.

Running:

```bash
npm run lesson -- lessons/01-basics.ts
```

executes:

```bash
tsx lessons/01-basics.ts
```

The `--` separates npm's arguments from arguments passed to the script.

### 0.6 Understanding the lockfile and dependency directory

`package.json` declares the packages we want.

`package-lock.json` records their resolved versions, including dependencies of those dependencies. Its role resembles `composer.lock`.

`node_modules/` contains installed packages. Its role resembles `vendor/`.

Our startup chooses:

```bash
if [[ -f package-lock.json ]]; then
    npm ci
else
    npm install
fi
```

- `npm install` installs dependencies and can create/update the lockfile.
- `npm ci` performs a clean installation from the lockfile and fails if it disagrees with `package.json`.

Commit both package files. Do not commit `node_modules/`.

In our Docker setup, installed dependencies live in a named volume mounted at `/var/www/node_modules`.

### 0.7 Understanding `tsconfig.json`

This configures TypeScript's compiler and checker.

For example:

```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true
  },
  "include": [
    "lessons/**/*.ts",
    "exercises/**/*.ts",
    "mock-interviews/**/*.ts",
    "tests/**/*.ts"
  ]
}
```

This is an explanatory extract, not a replacement for our complete configuration.

- `strict` enables stricter type checking.
- `noEmit` prevents the compiler from writing generated JavaScript.
- `include` selects the project's starting source files.
- `**/*.ts` matches TypeScript files in a directory and its subdirectories.

Imported files can also become part of the project.

Running `tsc` without a filename uses the project configuration. Passing a source filename directly changes this behaviour: it does not use `tsconfig.json` in the normal project-based way.

For our course, use `./dev typecheck` to check the configured project.

### 0.8 Following our Docker startup

The startup sequence is:

1. Docker creates the container from our Node image.
2. Compose mounts `application/` at `/var/www`.
3. `start-container` prepares dependency-volume permissions.
4. It switches to our local user's numeric UID/GID.
5. `start-container-local` installs dependencies.
6. `sleep infinity` keeps the container available for commands.

We are not starting an HTTP server yet. These are terminal-based exercises.

The initialisation commands are absent because the project's configuration files were supplied already.

### 0.9 Following an execution command

```bash
./dev lesson lessons/01-basics.ts
```

The sequence is:

1. The laptop runs the Bash script `dev`.
2. The script executes a command inside the running app container.
3. Inside `/var/www`, npm reads `package.json`.
4. npm invokes `tsx lessons/01-basics.ts`.
5. The file executes and its console output appears in the terminal.

### 0.10 Following a type-checking command

```bash
./dev typecheck
```

The sequence is:

1. `dev` invokes `npm run typecheck` inside the container.
2. npm invokes `tsc --noEmit`.
3. tsc reads `tsconfig.json`.
4. It checks the selected TypeScript files.
5. It reports errors, or finishes successfully without error output.

It does not execute the lessons or their `console.log` statements.

| Command | What it checks or runs |
|---|---|
| `./dev check` | Validates Docker Compose configuration |
| `./dev typecheck` | Checks TypeScript types |
| `./dev lesson lessons/01-basics.ts` | Executes that source file |
| `./dev test` | Executes automated tests |

### 0.11 Practical inspection

Run these from the project root:

```bash
./dev node --version
./dev npm --version
./dev npm ls --depth=0
```

Then open:

```text
application/package.json
application/tsconfig.json
application/lessons/01-basics.ts
```

Locate the `lesson` and `typecheck` scripts. Trace each command using the explanations above.

Finally, run:

```bash
./dev lesson lessons/01-basics.ts
./dev typecheck
```

Observe the difference between execution output and type-checking output.

### Recap

Before moving to Lesson 1, be able to explain:

- Node executes JavaScript.
- npm installs dependencies and invokes named scripts.
- package.json describes the project.
- package-lock.json records resolved dependencies.
- node_modules contains installed packages.
- tsconfig.json configures TypeScript checking/compilation.
- tsx executes our TypeScript files.
- tsc checks them.
- Docker supplies the environment.
- dev is our convenience wrapper, not a TypeScript requirement.

## 1. JavaScript data types and syntax you need again

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

The solution is in Appendix A, under Solution 1A.

### Exercise 1

Create three items with `name`, `priceMinor` and `quantity`. Using a loop, calculate their total. Print a message containing the result. Include one item with zero quantity. Do this in JavaScript first.

**Recap:** primitive versus object values; typeof quirks; null versus undefined; deliberate conversion; const/let; object and array syntax; for...of; strict equality; template strings.

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

## Appendix A. Core exercise solutions

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

## Appendix B. Quick revision reference

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

## Appendix C. Personal revision notes

| Date | What I struggled with | Correction/example | Repeat tomorrow? |
|---|---|---|---|
| | | | |

After each session, write three things you can now do and one thing to repeat. Begin the next session with that repetition.

## Appendix D. Further reference

These are references, not extra prerequisite reading. Consult the relevant section when a question arises. Examples and exercises in this guide are original teaching material.

- [TypeScript Handbook: Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript Handbook: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [MDN Data types and structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)


## Additional lessons — append new lessons below

The next available lesson number is **10**. This is the extension area, not part of the timed interview core. Append new lessons here in numeric order, with their exercises and solutions included inside each lesson. Existing lesson and appendix numbers remain unchanged.

Potential extensions, when time allows: deeper testing, Node's event loop, HTTP APIs, PostgreSQL access, transactions and connection pools, React fundamentals. These are ideas, not lessons already delivered or a fixed next sequence.

<!-- Append Lesson 10 and later lessons below this line. -->
