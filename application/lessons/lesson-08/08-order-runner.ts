import {
    calculateLineTotal,
    calculateOrderTotal,
} from "./08-order.ts";

console.log(
    calculateOrderTotal([])
)

console.log(
    calculateOrderTotal(
        [
            {
                sku: "PRINT",
                priceMinor: 1200,
                quantity: 2
            },
            {
                sku: "BOOK",
                priceMinor: 2000,
                quantity: 1
            }
        ]
    )
)

console.log(
    calculateOrderTotal(
        [
            {
                sku: "PRINT",
                priceMinor: 1200,
                quantity: 1
            },
            {
                sku: "PRINT",
                priceMinor: 1200,
                quantity: 1
            }
        ]
    )
)