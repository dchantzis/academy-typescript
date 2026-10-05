type Item = {
  name: string;
  priceInMinorUnits: number;
  quantity: number;
};

const items :Item[] = [
    {
        name: "Print",
        priceInMinorUnits: 1200,
        quantity: 2,
    },
    {
        name: "Book",
        priceInMinorUnits: 2000,
        quantity: 1,
    },
    {
        name: "Card",
        priceInMinorUnits: 300,
        quantity: 0,
    },
]

function validateItemQuantity(
    item :Item
): boolean {
    return Number.isSafeInteger(item.quantity)
        && item.quantity >=0 ;
}

function overallTotal(
    items :Item[]
): number {
    let total = 0;

    for (const item of items) {
        if (!validateItemQuantity(item)) {
            continue;
        }

        total += item.priceInMinorUnits * item.quantity;
    }

    return total / 100;
}

console.log(
  `Overall total is ${overallTotal(items).toFixed(2)}.`
);