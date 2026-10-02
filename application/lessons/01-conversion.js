console.log(
    "5" + 2 // 52
);

console.log(
    Number("5") + 2 // 7
);

console.log(
    "5" - 2 // 3
);

console.log(
    Boolean("false") // true
);

console.log(
    Boolean("0") // true
);

console.log(
    Boolean("") // false
);

console.log(Number("")); // 0
console.log(Number("hello")); // Nan
console.log(Boolean([])); // true
console.log(Boolean({})); // true

const converted = Number("hello"); // Nan

console.log(typeof converted); // "number"
console.log(Number.isNaN(converted)); // true

const input = "asdasd";
const quantity = Number(input);

function isValidQuantity(quantity) {
    return Number.isSafeInteger(quantity)
        && quantity > 0;
}

if (!isValidQuantity(quantity)) {
    console.log("Invalid quantity");
} else {
    console.log("Quantity:", quantity);
}


console.log(isValidQuantity(3));
console.log(isValidQuantity("3"));
console.log(isValidQuantity(0));
console.log(isValidQuantity(2.5));





const name = "Dimitri";

console.log("Hello, ${name}");
console.log('Hello, ${name}');
console.log(`Hello, ${name}`);

const priceMinor = 1200;
const quantity2 = 3;

const totalPounds = priceMinor * quantity2/100;

console.log(
    `${name} ordered ${quantity2} prints and payed £${totalPounds.toFixed(2)}.`
);