export {};

type Item = {
    sku: string,
    priceMinor: number;
    quantity: number;
    description?: string;
};

const items: Item[] = [
    {
        sku: "PRINT",
        priceMinor: 1200,
        quantity: 2,
        description: "This is a description",
    },
    {
        sku: "BOOK",
        priceMinor: 2000,
        quantity: 1,
        description: "",
    },
    {
        sku: "CARD",
        priceMinor: 300,
        quantity: 0,
    },
]

const a = items.filter((item: Item) => item.quantity > 0);
console.log(
    a.map(
        (item: Item) => item.sku
    )
);

function calculateLineTotal (item: Item): number {
    return item.priceMinor * item.quantity;
}

console.log(
    calculateLineTotal(
        {
            sku: "DOG",
            priceMinor: 1500,
            quantity: 2
        }
    )
);

function getOrderTotal(items: Item[]): number {
    return items.reduce(
        (total, item) => total + calculateLineTotal(item),
        0
    )
}

console.log(getOrderTotal(items));
console.log(getOrderTotal([]))

function describeItem(item: Item): string {
    return item?.description ?? "No description";
}

items.forEach(
    (item: Item) => console.log(`${item.sku}: ${describeItem(item)}`)
);

function applyToPrice(
    price: number,
    operation: (value: number) => number
): number {
    return operation(price);
}

console.log(
    applyToPrice(
        1200,
        (value: number) => value * 2
    )
);

console.log(
    applyToPrice(
        1200,
        (value: number) => value + 300
    )
);

function printPrice(priceMinor: number): void {
    console.log(
        `£${(priceMinor / 100).toFixed(2)}`
    );
}

printPrice(1200);

function printItem(item: Item): void {
    console.log(
        `${item.sku}: ${item.quantity} units`
    )
}

items.forEach(printItem);

interface Item2 {
    sku: string;
    priceMinor: number;
    quantity: number;
    description?: string;
}

const item2: Item2 = {
    sku: "PRINT",
    priceMinor: 1200,
    quantity: 1,
}

console.log(typeof items.pop());
console.log(typeof item2);

printItem(item2);

interface Product {
    sku: string;
    priceMinor: number;
}

interface Describable {
    description?: string;
}

interface OrderItem extends Product, Describable {
    quantity: number;
}

const item: OrderItem = {
    sku: "PRINT",
    priceMinor: 1200,
    quantity: 2,
    description: "This is a description",
};

const priceArray: [number, string] = [1200, 'GBP'];

function formatPrice(
    price: [number, string]
): string {
    const [amountMinor, currency] = price;

    return `${currency} ${ (amountMinor/100).toFixed(2)}`;
}
console.log(formatPrice(priceArray));
console.log(formatPrice([1200, 'GBP']));
console.log(formatPrice([2500, 'EUR']));