import test from "node:test";
import assert from "node:assert/strict";

import type {
    Transaction, TransactionRepository,
} from "../lessons/lesson-09-mock-interview/09-transactions.ts";

import {
    TransactionState,
    loadTransactionSummary,
    summariseTransactions
} from "../lessons/lesson-09-mock-interview/09-transactions.ts";

test(
    "summarises completed transactions by customer, including refunds",
    () => {
        const transactions: Transaction[] = [
            {
                transactionId: "T1",
                customerId: "C1",
                amountMinor: 1200,
                status: TransactionState.completed,
            },
            {
                transactionId: "T2",
                customerId: "C2",
                amountMinor: 2000,
                status: TransactionState.completed,
            },
            {
                transactionId: "T3",
                customerId: "C1",
                amountMinor: -200,
                status: TransactionState.completed,
            },
            {
                transactionId: "T4",
                customerId: "C3",
                amountMinor: 500,
                status: TransactionState.pending,
            },
            {
                transactionId: "T5",
                customerId: "C1",
                amountMinor: 300,
                status: TransactionState.failed,
            }
        ];

        const original = transactions.map(
            (transaction) => ({
                ...transaction,
            })
        )

        const result = summariseTransactions(transactions);

        assert.deepEqual(
            result,
            new Map([
                [
                    "C1", 1000
                ],
                [
                    "C2", 2000
                ]
            ])
        )

        assert.deepEqual(transactions, original);
    }
)

test (
    "Empty input",
    () => {
        const transactions: Transaction[] = [];

        const result = summariseTransactions(transactions);

        assert.deepEqual(
            result,
            new Map([])
        )
    }
)

test (
    "C1 has completed amounts 1200 and -1200, with different transaction IDs",
    () => {
        const transactions: Transaction[] = [
            {
                transactionId: "T1",
                customerId: "C1",
                amountMinor: 1200,
                status: TransactionState.completed,
            },
            {
                transactionId: "T2",
                customerId: "C2",
                amountMinor: 2000,
                status: TransactionState.completed,
            },
            {
                transactionId: "T3",
                customerId: "C1",
                amountMinor: -200,
                status: TransactionState.failed,
            },
            {
                transactionId: "T4",
                customerId: "C3",
                amountMinor: 500,
                status: TransactionState.pending,
            },
            {
                transactionId: "T5",
                customerId: "C1",
                amountMinor: -1200,
                status: TransactionState.completed,
            }
        ]

        const result = summariseTransactions(transactions);

        assert.deepEqual(
            result,
            new Map([
                [
                    "C1", 0
                ],
                [
                    "C2", 2000
                ]
            ])
        )
    }
)

test(
    "Two separate objects with identical transaction ID and fields, completed amount 1200",
    () => {
        const transactions: Transaction[] = [
            {
                transactionId: "T1",
                customerId: "C1",
                amountMinor: 1200,
                status: TransactionState.completed,
            },
            {
                transactionId: "T2",
                customerId: "C2",
                amountMinor: 2000,
                status: TransactionState.completed,
            },
            {
                transactionId: "T1",
                customerId: "C1",
                amountMinor: 1200,
                status: TransactionState.completed,
            }
        ];

        const result = summariseTransactions(transactions);

        assert.deepEqual(
            result,
            new Map([
                [
                    "C1", 1200
                ],
                [
                    "C2", 2000
                ]
            ])
        )
    }
)

test(
    "Transaction ID already exists",
    () => {
        const transactions: Transaction[] = [
            {
                transactionId: "T1",
                customerId: "C1",
                amountMinor: 1200,
                status: TransactionState.completed,
            },
            {
                transactionId: "T1",
                customerId: "C1",
                amountMinor: 1500,
                status: TransactionState.completed,
            }
        ];

        assert.throws(
            () => summariseTransactions(transactions),
            /Transaction ID already exists: T1 for customer ID C1/
        )
    }
)

test(
    'Successful loading repository',
    async() => {
        const repository: TransactionRepository = {
            async getAll(): Promise<Transaction[]> {
                return [
                    {
                        transactionId: "T1",
                        customerId: "C1",
                        amountMinor: 1200,
                        status: TransactionState.completed,
                    },
                ]
            }
        }

        const result = await loadTransactionSummary(repository);

        assert.deepEqual(
            result,
            {
                kind: "ready",
                totals: new Map([
                    [
                        "C1", 1200
                    ]
                ])
            }
        )
    }
)

test(
    'Repository failure',
    async () => {
        const repository: TransactionRepository = {
            async getAll(): Promise<Transaction[]> {
                throw new Error("Transaction service unavailable");
            }
        }

        const result = await loadTransactionSummary(repository);

        assert.deepEqual(
            result,
            {
                kind: "failure",
                error: "Transaction service unavailable",
            }
        )
    }
)

test(
    'returns failure when loaded transactions contain an invalid amount',
    async () => {
        const repository: TransactionRepository = {
            async getAll(): Promise<Transaction[]> {
                return [
                    {
                        transactionId: "T1",
                        customerId: "C1",
                        amountMinor: 0,
                        status: TransactionState.completed,
                    },
                ]
            }
        }

        const result = await loadTransactionSummary(repository);

        assert.deepEqual(
            result,
            {
                kind: "failure",
                error: "Invalid amount: 0",
            }
        )
    }
)