import type { StockResponse } from "./07-stock-parser.ts";
import { parseStock } from "./07-stock-parser.ts";

const stockData: Map<string, unknown> = new Map([
   [
       "PRINT",
       {
           sku: "PRINT",
           quantity: 5
       }
   ],
    [
        "BOOK",
        {
            sku: "BOOK",
            quantity: 0
        }
    ],
    [
        "BROKEN",
        {
            sku: "BROKEN",
            quantity: "3"
        }
    ]
]);

export async function lookupStock (sku: string): Promise<StockResponse> {
    const data = stockData.get(sku);

    if (data === undefined) {
        throw new Error(`Unknown SKU: ${sku}.`)
    }

    return parseStock(data)
}