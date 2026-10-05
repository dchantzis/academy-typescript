import test from "node:test";
import assert from "node:assert/strict";

import {
    calculateLineTotal,
    calculateOrderTotal,
    OrderValidation,
    validateOrder,
    prepareOrder,
    StockRepository,
    OrderItem
} from "../lessons/lesson-08/08-order.ts";

import {
    InMemoryStockRepository
} from "../lessons/lesson-08/08-stock-repository.ts";

test(
    "calculates a line total in minor units",
    () => {
        const result = calculateLineTotal(
            {
                sku: "PRINT",
                priceMinor: 1200,
                quantity: 2
            }
        );

        assert.equal(result, 2400)
    }
);

test(
    "an empty order totals zero",
    () => {
        const result = calculateOrderTotal([]);
        assert.equal(result, 0);
    }
);

test (
    "PRINT at 1200 × 2 plus BOOK at 2000 × 1 totals 4400",
    () => {
        const result = calculateOrderTotal(
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
        );

        assert.equal(result, 4400);
    }
)

test(
    "Two separate PRINT lines at 1200 × 1 each total 2400.",
    () => {
        const result = calculateOrderTotal([
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
        ])

        assert.equal(result, 2400);
    }
);

test(
    'rejects an empty order',
    () => {
        assert.deepEqual(
            validateOrder([]),
            {
                valid: false,
                error: 'Empty basket'
            }
        )
    }
);

test(
    'Zero price with quantity 1 → valid.',
    () => {
        assert.deepEqual(
            validateOrder([
                {
                    sku: "RANDOM",
                    priceMinor: 0,
                    quantity: 1
                }
            ]),
            {
                valid: true,
            }
        )
    }
);

test(
    'Quantity 0 → invalid.',
    () => {
        const quantity = 0;
        assert.deepEqual(
            validateOrder([
                {
                    sku: "RANDOM",
                    priceMinor: 1100,
                    quantity: quantity
                }
            ]),
            {
                valid: false,
                error: `Invalid quantity. Provided value ${quantity}`,
            }
        )
    }
);

test(
    'Fractional price 1200.5 → invalid.',
    () => {
        const priceMinor = 1200.5;
        assert.deepEqual(
            validateOrder([
                {
                    sku: "RANDOM",
                    priceMinor: priceMinor,
                    quantity: 11
                }
            ]),
            {
                valid: false,
                error: `Invalid priceMinor. Provided value ${priceMinor}`,
            }
        )
    }
)


test(
    "returns stock for an existing SKU",
    async() => {
        const repository = new InMemoryStockRepository(
            new Map([
                [
                    "PRINT", 5
                ],
                [
                    "BOOK",
                    0
                ],
            ])
        )

        const quantity = await repository.getAvailable("PRINT");

        assert.equal(quantity, 5);
    }
);

test(
    'getAvailable("MISSING") returns 0.',
    async () => {
        const repository = new InMemoryStockRepository(
            new Map([
                [
                    "PRINT", 5
                ],
                [
                    "BOOK",
                    0
                ],
            ])
        );

        const quantity = await repository.getAvailable("MISSING");

        assert.equal(quantity, 0);
    }
);

test (
    'hasSku("BOOK") returns true, while hasSku("MISSING") returns false.',
    async () => {
        const repository = new InMemoryStockRepository(
            new Map([
                [
                    "PRINT", 5
                ],
                [
                    "BOOK",
                    0
                ],
            ])
        )

        const hasBook = await repository.hasSku("BOOK");
        const hasMissing = await repository.hasSku("MISSING");

        assert.equal(hasBook, true);
        assert.equal(hasMissing, false);
    }
)

test(
    "prepares an order when stock is sufficient",
    async () => {

        const repository = new InMemoryStockRepository(
            new Map([
                ["PRINT", 5],
                ["BOOK", 2],
            ])
        );

        const result = await prepareOrder(
            [
                {
                    sku: "PRINT",
                    priceMinor: 1200,
                    quantity: 2,
                },
                {
                    sku: "BOOK",
                    priceMinor: 2000,
                    quantity: 1,
                }
            ],
            repository
        )

        assert.deepEqual(
            result,
            {
                kind: "ready",
                totalMinor: 4400,
            }
        )
    }
);

test(
    'empty order',
    async () => {
        const repository = new InMemoryStockRepository(
            new Map([
                ["PRINT", 5],
                ["BOOK", 2],
            ])
        );

        const result = await prepareOrder(
            [],
            repository
        );

        assert.deepEqual(
            result,
            {
                kind: 'invalid',
                error: 'Empty basket'
            }
        )
    }
);

test(
    "accepts repeated SKUs when combined demand fits available stock",
    async () => {
        const repository = new InMemoryStockRepository(
            new Map([
                ["PRINT", 5],
                ["BOOK", 2],
            ])
        );

        const result = await prepareOrder([
            {
                sku: "PRINT",
                priceMinor: 2000,
                quantity: 1,
            },
            {
                sku: "PRINT",
                priceMinor: 2000,
                quantity: 1,
            }
        ], repository);

        assert.deepEqual(
            result,
            {
                kind: "ready",
                totalMinor: 4000,
            }
        )
    }
)

test (
    'PRINT quantity 2, available stock 1',
    async () => {
        const repository = new InMemoryStockRepository(
            new Map([
                ["PRINT", 1],
                ["BOOK", 2],
            ])
        );

        const result = await prepareOrder(
            [
                {
                    sku: "PRINT",
                    priceMinor: 2000,
                    quantity: 2,
                },
            ],
            repository
        );

        assert.deepEqual(
            result,
            {
                kind: "insufficient",
                sku: "PRINT",
                available: 1,
            }
        )
    }
)

test(
    'returns lookupFailure when the repository throws',
    async () => {
        const repository: StockRepository = {
            async getAvailable(sku: string): Promise<number> {
                throw new Error("Stock service unavailable");
            },

            async hasSku(sku: string): Promise<boolean> {
                return true;
            },
        };

        const result = await prepareOrder(
            [
                {
                    sku: "PRINT",
                    priceMinor: 1200,
                    quantity: 1
                }
            ],
            repository
        );

        assert.deepEqual(
            result,
            {
                kind: "lookupFailure",
                error: "Stock service unavailable"
            }
        )
    }
);

test(
    'handles a repository failure after a successful lookup',
    async () => {
        const repository: StockRepository = {
            async getAvailable(sku: string): Promise<number> {
                if (sku === "BOOK") {
                    throw new Error("BOOK stock lookup failed");
                }

                return 5;
            },

            async hasSku(sku: string): Promise<boolean> {
                return true;
            }
        }

        const result = await prepareOrder(
            [
                {
                    sku: "PRINT",
                    priceMinor: 1200,
                    quantity: 2,
                },
                {
                    sku: "BOOK",
                    priceMinor: 2000,
                    quantity: 1,
                }
            ],
            repository
        );

        assert.deepEqual(
            result,
            {
                kind: "lookupFailure",
                error: "BOOK stock lookup failed"
            }
        )
    }
);


test(
    'new test',
    async () => {
        const repository = new InMemoryStockRepository(
            new Map([
                ["PRINT", 3],
            ])
        )

        const result = await prepareOrder(
            [
                {
                    sku: "PRINT",
                    priceMinor: 1200,
                    quantity: 2,
                },
                {
                    sku: "PRINT",
                    priceMinor: 1200,
                    quantity: 2,
                },
            ],
            repository
        )

        assert.deepEqual(
            result,
            {
                kind: "insufficient",
                sku: "PRINT",
                available: 3,
            }
        )
    }
)

test (
    "does not mutate the order items",
    async () => {
        const items: OrderItem[] = [
            { sku: "PRINT", priceMinor: 1200, quantity: 2 },
            { sku: "PRINT", priceMinor: 1200, quantity: 1 },
        ];

        const originalItems = items.map(
            (item) => ({
                    ...item
                })
        );

        const repository = new InMemoryStockRepository(
            new Map([
                ["PRINT", 5],
            ])
        )

        await prepareOrder(
            items,
            repository
        );

        assert.deepEqual(items, originalItems);
        assert.equal(await repository.getAvailable("PRINT"), 5);
    }
);