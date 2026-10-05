export {};

type QuantityResult =
    | { success: true, quantity: number }
    | { success: false; error: string };

function validateQuantity(
    value: unknown
): QuantityResult {
    if (!(typeof value === "number" && Number.isSafeInteger(value) && value > 0)) {
        return {
            success: false,
            error: "Invalid quantity",
        }
    }

    return {
        success: true,
        quantity: value,
    }
}

function describeQuantityResult(
    result: QuantityResult
): string {
    if (!result.success) {
        return result.error;
    }

    return `Quantity accepted: ${result.quantity}`;
}

for (const value of [3, 0, 2.5, "3", undefined]) {
    console.log(
        describeQuantityResult(
            validateQuantity(value)
        )
    );
}