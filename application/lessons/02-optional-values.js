const customer = {
    name: "Dimitri",
    address: null,
};

const city = customer.address?.city ?? "Unknown";
console.log(
    `City: ${city}`
);

const quantity = 0;
console.log(
    quantity || 10
);
console.log(
    quantity ?? 10
);

const customer2 = {
    name: "James",
    address: {
        city: "New Jersey",
    }
}

console.log(
    `City: ${customer2.address?.city ?? "Unknown"}`
);

console.log("" || "Unknown"); // "Unknown"
console.log("" ?? "Unknown"); // ""

function getCustomerCity(customer) {
    return customer?.address?.city ?? "Unknown";
}

console.log(
    getCustomerCity(
        {
            address: {
                city: "London",
            }
        }
    )
); // London

console.log(
    getCustomerCity(
        {
            address: null,
        }
    )
); // Unknown

console.log(
    getCustomerCity(
        {}
    )
); // Unknown

console.log(
    getCustomerCity(
        {
            address: {
                city: ""
            }
        }
    )
); // ""