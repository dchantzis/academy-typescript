function calculateLineTotal(
    priceMinor,
    quantity = 1,
) {
    return priceMinor * quantity;
}

console.log(calculateLineTotal(1200, 3));
console.log(calculateLineTotal(1200));

const calculateWithArrow = (priceMinor, quantity = 1) => {
    return priceMinor * quantity;
}

const calculateWithArrow2 = (priceMinor, quantity = 1) =>
    priceMinor * quantity;

console.log(calculateWithArrow(1200, 3));
console.log(calculateWithArrow2(1200));