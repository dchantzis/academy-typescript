# TypeScript crash course: from rusty JavaScript to peer programming

Prepared for Dimitrios • 1 October 2026

Updated 4 October 2026 after Lessons 0–6 and the revised interview brief.

## Purpose and assumptions

You are an experienced backend engineer with strong PHP/Laravel knowledge and previous JavaScript, MooTools and jQuery experience. Assume JavaScript syntax is now rusty enough to require a reference. This guide rebuilds that syntax before adding TypeScript.

The interview is a **90-minute TypeScript screen-shared peer programming session on Tuesday, 6 October 2026 at 14:00 UK time**. The task, framework and environment are unknown. We will prepare with plain TypeScript, data transformations and business rules. This is an interview preparation guide, not exhaustive language mastery or a React course.

## How to study

For each lesson: read the example, type it yourself, run it, change one requirement, then attempt the exercise. Consult the solutions only after an attempt. On the next day, repeat the exercise from an empty file. Reading is useful; writing is what makes syntax available under pressure.

Examples are independent unless explicitly marked as a complete application. Do not paste all examples into one file: names repeat. JavaScript examples can run as JavaScript; TypeScript examples require a TypeScript runner or compilation.

Keep a personal error log at the end. Record the error, its cause and your correction in your own words.

## Maintaining and extending this guide

This document has a fixed interview core (Lessons 0–9), named reference appendices, and an append-only area for additional lessons. Lesson numbers stay stable: the next new lesson is Lesson 10. Appendices do not consume lesson numbers.

For future additions, ask: “Create Lesson 10 on [topic] as an appendable Markdown section.” Tell me the latest lesson number, relevant prerequisites, and any environment changes. You do not need to upload the whole guide for an independent new lesson. For revisions to an existing lesson, provide just that lesson, including any solution or notes you want preserved.

Each new lesson contains its own metadata, chapter index with time estimates, explanation, examples, exercise, hidden solution, recap and references. Add one entry to the lesson index when appending a new lesson; no other earlier content needs reconstruction. This prevents additions from requiring changes to earlier solution sections or the original roadmap. Keep code examples self-contained, or explicitly name required files. Existing lessons refer to the core solutions appendix; future lessons contain their own solutions.

Append the supplied section after the final lesson in the “Additional lessons” area. You can also keep each section as a separate file under `notes/`, such as `notes/10-database-access.md`. A Markdown heading beginning with `##` appears in VS Code's Outline, so no manually maintained table of contents is required.

The laptop/Git repository is your current working copy. I cannot see edits there automatically. Independent additions need only their relevant context; precise edits or integration reviews require the affected section. This avoids reconstructing unseen changes.

### New lesson template

```text
## Lesson 10. Title

Lesson ID: L10
Chapters and time budget: list each chapter, its estimate and the lesson total
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

## Lesson and chapter index

Times below include explanation, typing and the listed exercise/review, but exclude breaks. They are **planning estimates, not recorded completion times**. For Lessons 0–5, the chapter-level estimates are newly itemised here; Lessons 6–9 use our discussed or revised estimates. Questions, repetition and debugging can take longer. Completed lessons remain available for revision; their full totals are not additional work before Tuesday.

Chapter groups follow the teaching sequence. Some document subsections and supplementary examples sit together within one indexed chapter; use each lesson link to reach the corresponding material.

| Lesson | Status | Estimated focused time |
|---|---|---:|
| [0. Environment and tools](#0-understanding-and-creating-a-typescript-environment) | Complete | 50–80 min |
| [1. JavaScript data types and syntax](#1-javascript-data-types-and-syntax-you-need-again) | Complete | 75–110 min |
| [2. Functions and modern syntax](#2-functions-and-modern-syntax) | Complete | 65–95 min |
| [3. Arrays and data transformations](#3-arrays-and-data-transformations) | Complete | 70–100 min |
| [4. TypeScript foundations](#4-typescript-foundations) | Complete | 60–95 min |
| [5. Missing values, unions and narrowing](#5-missing-values-unions-and-narrowing) | Complete | 65–105 min |
| [6. Generics, utilities and classes](#6-generics-utilities-and-classes-focused-introduction) | Complete | 95–130 min |
| [7. Modules, promises and external data](#7-modules-promises-and-external-data) | Next | 95–135 min |
| [8. Practical order application](#8-practical-application-order-preparation) | Remaining | 60–90 min |
| [9. Peer programming rehearsal](#9-peer-programming-rehearsal) | Remaining | 110–120 min |

### Index: Lesson 0 — Environment and tools

Status: **Complete**. [Go to Lesson 0](#0-understanding-and-creating-a-typescript-environment).

| Chapter | Topics | Estimate |
|---|---|---:|
| 0.1 | Tools and directory layout | 5–10 min |
| 0.2 | Create a project; authored versus generated files | 10–15 min |
| 0.3 | package.json, lockfile and dependencies | 10–15 min |
| 0.4 | tsconfig.json and strict checking | 10–15 min |
| 0.5 | Docker startup, execution and type-check commands | 10–15 min |
| 0.6 | Practical inspection and recap | 5–10 min |

### Index: Lesson 1 — JavaScript data types and syntax

Status: **Complete**. [Go to Lesson 1](#1-javascript-data-types-and-syntax-you-need-again).

| Chapter | Topics | Estimate |
|---|---|---:|
| 1.1 | Variables, const/let/var and primitive types | 10–15 min |
| 1.2 | Numbers, precision, bigint and symbol | 10–15 min |
| 1.3 | null, undefined, typeof and arrays | 10–15 min |
| 1.4 | References, mutation and copies | 10–15 min |
| 1.5 | Conversion, coercion and truthiness | 10–15 min |
| 1.6 | Objects, loops, equality and template strings | 10–15 min |
| 1.7 | Exercises and review | 15–20 min |

### Index: Lesson 2 — Functions and modern syntax

Status: **Complete**. [Go to Lesson 2](#2-functions-and-modern-syntax).

| Chapter | Topics | Estimate |
|---|---|---:|
| 2.1 | Named functions, defaults and arrows | 10–15 min |
| 2.2 | Callbacks and closures | 15–20 min |
| 2.3 | Object and array destructuring | 10–15 min |
| 2.4 | Spread and rest | 10–15 min |
| 2.5 | Optional chaining and nullish coalescing | 10–15 min |
| 2.6 | Exercise and review | 10–15 min |

### Index: Lesson 3 — Arrays and data transformations

Status: **Complete**. [Go to Lesson 3](#3-arrays-and-data-transformations).

| Chapter | Topics | Estimate |
|---|---|---:|
| 3.1 | map, filter and find | 15–20 min |
| 3.2 | some, every and reduce | 10–15 min |
| 3.3 | Sorting, copying and mutation | 10–15 min |
| 3.4 | forEach and direct callbacks | 5–10 min |
| 3.5 | Map, Set and keyed storage reminders | 15–20 min |
| 3.6 | Order-summary exercise and review | 15–20 min |

### Index: Lesson 4 — TypeScript foundations

Status: **Complete**. [Go to Lesson 4](#4-typescript-foundations).

| Chapter | Topics | Estimate |
|---|---|---:|
| 4.1 | Inference, annotations, objects and arrays | 10–15 min |
| 4.2 | Typed functions and optional properties | 10–15 min |
| 4.3 | Function types and callbacks | 5–10 min |
| 4.4 | void and direct function callbacks | 5–10 min |
| 4.5 | Aliases, interfaces, extends and structural typing | 10–15 min |
| 4.6 | Tuples and destructuring | 5–10 min |
| 4.7 | Typed-order exercise and review | 15–20 min |

### Index: Lesson 5 — Missing values, unions and narrowing

Status: **Complete**. [Go to Lesson 5](#5-missing-values-unions-and-narrowing).

| Chapter | Topics | Estimate |
|---|---|---:|
| 5.1 | Unions and typeof narrowing | 10–15 min |
| 5.2 | Optional and nullable values | 5–10 min |
| 5.3 | Literal types | 5–10 min |
| 5.4 | Discriminated unions | 10–15 min |
| 5.5 | unknown versus any | 10–15 min |
| 5.6 | Assertions and their runtime limitations | 5–10 min |
| 5.7 | never and exhaustive checks | 10–15 min |
| 5.8 | Quantity-result exercise and review | 10–15 min |

### Index: Lesson 6 — Generics, utilities and classes

Status: **Complete**. [Go to Lesson 6](#6-generics-utilities-and-classes-focused-introduction).

| Chapter | Topics | Estimate |
|---|---|---:|
| 6.1 | Generics and inference | 15–20 min |
| 6.2 | Generic constraints | 10–15 min |
| 6.3 | Partial, Pick, Omit, Readonly and Record | 20–25 min |
| 6.4 | Classes, constructors, validation and privacy | 15–20 min |
| 6.5 | Inheritance, abstract classes and implements | 15–20 min |
| 6.6 | Enums versus unions | 5–10 min |
| 6.7 | Catalogue exercise and review | 15–20 min |

### Index: Lesson 7 — Modules, promises and external data

Status: **Next**. [Go to Lesson 7](#7-modules-promises-and-external-data).

| Chapter | Topics | Estimate |
|---|---|---:|
| 7.1 | Modules: export, import and import type | 10–15 min |
| 7.2 | Promises, Promise<T>, resolution and rejection | 15–20 min |
| 7.3 | async/await and returned promises | 15–20 min |
| 7.4 | Errors, sequential work and Promise.all | 15–20 min |
| 7.5 | Fetch, HTTP status and unknown JSON validation | 20–30 min |
| 7.6 | Integration exercise and review | 20–30 min |

### Index: Lesson 8 — Practical order application

Status: **Remaining**. [Go to Lesson 8](#8-practical-application-order-preparation).

| Chapter | Topics | Estimate |
|---|---|---:|
| 8.1 | Clarify requirements; domain and result types | 5–10 min |
| 8.2 | Totals, validation and duplicate policy | 10–15 min |
| 8.3 | Async repository and stock checking | 10–15 min |
| 8.4 | Automated tests and debugging | 15–20 min |
| 8.5 | Requirement change: aggregate SKU demand | 10–15 min |
| 8.6 | Review, mutation checks and limitations | 10–15 min |

### Index: Lesson 9 — Peer programming rehearsal

Status: **Remaining**. [Go to Lesson 9](#9-peer-programming-rehearsal).

| Chapter | Topics | Estimate |
|---|---|---:|
| 9.1 | Mock: inspect project and clarify requirements | 10 min |
| 9.2 | Mock: implement first working version | 25 min |
| 9.3 | Mock: tests and debugging | 20 min |
| 9.4 | Mock: requirement change and async repository | 20 min |
| 9.5 | Mock: final checks and trade-offs | 15 min |
| 9.6 | Feedback and targeted revision | 20–30 min |

Lesson 6's optional StockTracker reinforcement adds approximately **10–15 minutes** when repeated. Lesson 9's alternative feature-evaluator practice is a separate optional session of **30–45 minutes**, not included in the primary mock estimate.

Reference appendices: A — solutions; B — quick revision, common mistakes and deferred tooling; C — personal notes; D — further reading. New independent lessons belong in the append-only area after the appendices, starting at Lesson 10.

## Roadmap, progress and remaining time

### Progress as of Sunday, 4 October

Lessons **0–6 are complete**, including the typed order, quantity-result, product catalogue and StockTracker exercises. Completion means we have covered and practised the material; it does not mean every signature is available from memory. Map operations, missing-value handling and combining concepts remain useful revision targets.

The interview brief confirms only 90 minutes of TypeScript pairing. Node.js, React, database access, the supplied repository and permitted assistance remain unknown. Prepare general programming, data handling, async execution, testing and collaboration. Ask the recruiter about the environment and permitted references if possible.

| Remaining work | Focus | Planning estimate |
|---|---|---:|
| Lesson 7 | Modules, promises, async/await, errors, concurrency and runtime validation | 95–135 minutes |
| Lesson 8 | Staged order application, async repository, meaningful tests and a changed requirement | 60–90 minutes |
| Lesson 9 | Realistic pairing mock | 90 minutes + 20–30 minutes review |

Allow approximately **4½–6 focused hours**, with additional breaks and reinforcement. Earlier estimates proved optimistic for learning through questions and repeated practice. These are planning ranges, not deadlines for understanding.

| Day | Plan |
|---|---|
| Sunday, 4 October | Complete Lessons 7–8 if energy permits; repeat earlier tools inside the new tasks |
| Monday, 5 October | 90-minute mock, review, targeted revision and a second smaller task |
| Tuesday, 6 October, morning | Light recall, environment and screen-sharing check; interview at 14:00 |

Prioritise independent implementation over collecting advanced features. React, real database configuration, event-loop depth and advanced type programming are optional extensions. Node applications can connect to databases through drivers/ORMs, but database setup is not part of Lessons 0–9. TypeScript is the type system, not the database connector.

### Retrieval practice and completion checks

Start a session with 10 minutes from a blank file: Map lookup/update, an array transformation, or a union-handling function. Try without a reference, consult one when stuck, then explain the correction. During the mock, practise checking a method signature instead of guessing repeatedly.

- [x] Covered project creation, dependencies, execution versus type checking.
- [x] Covered runtime types, conversion, sharing and shallow copies.
- [x] Practised functions, loops and array transformations.
- [x] Practised annotations, interfaces, tuples, unions and narrowing.
- [x] Practised generics, utilities, classes and Map-backed storage.
- [ ] Reproduce the earlier patterns independently in a new task.
- [ ] Write and await a Promise-returning function.
- [ ] Validate external JSON rather than assert its type.
- [ ] Write meaningful tests and debug a failing case.
- [ ] Complete the application and handle a requirement change.
- [ ] Complete a 90-minute mock while explaining decisions.

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

### Completed quantity validation exercise

```ts
type QuantityResult =
  | { success: true; quantity: number }
  | { success: false; error: string };

function validateQuantity(value: unknown): QuantityResult {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value <= 0) {
    return { success: false, error: "Invalid quantity" };
  }
  return { success: true, quantity: value };
}
function describeQuantityResult(result: QuantityResult): string {
  return result.success ? `Quantity accepted: ${result.quantity}` : result.error;
}
```

Number.isFinite accepts fractions; safe-integer validation rejects them. typeof narrows unknown before numeric operations. A ternary can narrow types as well as an if. `as number` does not convert: unknown holding "1200" remains a string, so adding 300 yields "1200300"; Number(value) performs conversion. An exhaustive switch using assertNever catches an added "refunded" status until its case is implemented.

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

### Chapter breakdown used in teaching

1. Generics and inference (15–20 minutes).
2. Constraints with extends (10–15 minutes).
3. Partial, Pick, Omit, Readonly and Record (20–25 minutes).
4. Classes, constructors, validation and privacy (15–20 minutes).
5. Inheritance, abstract classes and interfaces (15–20 minutes).
6. Enums versus unions (5–10 minutes), then catalogue exercise (15–20 minutes).

These were initial estimates; repetition and questions increased actual time.

### Classes: validation, inheritance and contracts from practice

```ts
class CartItem {
  #quantity: number = 1;
  constructor(public readonly sku: string, public priceMinor: number, quantity: number) {
    this.setQuantity(quantity);
  }
  setQuantity(quantity: number): void {
    if (!Number.isSafeInteger(quantity) || quantity <= 0) {
      throw new Error("Quantity must be a positive safe integer");
    }
    this.#quantity = quantity;
  }
  getTotal(): number { return this.priceMinor * this.#quantity; }
}

interface FeeCalculator {
  calculateFee(orderTotalMinor: number): number;
}
abstract class DeliveryMethod implements FeeCalculator {
  constructor(public readonly name: string) {}
  abstract calculateFee(orderTotalMinor: number): number;
  describe(): string { return `Delivery method: ${this.name}`; }
}
class Shipping extends DeliveryMethod {
  constructor() { super("Shipping"); }
  calculateFee(orderTotalMinor: number): number {
    return orderTotalMinor >= 5000 ? 0 : 300;
  }
}
```

A rejected setter call leaves the previous valid quantity unchanged. The initializer satisfies definite-assignment checking; TypeScript does not infer constructor initialization through a setter. This example validates quantity only, not price. When replacing quantity with #quantity, update every property access, including getTotal.

`protected` allows access in the class and subclasses during type checking. `private` restricts it to the declaring class during type checking; # fields enforce runtime privacy and are not directly accessible in subclasses. abstract classes cannot be directly constructed; concrete subclasses implement abstract members. super calls the parent constructor. implements checks a contract without supplying code. A structurally compatible Shipping can satisfy FeeCalculator even without declaring implements itself.

### Completed catalogue exercise and solution

Practice file: `exercises/06-product-catalogue.ts`. Expected output: true, false, 1500, then one summary containing PRINT and 1500.

<details>
<summary>Catalogue solution — revisit after a fresh attempt</summary>

```ts
export {};
interface Product { sku: string; priceMinor: number; description: string; }
type ProductChanges = Partial<Omit<Product, "sku">>;
type ProductSummary = Pick<Product, "sku" | "priceMinor">;

class ProductCatalogue {
  #products: Map<string, Product> = new Map();
  add(product: Product): void { this.#products.set(product.sku, product); }
  find(sku: string): Product | undefined { return this.#products.get(sku); }
  update(sku: string, changes: ProductChanges): boolean {
    const product = this.#products.get(sku);
    if (product === undefined) return false;
    this.#products.set(sku, { ...product, ...changes });
    return true;
  }
  summaries(): ProductSummary[] {
    return [...this.#products.values()].map((product) => ({
      sku: product.sku,
      priceMinor: product.priceMinor,
    }));
  }
}
```

Pick changes the type, not runtime objects; summaries must construct smaller objects. Returning complete products can satisfy structural typing yet violate the requested output shape. Partial makes updates optional, so merge with the original before storing. Later spreads overwrite earlier fields. add/find share product references in this simple implementation; stronger ownership guarantees need deliberate copying.

These utility types are not runtime validation or strict security boundaries. Our current config does not enable exactOptionalPropertyTypes, so explicit undefined in a Partial update deserves care. Excluding sku catches ordinary fresh-literal mistakes but does not strip unexpected runtime properties. Validate external updates before applying them.

</details>

## 7. Modules, promises and external data

Status: next lesson; not yet completed. Use shorter worked examples initially, then implement the final exercise from a brief.

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

## 8. Practical application: order preparation

Revised goal: implement from a brief with fewer supplied examples. Bring earlier Map, Set, reduce, unions and missing-value handling into one task. Add meaningful automated tests before extending the requirements.

### Async repository contract

Use an injected contract instead of configuring a database:

```ts
interface StockRepository {
  getAvailable(sku: string): Promise<number>;
}
```

Implement an in-memory version backed by Map<string, number>. Missing SKU means zero stock. An async method always returns a Promise, even when it reads memory immediately. Adapt prepareOrder to receive StockRepository and call repository.getAvailable(sku). The older solution in Appendix A injects a function instead; both approaches express the same dependency, but it is a baseline rather than the full revised exercise.

### Stages and tests

1. Define the domain and result union; agree validation and duplicate behaviour.
2. Implement totals and validation independently.
3. Inject the async repository and handle insufficient stock and lookup failure.
4. Put implementation in an importable module; place tests under tests/ so npm test runs them.
5. Change the duplicate rule: aggregate demand by SKU using a Map. Keep each line's price for calculating totals; stock demand depends on combined quantities.
6. Add a regression test where each repeated line fits available stock individually, but their combined demand does not.

Introduce Node's test runner and strict assertions with a small test:

```ts
// tests/order-total.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { getTotal } from "../exercises/08-order.ts";

test("totals multiple order lines", () => {
  assert.equal(getTotal([
    { sku: "A", priceMinor: 1000, quantity: 2 },
    { sku: "B", priceMinor: 500, quantity: 1 },
  ]), 2500);
});
```

Export getTotal from the named module; keep demo execution in a separate runner so importing it does not run a demo. Promise-returning tests can use async callbacks and await the result. Use deepEqual for objects and rejects for operations intentionally designed to reject.

Meaningful cases: valid order, empty order, zero/fractional quantity, negative/fractional price, missing SKU, insufficient stock, repository failure, duplicate rule and unchanged input. Demonstrate a failure, fix its cause, then rerun the affected test and the suite. A stock check does not reserve inventory; discuss that limitation.

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

### Primary mock: 90 minutes

Start from a small TypeScript repository with a brief and a few tests. The tutor acts as the interviewer: no complete solution up front, and requirement changes arrive after a working first version. Confirm assistance rules before starting. Reference lookup is useful in rehearsal, but follow the actual interview's rules.

| Time | Activity |
|---|---|
| 0–10 minutes | Inspect files, scripts and types; clarify inputs, outputs and edge cases |
| 10–35 minutes | Implement a small synchronous transaction summary and run checks |
| 35–55 minutes | Add meaningful tests and diagnose a failing case |
| 55–75 minutes | Handle deduplication and an async repository requirement |
| 75–90 minutes | Complete checks, explain trade-offs and discuss remaining limitations |

Task: group transactions by account and sum amounts in minor units. Each has id, accountId, amountMinor and status (pending/settled/reversed). Include settled transactions only; sort accounts by total descending. Agree negative-amount and tie behaviour. Use Map for grouping, with explicit missing-value handling.

Requirement change: deduplicate by transaction id; clarify which record wins when duplicates disagree and whether deduplication happens before filtering status. Add a test showing that chosen policy. Then inject an async transaction repository. Validate unknown boundary data if supplied; do not assert it into a domain type. The session includes one seeded defect to investigate using tests and compiler feedback.

Do not browse the solution during the mock. Explain decisions at natural boundaries, invite feedback and keep a working increment. A task not fully finished can still be reviewed for correctness, collaboration and diagnosis; record incomplete work honestly.

### Alternative fresh practice: feature evaluator

For a second shorter session, implement a global enabled flag and per-user boolean overrides. Explicit false overrides must take precedence just like true. Clarify missing features/users. Then add segments and agree precedence. Use your domain experience, but practise writing a small TS implementation without translating a large PHP solution.

### Review and revision: 20–30 minutes after the mock

Identify three concrete gaps, reproduce each correction in a small fresh example, and choose one task for another attempt. Prioritise Map APIs, array outputs, return statements, union narrowing, async errors and test assertions if they caused difficulty. Avoid adding advanced material merely because the core lesson headings are complete.

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

## Appendix B. Quick revision reference

### Execution environments and deferred tooling

Our scripts run in Node.js inside Docker. The same general JavaScript logic can run in a browser after TypeScript is transformed to JavaScript and an HTML page loads it. console.log appears in the browser developer console, not on the page. Browser APIs such as document differ from Node filesystem and server APIs. Our current tsconfig targets Node types and is not configured as a browser UI project.

React is in the broader learning plan, not Lessons 0–9. Database access is also deferred. Learn async patterns before adding either.

PhpStorm is the current editor. Node has a built-in Inspector debugger for breakpoints, stepping, variable inspection and call stacks. Docker debugging needs an inspector-enabled process, a locally published port (normally 9229), and correct source/path mapping. --inspect-brk pauses at startup. Setup was discussed and explicitly deferred; no debug command or Compose changes have been applied. Do not expose the debugging port publicly.

### Quick recall of mistakes encountered

| Mistake | Correction |
|---|---|
| Map.set called with a single object | Supply two arguments: set(key, value) |
| Map.add used for updates | Map uses set; Set uses add |
| Lookup expression in a function without return | Return the expression to fulfil the declared return type |
| Missing stock returned as undefined despite the brief | get(sku) ?? 0, with number return type |
| Plain product returned as a Pick summary | Construct the smaller object explicitly |
| Number.isFinite used to reject decimals | Use Number.isSafeInteger plus the business range check |
| price displayed as 44 rather than 44.00 | (priceMinor / 100).toFixed(2) |
| Enum value logged instead of predicate result | Call isPaymentComplete(PaymentState.Paid) |
| #quantity rename missed in getTotal | Update every access to this.#quantity |
| filter/forEach used to retrieve one missing item | find returns one item or undefined; handle with ?. and ?? |
| Sort comparator returned a boolean | Return a negative/zero/positive number; copy before sorting |



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
