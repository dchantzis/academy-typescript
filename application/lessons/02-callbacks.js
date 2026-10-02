function applyToPrice(
    price,
    operation
) {
    return operation(price);
}

const double = (price) => price * 2;

console.log(
    applyToPrice(
        1200,
        double
    )
);

const addThreeHundred = (value) => Number(value) + 300;

console.log(
    addThreeHundred("2")
);

console.log(
    applyToPrice(
        double(1500),
        addThreeHundred
    )
)

const something = (value) => value -2;

console.log(
    applyToPrice(
        1200,
        (price) => price + 300
    )
)

function makePriceAdder(amount) {
    return (price) => price + amount;
}

const addDelivery = makePriceAdder(300);
const addPacking = makePriceAdder(100);

console.log(addDelivery(1200));
console.log(addPacking(1200));

function makePriceAdder2 (amount) {
    function addAmount(price) {
        return price + amount;
    }

    return addAmount;
}

const addDelivery2 = makePriceAdder(300);
console.log(
    addDelivery2(1200)
);

console.log(
    applyToPrice(
        1200,
        addDelivery
    )
);

function blah1 (total, minimum) {
    return total >= minimum;
}

function makeMinimumChecker(minimum) {
    return (total) => total >= minimum;
}

const qualifiesForFreeDelivery = makeMinimumChecker(5000);
const qualifiesForDiscount = makeMinimumChecker(10000);

console.log(
    qualifiesForFreeDelivery(7500)
); // true
console.log(
    qualifiesForDiscount(7500)
); // false

function makeMultiplier(factor) {
    return (value) => value * factor;
}

const doubleValue = makeMultiplier(2);
const tripleValue = makeMultiplier(3);

console.log(
    doubleValue(10)
); //20
console.log(
    tripleValue(10)
); // 30
console.log(
    doubleValue(
        tripleValue(3)
    )
); //18

console.log(
    applyToPrice(
        1200,
        doubleValue
    )
) // 2400