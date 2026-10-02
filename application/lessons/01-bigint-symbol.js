const largeNumber = 9007199254740992;
console.log(largeNumber + 1 === largeNumber); // true: precision lost

const largeInteger = 9007199254740992n;
console.log(largeInteger + 1n === largeInteger); // false
console.log(typeof largeInteger); //bigint

const firstKey = Symbol("id");
const secondKey = Symbol("id");

console.log(firstKey === secondKey); // false
console.log(typeof firstKey); // symbol

const record = {
    name: "Print",
    [firstKey]: "internal-123",
};

console.log(record[firstKey]);
console.log(record[secondKey]);
console.log(Object.keys(record));