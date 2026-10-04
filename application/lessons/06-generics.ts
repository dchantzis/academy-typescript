export {};

function first<T>(
    items: T[]
): T | undefined {
    return items[0];
}

const name = first(["James", "Jack"]); // string | undefined
const price = first([1200, 2000]); // number | undefined

function last<T>(
    items: T[]
): T | undefined {
    return items[items.length - 1];
}

console.log(last(["PRINT", "BOOK"]));
console.log(last([1200, 2000]));
console.log(last([]));

function getSku<T extends { sku: string } >(item: T): string {
    return item.sku;
}

function withQuantity<T extends { quantity: number }>(
    item: T,
    quantity: number
): T {
    return { ...item, quantity }
}

console.log(withQuantity(
    {
        name: "a",
        title: "b",
        quantity: 0,
    },
    5
))

function withDescription<T extends { description: string }>(
    item: T,
    description: string
): T {
    return {
        ...item,
        description: description
    }
}

const product = {
    sku: "PRINT",
    priceMinor: 1200,
    description: "Original description",
};

const updatedProduct = withDescription(
    product,
    "Art print"
);

console.log(updatedProduct.description);
console.log(updatedProduct.priceMinor);
console.log(product.description);

interface Product {
    sku: string;
    priceMinor: number;
    description: string;
}

type ProductChanges = Partial<Product>;

const changes: ProductChanges = {
    priceMinor: 1500,
};

function updateProduct(
    product: Product,
    changes: ProductChanges,
): Product {
    return {
        ...product,
        ...changes,
    }
}

const revisedProduct = updateProduct(
    product,
    {
        priceMinor: 1500,
        description: "Updated art print",
    }
);

console.log(revisedProduct);
console.log(product);

type ProductSummary = Pick<Product, "sku" | "priceMinor">;
// includes only sku and priceMinor

type ProductDetails = Omit<Product, "sku">;
// includes only priceMinor and description

function summariseProduct(
    product: Product
): ProductSummary {
    return {
        sku: product.sku,
        priceMinor: product.priceMinor
    }
}

console.log(
    summariseProduct(
       product,
    )
)

type ReadonlyProduct = Readonly<Product>;

const protectedProduct: ReadonlyProduct = {
    ...product
};

// protectedProduct.priceMinor = 999; // Type error: priceMinor is read-only

type Currency = "EUR" | "GBP";

const deliveryFees: Record<Currency, number> = {
    GBP: 300,
    EUR: 400,
};

console.log(deliveryFees.GBP);

type ProductBySku = "PRINT" | "BOOK" | "CARD";

const pricesBySku: Record<ProductBySku, number> = {
    PRINT: 1200,
    BOOK: 2000,
    CARD: 300,
};

function getUnitPrice(
    sku: ProductBySku
): number {
    return pricesBySku[sku]
}

console.log(
    getUnitPrice("PRINT")
);
console.log(
    getUnitPrice("BOOK")
);

console.log('=====');
class CartItem {
    public readonly sku: string;
    public priceMinor: number;
    #quantity: number = 1;

    constructor (
        sku: string,
        priceMinor: number,
        quantity: number,
    ) {
        this.sku = sku;
        this.priceMinor = priceMinor;
        this.setQuantity(quantity);
    }

    public getTotal(): number {
        return this.priceMinor * this.#quantity;
    }

    public setQuantity(
        quantity: number
    ): void {
        if (
            !Number.isSafeInteger(quantity)
            || quantity <= 0
        ) {
            throw new Error("Quantity must be a positive safe integer");
        }

        this.#quantity = quantity;
    }
}

const cartItem = new CartItem(
    "PRINT",
    1200,
    2
);

console.log(
    cartItem.sku
);
console.log(
    cartItem.getTotal()
);
cartItem.setQuantity(3);
console.log(
    cartItem.getTotal()
)

try {
    cartItem.setQuantity(0);
} catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}

console.log(cartItem.getTotal());

console.log('====');

abstract class DeliveryMethod {
    constructor(
        public readonly name: string
    ) {}

    abstract calculateFee(
        orderTotalMInor: number
    ): number;

    public describe(): string {
        return `Delivery method ${this.name}`;
    }
}

class Collection extends DeliveryMethod {
    constructor() {
        super("Collection");
    }

    public calculateFee(
        orderTotalMinor: number
    ): number {
        return 0;
    }
}

const collection = new Collection();

console.log(collection.describe());
console.log(collection.calculateFee(400));

class Shipping extends DeliveryMethod {
    constructor () {
        super("Shipping");
    }

    public calculateFee(
        orderTotalMinor: number
    ): number {
        return (orderTotalMinor >= 5000)
            ? 0
            : 300;
    }
}

const shipping = new Shipping();

console.log(shipping.describe());
console.log(shipping.calculateFee(4400)); // 300
console.log(shipping.calculateFee(5000)); // 0

console.log("====");

interface FeeCalculator {
    calculateFee(
        orderTotalMinor: number
    ): number;
}

class FixedDelivery implements FeeCalculator {
    public calculateFee(
        orderTotalMinor: number
    ): number {
        return 300;
    }
}

function getDeliveryFee(
    calculator: FeeCalculator,
    orderTotalMinor: number
): number {
    return calculator.calculateFee(orderTotalMinor);
}

console.log(
    getDeliveryFee(
        shipping,
        4400
    )
);

console.log("====");

type PaymentStatus = "pending" | "paid" | "failed"; // union

const paymentStatus: PaymentStatus = "paid";

enum PaymentState {
    Pending = "pending",
    Failed = "failed",
    Paid = "paid",
}
const paymentState: PaymentState = PaymentState.Pending;

function isPaymentComplete(
    state: PaymentState,
): boolean {
    return state === PaymentState.Paid;
}

console.log(
    isPaymentComplete(
        PaymentState.Failed
    )
);
console.log(
    isPaymentComplete(
        PaymentState.Pending
    )
);
console.log(
    isPaymentComplete(
        PaymentState.Paid
    )
);
