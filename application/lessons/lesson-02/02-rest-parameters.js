
function sum(
    ...numbers
) {
    let total = 0;

    for (const number of numbers) {
        total += number;
    }

    return total;
}

console.log(sum(10, 20, 30));
console.log(sum(5));
console.log(sum());

const prices = [
    1200,
    2000,
    300
];

console.log(sum(...prices));

function multiply (...numbers) {
    let total = 1;

    for (const number of numbers) {
        total *= number;
    }

    return total;
}

console.log(multiply(2, 3, 4));
console.log(multiply(5));
console.log(multiply());
console.log(multiply(2, 0, 3));
console.log(multiply(2, 1.5));