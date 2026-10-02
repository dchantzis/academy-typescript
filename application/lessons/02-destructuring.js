const item = {
    name: "Print",
    priceMinor: 1200,
    quantity: 2,
};

const name2 = item.name;
const quantity2 = item.quantity;

const { name, quantity} = item;

console.log(`${name}: ${quantity} units`);

const { priceMinor: unitPrice } = item;

console.log(unitPrice);

const names = [
    "Dimitri",
    "James",
    "John",
];

const [first, second] = names;

console.log(first);
console.log(second);

const [, secondName] = names;
console.log(secondName);

const [primary, backup = "Unknown"] = ["Dimitri"];
console.log(backup);

const [value = "Default"] = [null];
console.log(value); // null
const [value2 = "Default"] = [];
console.log(value2); // Default
const [value3 = "Default"] = [undefined];
console.log(value3); // Default

const [first2, ...others] = names;

console.log(first2);
console.log(others);

const copiedNames = [...names];
copiedNames.push("Maria");
console.log(copiedNames); // ["Dimitri", "James", "Alex", "Maria"]
console.log(names);       // ["Dimitri", "James", "Alex"]
console.log(copiedNames === names); // false

const [firstName, ...remaining] = names;
console.log(remaining);

const [first3, ...theOthers] = ["Donald"];
console.log(theOthers);