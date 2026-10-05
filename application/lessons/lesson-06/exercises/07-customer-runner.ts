import {lookupCustomer} from './07-customer-service.ts';

async function main(): Promise<void> {

    const values = [
        "C1",
        "BROKEN",
        "MISSING",
        "C2",
    ];

    for (const value of values) {
        try {
            const customer = await lookupCustomer(value);
            console.log(
                `${customer.id}: ${customer.name}`
            );
        } catch (error: unknown) {
            console.log(
                error instanceof Error
                ? error.message
                : String(error)
            );
        }
    }
}

main().catch((error: unknown) => {
    console.log(
        error instanceof Error
        ? error.message
        : String(error)
    )
});