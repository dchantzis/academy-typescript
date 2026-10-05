export {}

// type TransactionStatus = | "pending" | "completed" | "failed";
export enum TransactionState {
    pending = "pending",
    completed = "completed",
    failed = "failed"
}

export interface Transaction {
    transactionId: string,
    customerId: string,
    amountMinor: number,
    status: TransactionState
}

export interface TransactionRepository {
    getAll(): Promise<Transaction[]>;
}

export type SummaryResult =
    | { kind: "ready", totals: Map<string, number> }
    | { kind: "failure", error: string };

export async function loadTransactionSummary(
    repository: TransactionRepository
): Promise<SummaryResult> {

    try {
        const transactions = await repository.getAll();
        const transactionSummary: Map<string, number> = summariseTransactions(transactions);

        return {
            kind: "ready",
            totals: transactionSummary
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

export function isAmountValid(amount: number): boolean {
    return (amount !== 0 && Number.isSafeInteger(amount));
}

export function validateAmount(amount: number): void {
    if (!isAmountValid(amount)) {
        throw new Error(`Invalid amount: ${amount}`)
    }
}

export function summariseTransactions(
    transactions: Transaction[]
): Map<string, number> {

    const transactionMap: Map<string, Transaction> = new Map<string, Transaction>();
    // const duplicateTransactions: Transaction[] = [];
    const transactionsSummary = new Map<string, number>;

    for (const transaction of transactions) {
        validateAmount(transaction.amountMinor);

        const existingTransaction = transactionMap.get(transaction.transactionId) ?? null;
        const currentTotal = transactionsSummary.get(transaction.customerId) ?? 0;

        if (!existingTransaction) {
            transactionMap.set(transaction.transactionId, transaction);

            if (transaction.status !== TransactionState.completed) {
                continue
            }

            transactionsSummary.set(
                transaction.customerId,
                currentTotal + transaction.amountMinor
            );

            continue;
        }

        // if (existingTransaction === transaction) {
        //     duplicateTransactions.push(transaction);
        //     continue;
        // }

        if (
            existingTransaction.customerId !== transaction.customerId
            || existingTransaction.amountMinor !== transaction.amountMinor
            || existingTransaction.status !== transaction.status
        ) {
            throw new Error(`Transaction ID already exists: ${transaction.transactionId} for customer ID ${existingTransaction.customerId}`);
        }

        // duplicateTransactions.push(transaction);
    }

    // console.log(
    //     `Found ${duplicateTransactions.length} duplicated transactions`
    // );

    return transactionsSummary;
}