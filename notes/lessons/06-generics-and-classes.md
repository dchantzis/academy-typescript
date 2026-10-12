# Lesson 6 — Generics, utilities and classes

[Academy index](../README.md)

Lesson ID: L06  
Status: **Complete — covered and practised**  
Prerequisites: Lessons 0–5  
Estimated focused time: **95–130 minutes** (planning range, not a measured completion time)  
Last updated: 12 October 2026

## Chapter index

| Chapter | Topics | Estimate |
|---|---|---:|
| 6.1 | Generics and inference | 15–20 min |
| 6.2 | Generic constraints | 10–15 min |
| 6.3 | Partial, Pick, Omit, Readonly and Record | 20–25 min |
| 6.4 | Classes, constructors, validation and privacy | 15–20 min |
| 6.5 | Inheritance, abstract classes and implements | 15–20 min |
| 6.6 | Enums versus unions | 5–10 min |
| 6.7 | Catalogue exercise and review | 15–20 min |

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
