import { formatPrice } from "./07-product.ts";
import { applyDiscount } from "./07-product.ts";
import type { Product } from "./07-product.ts";

const product: Product = {
    sku: "PRINT",
    priceMinor: 1200,
};

console.log(
    formatPrice(
        product.priceMinor
    )
);

const discountProduct = applyDiscount (
    product,
    300
);

console.log(
    formatPrice(
        discountProduct.priceMinor
    )
);

console.log(
    formatPrice(
        product.priceMinor
    )
);