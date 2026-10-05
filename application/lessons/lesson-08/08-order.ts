export interface OrderItem {
    sku: string;
    priceMinor: number;
    quantity: number;
}

export type OrderValidation =
    | { valid: true }
    | { valid: false, error: string }

export interface StockRepository {
    getAvailable(
        sku: string
    ): Promise<number>;

    hasSku(
        sku: string
    ): Promise<boolean>;
}

export type PreparationResult =
    | { kind: "ready"; totalMinor: number }
    | { kind: "invalid"; error: string }
    | { kind: "insufficient"; sku: string; available: number }
    | { kind: "lookupFailure"; error: string };

export function validateOrder(items: OrderItem[]): OrderValidation {

    if (0 === items.length) {
        return {
            valid: false,
            error: 'Empty basket',
        }
    }

    for (const item of items) {
        if (!Number.isSafeInteger(item.priceMinor)
            || item.priceMinor < 0) {
            return {
                valid: false,
                error: `Invalid priceMinor. Provided value ${String(item.priceMinor)}`,
            }
        }

        if (
            !Number.isSafeInteger(item.quantity)
            || item.quantity <= 0
        ) {
            return {
                valid: false,
                error: `Invalid quantity. Provided value ${String(item.quantity)}`,
            }
        }
    }

    return {
        valid: true,
    }
}

function validateNumberAttribute(price: unknown): boolean {

    return !(
        typeof price !== "number"
            || !Number.isSafeInteger(price)
            || price < 0
    );

}

export function calculateLineTotal(item: OrderItem): number {

    // if (!("priceMinor" in item || "quantity" in item)) {
    //     throw new Error('Invalid order item structure');
    // }
    //
    // if (!validateNumberAttribute(item.priceMinor)) {
    //     throw new Error('Invalid priceMinor format')
    // }
    //
    // if (!validateNumberAttribute(item.quantity)) {
    //     throw new Error('Invalid quantity format')
    // }

    return (item.quantity * item.priceMinor);
}

export function calculateOrderTotal(items: OrderItem[]): number {
    let total = 0;

    for (const item of items) {
        total += calculateLineTotal(item);
    }

    return total;
}

export async function prepareOrder(
    items: OrderItem[],
    repository: StockRepository,
): Promise<PreparationResult> {

    const validationResult = validateOrder(items)

    if (!validationResult.valid) {
        return {
            kind: "invalid",
            error: validationResult.error
        }
    }

    // if (false) {
    //     const seenSkus = new Set<string>();
    //
    //     for (const item of items) {
    //         if (seenSkus.has(item.sku)) {
    //             return {
    //                 kind: "invalid",
    //                 error: `Duplicate SKU: ${item.sku}`
    //             }
    //         }
    //
    //         seenSkus.add(item.sku);
    //     }
    // }

    const quantitiesBySku = new Map<string, number>();

    for (const item of items) {
        const quantity = quantitiesBySku.get(item.sku) ?? 0;

        quantitiesBySku.set(item.sku, item.quantity + quantity);
    }

    for (const [sku, requestedQuantity] of quantitiesBySku) {
        const exists = await repository.hasSku(sku);

        // if (!exists) {
        //     return {
        //         kind: "lookupFailure",
        //         error: "No sku exists.",
        //     }
        // }

        try {
            const available = await repository.getAvailable(sku);

            if (available < requestedQuantity) {
                return {
                    kind: "insufficient",
                    sku: sku,
                    available: available,
                }
            }
        } catch (error: unknown) {
            return {
                kind: "lookupFailure",
                error: error instanceof Error
                    ? error.message
                    : String(error)
            }
        }
    }

    return {
        kind: "ready",
        totalMinor: calculateOrderTotal(items)
    }
}