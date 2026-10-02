const items = [
    {
        name: "Print",
        priceMinor: 1200,
        quantity: 2,
    },
    {
        name: "Book",
        priceMinor: 2000,
        quantity: 1,
    },
    {
        name: "Card",
        priceMinor: 300,
        quantity: 0,
    },
];

const names = items.map((item) => item.name);
console.log(
    names
);

const lineTotals = items.map(
    (item) => item.quantity * item.priceMinor
);

console.log(
    lineTotals
)

console.log(items);

const positiveQuantityItems = items.filter(
    (item) => item.quantity > 0
);

console.log(positiveQuantityItems);

const positiveQuantityNames = items.filter(
    (item) => item.quantity > 0
).map(
    (item) => item.name
)

console.log(positiveQuantityNames);

const book = items.find( (item) => item.name === "Book" );
console.log(book);

const poster = items.find(
    (item) => item.name === "Poster"
);
console.log(
    poster?.name ?? "Not Found"
);

const hasZeroQuantity = items.some(
    (item) => item.quantity === 0
);

const allHavePositiveQuantity = items.every (
    (item) => item.quantity > 0
);

console.log(hasZeroQuantity); // true
console.log(allHavePositiveQuantity); // false

const someHaveMoreThan1500UnitPrice = items.some(
    (item) => item.priceMinor > 1500
);
const allHavePositiveQuantity2 = items.every (
    (item) => item.quantity >= 0
);

console.log(someHaveMoreThan1500UnitPrice); // true
console.log(allHavePositiveQuantity2); // false

const totalMinor = items.reduce(
    (total, item) => total + item.priceMinor * item.quantity,
    0
);
console.log(totalMinor);

const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
);
console.log(totalQuantity);

const sortItems = [...items].sort(
    (a, b) => a.priceMinor - b.priceMinor
);

console.log(
    sortItems.map(
        (item) => item.name
    )
);

const sortItemsHighestFirst = [...items].sort(
    (a, b) => b.priceMinor - a.priceMinor
);

console.log(
    items.map(
        (item) => item.name
    )
);
console.log(
    sortItemsHighestFirst.map(
        (item) => item.name
    )
);
