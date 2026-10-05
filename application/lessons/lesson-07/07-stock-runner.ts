import { lookupStock } from "./07-stock-service.ts";

async function main() {
    const skus = [
        "PRINT",
        "BOOK",
        "BROKEN",
        "MISSING"
    ]

    for (const sku of skus) {
        try {
            const result = await lookupStock(sku);

            console.log(
                `${sku}: ${result.quantity}`
            )
        } catch (error: unknown) {
            console.log(
                error instanceof Error
                    ? error.message
                    : String(error)
            )
        }
    }

    try {
        const results = await Promise.all(
            skus.map(
                (sku) => lookupStock(sku)
            )
        );

        console.log(results);
    } catch (error: unknown) {
        console.log(
            error instanceof Error
                ? error.message
                : String(error)
        )
    }
}

main().catch(
    (error: unknown) => {
        console.log(
            error instanceof Error
            ? error.message
            : String(error)
        )
    }
);