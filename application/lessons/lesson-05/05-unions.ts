export {};

function describeId(
    id: string | number
): string {
    if (typeof id === "string") {
        return `Text ID: ${id.toUpperCase()}`;
    }

    return `Numeric ID: ${id.toFixed(0)}`;
}

console.log(describeId(42));
console.log(describeId("PRINT-42"))

function describeQuantity(
    quantity: number | string
): string {
    return (typeof quantity === "string")
        ? `Text quantity: ${quantity.trim()}`
        : `Numeric quantity: ${quantity.toFixed(0)}`;
}

console.log(describeQuantity(3));
console.log(describeQuantity("    3      "))

function describeCustomer(
    name: string | null
): string {
    return (null === name)
        ? "Guest"
        : name.toUpperCase();
}

function describeDiscount(
    discountMinor: number | undefined
): string {
    return (typeof discountMinor === "undefined")
        ? "No discount applied"
        : `Discount: GBP ${(discountMinor / 100).toFixed(2)}`;
}

console.log(describeDiscount(undefined));
console.log(describeDiscount(0));
console.log(describeDiscount(300));

type OrderStatus = "pending" | "paid" | "cancelled" | "refunded";

const status: OrderStatus = "paid";

function describeOrderStatus(
    status: OrderStatus
): string {
    switch (status) {
        case "pending":
            return "Awaiting payment";
        case "cancelled":
            return "Order cancelled";
        case "paid":
            return "Ready to fulfil";
        default:
            return `Unsupported order status: ${status}`;
    }
}

console.log(describeOrderStatus("pending"));
console.log(describeOrderStatus("paid"));
console.log(describeOrderStatus("cancelled"));

type PaymentResult =
    | { success: true; transactionId: string }
    | { success: false; error: string };

function describePayment(
    result: PaymentResult
): string {
    return (result.success)
        ? `Paid: ${result.transactionId}`
        : `Failed: ${result.error}`;
}

type Delivery =
    | { kind: "collection"; collectionPoint: string }
    | { kind: "shipping"; address: string };

function describeDelivery(
    delivery: Delivery
): string {
    return (delivery.kind === "collection")
        ? `Collect from: ${delivery.collectionPoint}`
        : `Ship to: ${delivery.address}`;
}

console.log(
    describeDelivery(
        {
            kind: "collection",
            collectionPoint: "Oxford Street",
        }
    )
)

console.log(
    describeDelivery(
        {
            kind: "shipping",
            address: "10 High Street",
        }
    )
)

function uppercaseDemo(
    value: any
): string {
    return value.toUpperCase();
}

function uppercase(
    value: unknown
): string {
    if (typeof value === "string") {
        return value.toUpperCase();
    }

    return "Not a string"
}

function parseQuantity(
    value: unknown,
): number | null {
    return (
        typeof value === "number"
        && Number.isSafeInteger(value)
        && value > 0
    )
        ? value
        : null;
}

console.log(parseQuantity(3));         // 3
console.log(parseQuantity(0));         // null
console.log(parseQuantity(2.5));       // null
console.log(parseQuantity("3"));       // null
console.log(parseQuantity(undefined)); // null

const value: unknown = "3";
const quantity = value as number;

console.log(typeof quantity);
console.log(quantity + "1");

const quantity2 = Number(value);

const rawPrice: unknown = "1200";
const assertedPrice = rawPrice as number;

console.log(typeof assertedPrice); // string
console.log(assertedPrice + 300); // 1200300
console.log(Number(rawPrice) + 300); // 1500


function assertNever(
    value: never
): never {
    throw new Error(
        `Unexpected value ${value}`
    );
}

function describeOrderStatusAgain(
    status: OrderStatus
): string {
    switch (status) {
        case "pending":
            return "Awaiting payment";
        case "paid":
            return "Ready to fulfil";
        case "cancelled":
            return "Order cancelled";
        case "refunded":
            return "Order refunded";
        default:
            return assertNever(status);
    }
}

console.log(
    describeOrderStatusAgain("refunded")
);