# Lesson 5 — Unions and narrowing

[Academy index](../README.md)

Lesson ID: L05  
Status: **Complete — covered and practised**  
Prerequisites: Lessons 0–4  
Estimated focused time: **65–105 minutes** (planning range, not a measured completion time)  
Last updated: 12 October 2026

## Chapter index

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
