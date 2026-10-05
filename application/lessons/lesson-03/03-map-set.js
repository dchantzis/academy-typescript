const skus = [
    "PRINT",
    "BOOK",
    "PRINT",
    "CARD"
];

const uniqueSkus = new Set(skus)

console.log(uniqueSkus.size); // 3
console.log(uniqueSkus.has("PRINT")); // true
console.log(uniqueSkus.has("POSTER")); // false

uniqueSkus.add("POSTER");
uniqueSkus.delete("CARD");
console.log(uniqueSkus);

const uniqueSkuList = [...uniqueSkus];
console.log(uniqueSkuList);

const customerIds = [
  12,
  8,
  12,
  3,
  8
];

const uniqueCustomerIds = new Set(customerIds);
console.log(uniqueCustomerIds.size);
console.log(uniqueCustomerIds);
console.log([...uniqueCustomerIds]);

const stockBySku = new Map();

stockBySku.set("PRINT", 5);
stockBySku.set("BOOK", 2);

console.log(stockBySku.get("PRINT"));
console.log(stockBySku.get("POSTER"));
console.log(stockBySku.get("BOOK"));
console.log(stockBySku.size);

stockBySku.set("PRINT", 10);
console.log(stockBySku.get("PRINT"));

const countsByCustomerId = new Map();

for (const customerId of customerIds){
    const currentCount = countsByCustomerId.get(customerId) ?? 0;

    countsByCustomerId.set(customerId, currentCount + 1);
}

console.log(countsByCustomerId);

customerIds.forEach(
    (customerId) => console.log(customerId),
);