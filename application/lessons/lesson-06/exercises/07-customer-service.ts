export interface Customer {
    id: string;
    name: string;
}

const fixtures: Map<string, unknown> = new Map([
    [
        "C1",
        {
            id: "C1",
            name: "Dimitrios"
        }
    ],
    [
        "C2",
        {
            id: "C2",
            name: "Dimitrios"
        }
    ],
    [
        "BROKEN",
        {
            id: "BROKEN",
            name: 42
        }
    ]
]);

export function parseCustomer(value: unknown): Customer {
    if (
        typeof value !== "object"
        || value === null
        || !("id" in value) || typeof value.id !== "string"
        || !("name" in value) || typeof value.name !== "string"
    ) {
        throw new Error("Invalid customer");
    }
    return {
        id: value.id,
        name: value.name,
    };
}

export async function lookupCustomer (id: string): Promise<Customer> {
    const data = fixtures.get(id);

    if (data === undefined) {
        throw new Error(`Unknown customer: ${id}`);
    }

    return parseCustomer(data);
}