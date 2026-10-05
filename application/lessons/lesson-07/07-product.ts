export interface Product {
    sku: string;
    priceMinor: number;
}

export function formatPrice(
    priceMinor: number
): string {
    return `GBP ${(priceMinor / 100).toFixed(2)}`;
}

export function applyDiscount(
    product: Product,
    discountMinor: number
): Product {
    const newPrice = (product.priceMinor - discountMinor);

    return {
        ...product,
        priceMinor: (newPrice < 0) ? 0 : newPrice
    };
}