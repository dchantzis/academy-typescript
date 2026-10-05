export interface StockResponse {
    sku: string;
    quantity: number;
}

export function parseStock (value: unknown): StockResponse {
    if (typeof value !== "object" || value === null) {
        throw new Error("Expected an object");
    }

    if (
        !("sku" in value)
        || typeof value.sku !== "string"
    ) {
        throw new Error("Invalid SKU");
    }

    if (
        !("quantity" in value)
        || typeof value.quantity !== "number"
        || !Number.isSafeInteger(value.quantity)
        || value.quantity < 0
    ) {
        throw new Error("Invalid quantity")
    }

    return {
        sku: value.sku,
        quantity: value.quantity,
    }
}

async function fetchStock(
    url: string
): Promise<StockResponse> {

    const response = await fetch (url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const data: unknown = await response.json();

    return parseStock(data);
}
