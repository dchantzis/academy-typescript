import type { StockRepository } from './08-order.ts';

export class InMemoryStockRepository implements StockRepository {
    private stock: Map<string, number>;

    constructor(stock: Map<string, number>) {
        this.stock = stock;
    }

    async getAvailable(
        sku: string
    ): Promise<number> {
        return this.stock.get(sku) ?? 0;
    }

    async hasSku(
        sku: string
    ): Promise<boolean> {
        return this.stock.has(sku);
    }
}