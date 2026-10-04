export {};

interface Product {
    sku: string;
    priceMinor: number;
    description: string;
}

type ProductChanges = Partial<Omit<Product, "sku">>;
type ProductSummary = Pick<Product, "sku" | "priceMinor">;


class ProductCatalogue {
    #products: Map<string, Product> = new Map();

    public add(product: Product): void {
        this.#products.set(
            product.sku,
            product,
        )
    }

    public find(sku: string): Product | undefined {
        return this.#products.get(sku);
    }

    public update(
        sku: string,
        changes: ProductChanges,
    ): boolean {
        const product = this.#products.get(sku);

        if (product === undefined) {
            return false;
        }

        this.#products.set(
            sku,
            {
                ...product,
                ...changes,
            }
        )

        return true;
    }

    public summaries(): ProductSummary[] {
        return [
            ...this.#products.values()
        ].map(
            (product) => (
                {
                    sku: product.sku,
                    priceMinor: product.priceMinor,
                }
            )
        )
    }
}

const catalogue = new ProductCatalogue();

catalogue.add({
    sku: "PRINT",
    priceMinor: 1200,
    description: "Art Print",
})

console.log(
    catalogue.update(
        "PRINT",
        {
            priceMinor: 1500
        }
    )
);
console.log(
    catalogue.update(
        "MISSING",
        {
            priceMinor: 500
        }
    )
);
console.log(
    catalogue.find("PRINT")?.priceMinor
);
console.log(
    catalogue.summaries()
);

console.log("====");

class StockTracker {
    #stock: Map<string, number> = new Map();

    setStock(sku: string, quantity: number): void {
        this.#stock.set(
            sku,
            quantity
        )
    }

    getStock(sku: string): number {
        return this.#stock.get(sku) ?? 0;
    }

    hasSku(sku: string): boolean {
        return this.#stock.has(sku);
    }
}

const stock = new StockTracker();

stock.setStock("PRINT", 5);
stock.setStock("BOOK", 0);

console.log(stock.getStock("PRINT"));
console.log(stock.getStock("BOOK"));
console.log(stock.hasSku("BOOK"));

stock.setStock("PRINT", 8);
console.log(stock.getStock("PRINT"));

console.log(
    stock.getStock("MISSING")
);
console.log(
    stock.hasSku("MISSING")
);