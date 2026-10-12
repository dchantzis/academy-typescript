# Lesson 10 — Browser and DOM refresher

[Academy index](../README.md)

Lesson ID: L10  
Status: **Covered — browser refresher**  
Prerequisites: Lessons 0–5; functions and callbacks  
Estimated focused time: **30–45 minutes** (planning range, not a measured completion time)  
Last updated: 12 October 2026

## Chapter index

| Chapter | Topic | Estimate |
|---|---|---:|
| 10.1 | Browser versus Node; selection and null | 5–10 min |
| 10.2 | Calculator and validation | 10–15 min |
| 10.3 | Reset, input events and TS annotations | 10 min |
| 10.4 | Recap | 5–10 min |

## Goal and execution environment

Practise selecting elements, null checks, event callbacks, input conversion and page updates. This refresher was completed on 6 October using an HTML file with embedded JavaScript. TypeScript DOM annotations were explained; a compiled browser TypeScript project has not yet been configured.

HTML can be opened directly in the browser on the host laptop. No container IP or web server is needed for this self-contained exercise. Node terminal execution does not provide document.

## Working calculator

```html
<!doctype html>
<html lang="en">
<head><meta charset="UTF-8"><title>Quantity calculator</title></head>
<body>
  <label for="quantity">Quantity</label>
  <input id="quantity" type="number" value="2">
  <button id="calculate">Calculate</button>
  <button id="reset">Reset</button>
  <p id="result"></p>
  <script type="module">
    const input = document.querySelector("#quantity");
    const button = document.querySelector("#calculate");
    const reset = document.querySelector("#reset");
    const result = document.querySelector("#result");
    if (input === null || button === null || reset === null || result === null) {
      throw new Error("Required page elements are missing");
    }
    button.addEventListener("click", () => {
      const quantity = Number(input.value);
      if (!Number.isSafeInteger(quantity) || quantity <= 0) {
        result.textContent = "Invalid quantity";
        return;
      }
      result.textContent = `Total: GBP ${(quantity * 1200 / 100).toFixed(2)}`;
    });
    reset.addEventListener("click", () => {
      input.value = "1";
      result.textContent = "";
    });
  </script>
</body>
</html>
```

Exercise: reproduce it, test 0, -1, 2.5, blank and 3, then reset after both success and failure. Change the calculation listener from button click to input input to calculate while typing.

## JavaScript and TypeScript reminders

| Operation | Browser API |
|---|---|
| Select | document.querySelector(selector) |
| Read/write input | input.value; its type is string |
| Update plain text | element.textContent |
| Handle interaction | element.addEventListener(eventName, callback) |

Number("") is zero, so our positive-quantity check rejects a blank field. An early return stops the error text being overwritten. Updating input.value programmatically does not dispatch an input event automatically. textContent treats content as text rather than parsing HTML.

In a TypeScript browser source file:

```ts
const input = document.querySelector<HTMLInputElement>("#quantity");
if (input === null) throw new Error("Missing quantity input");
console.log(input.value);
```

The generic tells the type checker the expected element type but does not verify it at runtime. An instanceof HTMLInputElement check can verify that runtime type when needed. Browser compilation/build setup will be introduced separately; do not paste TypeScript annotations into an ordinary script tag.

## Recall exercises completed on 6 October

- summariseMovements: aggregate positive/negative changes by SKU, retaining zero totals and leaving input unchanged.
- loadMovementSummary: await an injected repository and return a discriminated ready/failure result.
- findCheapestAvailable: skip unavailable products and update the candidate only for a strictly lower price; preserve the first entry on ties; return undefined when no candidate exists.

The first two were correctly recalled. The cheapest-product loop needed a correction because the original flow assigned every product to the candidate. Keep exclusion and candidate-update decisions separate.

## Completion checks

- [x] Browser calculator, validation and reset practised.
- [x] Input event behaviour practised.
- [x] TypeScript DOM selection and nullability explained.
- [ ] Reproduce the page independently.
- [ ] Configure and run a compiled TypeScript browser project in a later session.
