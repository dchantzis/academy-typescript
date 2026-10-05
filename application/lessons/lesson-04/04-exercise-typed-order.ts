export {};

interface OrderItem {
    sku: string;
    priceMinor: number;
    quantity: number;
    description?: string;
}

const items: OrderItem[] = [
    {
        sku: "PRINT",
        priceMinor: 1200,
        quantity: 2,
    },
    {
        sku: "BOOK",
        priceMinor: 2000,
        quantity: 1,
        description: "Sketch collection",
    }
];

function calculateLineTotal(
    item: OrderItem
): number {
    return item.quantity * item.priceMinor;
}

function calculateOrderTotal(
    items: OrderItem[]
): number {
    return items.reduce(
        (total, item) => total + calculateLineTotal(item),
        0
    );
}

function formatPrice(
    price: [number, string]
): string {
    const [priceAmount, priceCurrency] = price;

    return `${priceCurrency} ${(priceAmount / 100).toFixed(2)}`;
}

function printItem(item: OrderItem): void {
    console.log(
        `${item.sku}: ${item?.description ?? 'No description'}`
    )
}

items.forEach(printItem);
console.log(
    formatPrice([
        calculateOrderTotal(items),
        "GBP",
    ])
)