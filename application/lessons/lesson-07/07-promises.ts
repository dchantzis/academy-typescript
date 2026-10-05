export {};

function getStock(
    sku: string
): Promise<number> {
    if ("FAIL" === sku) {
        return Promise.reject(
            new Error("Stock lookup unavailable")
        );
    }

    return Promise.resolve("PRINT" === sku ? 5 : 0);
}

const stockPromise = getStock("SKU");

console.log("Before callback");

stockPromise.then((
   quantity
) => {
    console.log("Stock: ", quantity);
});

console.log("After registering callback");

getStock("PRINT").then((quantity => {
    console.log("Stock: ", quantity);
})).catch((error: unknown) => {
   if (error instanceof Error) {
       console.log("Lookup failed: ", error.message);
   } else {
       console.log("Lookup failed: ", String(error))
   }
});

console.log("====");

async function getStockAgain(sku: string): Promise<number> {
    if ("FAIL" === sku) {
        throw new Error("Stock lookup unavailable")
    }

    return sku === "PRINT" ? 5 : 0;
}

async function printStock(sku: string): Promise<void> {
    try {
        const quantity = await getStockAgain(sku);
        console.log(`${sku}: ${quantity}`);
    } catch (error: unknown) {
        console.log(
            error instanceof Error
                ? error.message
                : String(error)
        )
    }
}

async function isInStock(sku: string): Promise<boolean> {
    const quantity = await getStockAgain(sku);

    return quantity > 0;
}

async function main(): Promise<void> {
    await printStock("PRINT");
    await printStock("BOOK");
    await printStock("FAIL");

    console.log(
        await isInStock("PRINT")
    );
    console.log(
        await isInStock("BOOK")
    );

    const printQuantity1 = await getStockAgain("PRINT");
    const bookQuantity1 = await getStockAgain("BOOK");

    const [printQuantity, bookQuantity] = await Promise.all([
        getStockAgain("PRINT"),
        getStockAgain("BOOK")
    ]);

    console.log(printQuantity, bookQuantity);

    try {
        console.log(
            await getStockForSkus(["PRINT", "FAIL"])
        );
    } catch (error: unknown) {
        console.log(
            error instanceof Error
                ? error.message
                : String(error)
        );
    }
}

main().catch((error: unknown) => {
    console.error(error);
});

console.log("====");

async function getStockForSkus(
    skus: string[]
): Promise<number[]> {
    return Promise.all(
        skus.map(
            (sku: string) => {
                return getStockAgain(sku)
            }
        )
    );
}