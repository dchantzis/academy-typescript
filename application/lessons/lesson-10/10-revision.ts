export {}

interface StockMovement {
    sku: string;
    change: number;
}

interface MovementRepository {
    getAll(): Promise<StockMovement[]>;
}

type MovementResult =
    | { kind: "ready"; totals: Map<string, number> }
    | { kind: "failure"; error: string }

async function loadMovementSummary(
    repository: MovementRepository,
): Promise<MovementResult> {

    try {
        const movements = await repository.getAll();
        const summaries = summariseMovements(movements)

        return {
            kind: "ready",
            totals: summaries
        }
    } catch (error: unknown) {
        return {
            kind: "failure",
            error: error instanceof Error
                ? error.message
                : String(error)
        }
    }
}

function summariseMovements (
    movements: StockMovement[],
): Map<string, number> {

    const changes = new Map<string, number>();

    for (const movement of movements) {
        const existing = changes.get(movement.sku) ?? 0;

        changes.set(movement.sku, movement.change + existing);
    }

    return changes;
}

const repository: MovementRepository = {
    async getAll(): Promise<StockMovement[]> {
        return [
            {
                sku: "PRINT",
                change: 5
            },
            {
                sku: "PRINT",
                change: -3
            },
        ]
    }
}

interface Product {
    sku: string;
    priceMinor: number;
    available: boolean;
}

const products: Product[] = [
    { sku: "PRINT", priceMinor: 1200, available: true },
    { sku: "CARD", priceMinor: 300, available: false },
    { sku: "BOOK", priceMinor: 2000, available: true },
    { sku: "POSTER", priceMinor: 800, available: true },
    { sku: "STICKER", priceMinor: 800, available: true },
];

function findCheapestAvailable(
    products: Product[]
): Product | undefined {

    if (products.length === 0) {
        return undefined;
    }

    let cheapestProduct: Product | undefined = undefined;

    for (const product of products) {
        if (!product.available) {
            continue;
        }

        if  (cheapestProduct === undefined || product.priceMinor < cheapestProduct.priceMinor) {
            cheapestProduct = product;
        }
    }

    return cheapestProduct;
}

console.log(
    summariseMovements([
        {
            sku: "PRINT",
            change: 5
        },
        {
            sku: "BOOK",
            change: 2
        },
        {
            sku: "PRINT",
            change: -3
        },
        {
            sku: "BOOK",
            change: -2
        }
    ])
);

console.log(
    await loadMovementSummary(repository)
)

console.log(findCheapestAvailable(products));

console.log(findCheapestAvailable([]));

console.log(findCheapestAvailable([
    { sku: "CARD", priceMinor: 300, available: false },
]));