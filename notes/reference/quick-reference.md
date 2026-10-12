# Quick revision reference

[Academy index](../README.md)

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

### Before a pairing session

- Confirm the repository/environment if the interviewer can share it.
- Run the existing project and test command ahead of time if available.
- Practise screen sharing, editor font size and terminal switching.
- Know how to inspect a compiler error and method signature.
- Clarify permitted references and assistance.
- Spend the final session repeating weak exercises, not collecting new topics.

## Additional mistakes from Lessons 9–10

| Mistake | Correction |
|---|---|
| const declared inside try used afterward | Return inside try or deliberately declare in the outer scope |
| Function called before assert.throws | Pass a callback; let the assertion execute it |
| Test file named .tests.ts | Our discovery glob expects .test.ts |
| Updating the cheapest candidate unconditionally | Skip excluded records; update only on an improvement |
| Safe inputs assumed to imply safe total | Validate the calculated result too |
| Numeric value assigned to input.value | Assign a string |

