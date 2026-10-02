const items = [
    {
        sku: "PRINT",
        priceMinor: 1200,
        quantity: 2,
    },
    {
        sku: "BOOK",
        priceMinor: 2000,
        quantity: 1,
    },
    {
        sku: "CARD",
        priceMinor: 300,
        quantity: 0,
    },
];

const positiveItems = items.filter(
    (item) => item.quantity > 0
);

console.log(positiveItems.map(
    (item) => item.sku
));

const orderTotal = items.reduce(
    (total, item) => total + item.priceMinor * item.quantity,
    0
)
console.log(orderTotal);

const poster = items.find(
    (item) => item.sku === "POSTER"
);
console.log(poster?.sku ?? "Not Found");

const sortedItems = [...items].sort(
    (a, b) => b.priceMinor - a.priceMinor
);

console.log(items.map((item) => item.sku));
console.log(sortedItems.map((item) => item.sku));