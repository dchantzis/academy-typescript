export {};

const item ={
    name: "Print",
    priceMinor: 1200,
    quantity: 2,
};

const names = [
    "Dimitri",
    "James"
];

console.log(item.name);
console.log(names[0]);

console.log(typeof item);
console.log(typeof names);

console.log(Array.isArray(item))
console.log(Array.isArray(names));

console.log(item.priceMinor * item.quantity);

item.quantity = 3;

console.log(item.quantity);
console.log(item.priceMinor * item.quantity);

const anotherItem = item;
anotherItem.quantity = 5;
console.log(item.quantity);
console.log(anotherItem === item);

const copiedItem = { ...item};
copiedItem.quantity = 10;

console.log(item.quantity);
console.log(copiedItem.quantity);
console.log(copiedItem === item);

const book = {
    ...item,
    name: "Book",
    priceMinor: 2000,
    quantity: 2,
};

console.log(book.name);

const items :Item[] = [
    item,
    copiedItem,
    book
];

let totalMinor = 0;

for (const currentItem of items) {
    const lineTotal = calculateLineTotal(
      currentItem
    );
    totalMinor += lineTotal;

    console.log(currentItem.name, lineTotal);
}
console.log("Total:", totalMinor)

console.log(
    calculateLineTotal(
        {
            name: "Card",
            priceMinor: 500,
            quantity: 3,
        }
    )
);

function calculateLineTotal(
    item: Item
): number {
    return item.priceMinor * item.quantity;
}

type Item = {
    name: string;
    priceMinor: number;
    quantity: number;
};

function calculateOrderTotal(items: Item[]): number {
    let orderTotal = 0;

    for (const item of items) {
        orderTotal += calculateLineTotal(item);
    }
    return orderTotal;
}

console.log("Order total:", calculateOrderTotal(items));
console.log("Empty order:", calculateOrderTotal([]));