const item = {
    name: "Print",
    quantity: 2,
    discountMinor: 0,
};

function describeItem(item) {
    const {name, quantity} = item;

    return `${name}: ${quantity} units`;
}

const describeItem2 = (item) => {
    const {name, quantity} = item;

    return `${name}: ${quantity} units`;
}

function withQuantity(item, quantity) {
    return {
        ...item,
        quantity: quantity,
    };
}
const withQuantity2 = (item, quantity) => {
    return {
        ...item,
        quantity: quantity,
    }
};

function getDiscount(item) {
    return item?.discountMinor ?? 100;
}

const getDiscount2 = (item) => item?.discountMinor ?? 100;

console.log(
    describeItem(
        item
    )
);

console.log(
    describeItem(
        withQuantity(
            item,
            5
        )
    )
);

console.log(item.quantity); // 2
console.log(getDiscount(item)); // 0
console.log(getDiscount({})); // 100
console.log(getDiscount(
    {
        discountMinor: null
    }
)); // 100