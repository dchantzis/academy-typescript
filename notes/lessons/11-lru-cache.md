# Lesson 11 — LRU cache reconstruction

[Academy index](../README.md)

Lesson ID: L11  
Status: **Complete — implemented and practised; independent repetition recommended**  
Prerequisites: Lessons 6–9; generic classes, Maps and tests  
Estimated focused time: **90–135 minutes** (planning range, not a measured completion time)  
Last updated: 12 October 2026

## Chapter index

| Chapter | Topic | Estimate |
|---|---|---:|
| 11.1 | Contract, LRU versus FIFO and examples | 10–15 min |
| 11.2 | Generics, storage and basic API | 20–30 min |
| 11.3 | Recency and eviction | 20–30 min |
| 11.4 | Behavioural tests and debugging | 25–40 min |
| 11.5 | Ownership and complexity review | 15–20 min |

## Purpose

Reconstruct the LRU cache assessment as a practical TypeScript exercise in academy-typescript. This is our agreed reconstruction, not the original assessment text. Start with a small implementation, verify its behaviour, then explore alternatives.

## Remembered assessment requirements

| Requirement | Confidence |
|---|---|
| The cache uses a Least Recently Used (LRU) eviction policy | Confirmed |
| A constructor parameter limits the number of retained entries | Confirmed |
| Setting an existing key replaces its value | Confirmed |
| Public getter and setter methods | Confirmed |
| A method returning all cache entries | Tentatively remembered; exact name and return type unknown |

Updating an existing key's recency, missing-key behaviour, invalid-capacity handling and listing order are reconstruction choices below. They have not been recovered from the assessment brief.

## LRU behaviour

Least recently used means the entry whose last use happened longest ago. It does not mean the oldest-created entry or the least frequently accessed entry.

For capacity 2:

| Operation | Entries: least recent → most recent |
|---|---|
| set A = 10 | A |
| set B = 20 | A, B |
| get A | B, A |
| set C = 30 | A, C; B is evicted |

A successful read or write makes the affected entry most recent. A missed read and listing entries do not change recency.

## Public contract for our version

Class: `LruCache<K, V>`, generic over key and value types.

| API | Contract |
|---|---|
| constructor(capacity: number = 5) | Accept a positive safe integer; omitted or invalid capacity falls back to 5 |
| get(key: K): V \| undefined | Return the stored value on a hit and mark the entry most recent; return undefined on a miss |
| set(key: K, value: V): void | Insert or replace and mark the entry most recent; evict if capacity is exceeded |
| entries(): [K, V][] | Return a new array of key/value tuples, least recent first; do not change recency |
| size(): number | Return the current entry count |
| getCapacity(): number | Return the effective capacity selected by the constructor |

Capacity is fixed after construction. Zero, negative, fractional, NaN, infinite and unsafe-integer capacities fall back to 5. A default parameter alone handles omitted or undefined arguments; the explicit condition handles invalid supplied numbers. This fallback policy replaced our initial proposal to throw from the constructor. Configuration from .env belongs in the application, which passes a number to this reusable class.

Stored undefined is allowed. get alone cannot distinguish it from a miss, but internally presence must be checked independently of the value. A hit containing undefined still updates recency. Likewise, 0, false, empty strings and null are valid cached values when permitted by V.

Keys follow Map equality semantics. Object keys use identity, not matching fields. No key serialization or deep equality is introduced.

## Storage and ownership

- Use a private Map<K, V>.
- Its iteration order represents least recent → most recent.
- Updating an existing Map key with set alone does not move it. Delete and reinsert to update recency.
- A private helper may encapsulate that operation for reuse by get and set.
- Replacing a key does not increase the entry count and must not evict another entry.
- A new insertion may temporarily exceed capacity internally; after the public method returns, size must be at most capacity.
- Evict the first entry in recency order when required. Do not scan timestamps or sort the whole cache.

entries returns a fresh outer array and fresh tuple arrays, protecting the internal collection's structure. Keys and values themselves are not deep-copied. Cached object values remain shared references, including those returned by get.

The completed get reuses set to refresh recency; a separate private helper was discussed but not needed.

No routine try/catch is needed around built-in in-memory Map operations. Do not swallow an unexpected recency-update failure and report normal success.

## Earlier interview design

The original attempt stored CacheEntry objects with key, value, createdAtTimestamp, lastUsedAtTimestamp and usageCounter. These fields were introduced by the candidate, not required by the remembered brief.

That design can implement LRU by scanning last-use timestamps, but victim selection is O(n) and equal timestamps need a tie-breaker. Creation timestamps support other concerns, such as expiration; access counts support frequency policies. Neither is necessary for this version.

The Map-order approach avoids a full scan for eviction. Do not claim the JavaScript specification guarantees strict O(1) for every Map operation. A hash map plus doubly linked list is a later exercise for the classic constant-time LRU design.

## Scope boundaries

The completed version includes generic key/value types, capacity with fallback, replacement, recency, eviction, entry listing, size() and getCapacity(). We first built a string/number implementation, then generalised it.

Deferred extensions: timestamps, usage statistics, TTL, peek/has/delete/clear, capacity resizing, persistence, external loaders, async operations, request coalescing, deep copying and alternative eviction policies. Capacity counts entries, not bytes; differently sized values have the same capacity cost.

## Acceptance tests

| Case | Expected |
|---|---|
| Newly constructed cache | size 0; entries empty |
| Insert below capacity | Value retrievable; size increases |
| Replace an existing key at full capacity | Value replaced; size unchanged; no unrelated eviction |
| Insert beyond capacity | Least recently used entry removed |
| Read A after inserting A then B, then insert C at capacity 2 | B evicted; A retained |
| Update A after inserting A then B, then insert C at capacity 2 | B evicted; updated A retained |
| Read missing key | undefined; size and order unchanged |
| Capacity 1 | New distinct key replaces the sole retained entry |
| Omitted capacity or capacity 0, negative, fractional, NaN, Infinity or unsafe integer | Effective capacity is 5; sixth distinct insertion evicts the least recent entry |
| Listing entries | Least recent first; listing does not update recency |
| Modify returned entries array or its tuples | Internal keys/order/value bindings unchanged |
| Cache values 0, false or undefined | Presence handled correctly; successful reads update recency |
| Undefined key permitted by K | Normal storage, retrieval and eviction behaviour |

Use Node's test runner and strict assertions. Place tests directly under application/tests/ with filenames ending in .test.ts. Assert order through entries(), rather than calling get to inspect every key, because get changes recency.

## Implementation stages

1. Storage and basic methods: class, generic types, constructor validation, size and entry snapshots.
2. Recency and eviction: implement get/set, optional private helper, and capacity enforcement.
3. Verification: run behavioural tests and typecheck; discuss complexity and ownership limitations.

Suggested files:

- application/lessons/lesson-11-lru-cache/11-lru-cache.ts
- application/tests/11-lru-cache.test.ts

Lesson 11 is now the allocated academy number for this exercise. Existing source files do not need renaming merely to match the documentation.

Inside the existing container:

```bash
npm run typecheck
npm run test
```

## Concepts clarified during the exercise

### Entry types versus storage types

`CacheEntry<K, V> = [key: K, value: V]` describes a tuple in the output array. The stored Map value is V, not the tuple. Named tuple labels help readers; they do not create `.key` and `.value` properties.

Storing `Map<string, { key: string; value: number }>` is valid, but duplicates the key and requires keeping the two keys consistent. Additional stored metadata can justify an entry object later. For our basic LRU, Map order already tracks recency.

### entries, spread and method names

`this.entries()` calls the cache class's own method. `this.cache.entries()` calls the built-in Map method: there is no recursion between them.

Map.entries returns an iterator of key/value tuples. `[...this.cache.entries()]` consumes that iterator to create an array. `Array.from(this.cache.entries())` is an alternative. Each yielded tuple is new; the contained keys/values are not deep copies.

### Iterator results and done

```ts
const map = new Map([["PRINT", 1200], ["BOOK", 2000]]);
const iterator = map.keys();
console.log(iterator.next()); // { value: "PRINT", done: false }
console.log(iterator.next()); // { value: "BOOK", done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

The last actual key still has done false. Done true means no item was yielded. In keys().next(), `.value` is the yielded key, not the cached value; there is no `.key` attribute.

Every call to Map.keys creates a new iterator. Advancing another iterator does not change this one or reorder the Map. Our eviction code creates a fresh iterator and takes its first item. Checking done rather than value is important because undefined itself can be a valid key in a generic cache.

### Why insertion precedes eviction

At capacity 2, replacing BOOK in PRINT/BOOK must retain both entries. Evicting first simply because size equals capacity would unnecessarily remove PRINT. Deletion and reinsertion of an existing key leave size unchanged. A new key increases size by one; only then do we evict if size exceeds capacity.

Do not return immediately after deleting the eviction victim before inserting the requested value. One eviction is sufficient because a single set introduces at most one additional entry and capacity is fixed.

### Methods versus accessors

Our class defines `size(): number`, so callers use `cache.size()`. A declaration `get size(): number` would be an accessor used as `cache.size` without parentheses. Both designs work; the tests must match the chosen API. The backing Map has its own size property: `this.cache.size`.

### Map.has does not narrow Map.get

TypeScript checks these signatures separately: has returns boolean; get returns V or undefined. It does not infer that a prior has check removes undefined from the next get result. The runtime reasoning is valid, but the type checker does not prove that relationship.

In the initial number-only cache, `current === undefined` allowed an early return and narrowed current to number. It also correctly retained a stored zero. That check is insufficient for generic V, which may legitimately contain undefined.

The generic version checks has, then uses `as V` on the retrieved value. This assertion is justified by the private Map<K, V> invariant and the uninterrupted synchronous lookup. It is not a conversion and must not be used to bypass uncertain external data. A future design could wrap values in an internal object to avoid this assertion, but that was not implemented here.

### Reusing set from get

A successful get calls this.set(key, current) to refresh recency, then returns current. Forgetting the final return makes a hit return undefined; the declared union return type may allow that, so behavioural tests matter. Reusing set does not grow the cache because the key already exists.

## Reference implementation

<details>
<summary>Completed generic class — open after an independent attempt</summary>

```ts
export type CacheEntry<K, V> = [key: K, value: V];

export class LruCache<K, V> {
    private readonly capacity: number;
    private static readonly DEFAULT_CAPACITY: number = 5;
    private cache: Map<K, V> = new Map<K, V>();

    constructor(capacity: number = LruCache.DEFAULT_CAPACITY) {
        this.capacity = Number.isSafeInteger(capacity) && capacity > 0
            ? capacity
            : LruCache.DEFAULT_CAPACITY;
    }

    public size(): number {
        return this.cache.size;
    }

    public getCapacity(): number {
        return this.capacity;
    }

    public entries(): CacheEntry<K, V>[] {
        return [...this.cache.entries()];
    }

    public set(key: K, value: V): void {
        this.cache.delete(key);
        this.cache.set(key, value);

        if (this.cache.size > this.capacity) {
            const oldestKey = this.cache.keys().next();
            if (!oldestKey.done) {
                this.cache.delete(oldestKey.value);
            }
        }
    }

    public get(key: K): V | undefined {
        if (!this.cache.has(key)) {
            return undefined;
        }

        const current = this.cache.get(key) as V;
        this.set(key, current);
        return current;
    }
}
```

Usage examples:

```ts
const prices = new LruCache<string, number>(2);
const flags = new LruCache<string, boolean>(2);
const optionalPrices = new LruCache<string, number | undefined>(2);
```

Explicit type arguments establish what future set calls accept. In a constructor call without key/value arguments, do not expect later calls to retroactively infer K and V.

</details>

## Test reference and lessons from assertions

Use test names that describe the behaviour actually exercised. Updating an already most-recent key checks replacement but does not alone prove a recency move. Update an older key, or observe the next eviction, to check that rule.

A default-capacity test must insert a sixth key: storing just five also passes for a cache incorrectly configured with capacity 100. A missing-key test should check returned undefined, unchanged order and unchanged size. Returning the right missing value alone would not catch unintended mutation.

Use `assert.deepEqual`, not `assert.deepEquals`. Match tuple-shaped entries in expected results. Use size() consistently, and keep logs/demonstration execution out of the imported class source.

<details>
<summary>Representative tests — open after writing your own</summary>

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { LruCache } from
    "../lessons/lesson-11-lru-cache/11-lru-cache.ts";

test("reading an entry protects it from the next eviction", () => {
    const cache = new LruCache<string, number>(2);
    cache.set("PRINT", 1200);
    cache.set("BOOK", 2000);
    assert.equal(cache.get("PRINT"), 1200);
    cache.set("CARD", 300);
    assert.deepEqual(cache.entries(), [["PRINT", 1200], ["CARD", 300]]);
    assert.equal(cache.size(), 2);
});

test("replaces a value at capacity without evicting another entry", () => {
    const cache = new LruCache<string, number>(2);
    cache.set("PRINT", 1200);
    cache.set("BOOK", 2000);
    cache.set("BOOK", 2001);
    cache.set("PRINT", 1500);
    assert.deepEqual(cache.entries(), [["BOOK", 2001], ["PRINT", 1500]]);
    assert.equal(cache.size(), 2);
});

test("reading a cached zero returns zero and refreshes recency", () => {
    const cache = new LruCache<string, number>(2);
    cache.set("PRINT", 0);
    cache.set("BOOK", 2000);
    assert.equal(cache.get("PRINT"), 0);
    assert.deepEqual(cache.entries(), [["BOOK", 2000], ["PRINT", 0]]);
});

test("a missing lookup leaves size and recency unchanged", () => {
    const cache = new LruCache<string, number>(2);
    cache.set("PRINT", 0);
    cache.set("BOOK", 2000);
    assert.equal(cache.get("MISSING_SKU"), undefined);
    assert.deepEqual(cache.entries(), [["PRINT", 0], ["BOOK", 2000]]);
    assert.equal(cache.size(), 2);
});

test("capacity one retains only the most recently inserted entry", () => {
    const cache = new LruCache<string, number>(1);
    cache.set("PRINT", 0);
    cache.set("BOOK", 2000);
    assert.equal(cache.get("PRINT"), undefined);
    assert.deepEqual(cache.entries(), [["BOOK", 2000]]);
    assert.equal(cache.size(), 1);
});

test("omitted capacity defaults to five entries", () => {
    const cache = new LruCache<string, number>();
    for (let index = 1; index <= 6; index++) {
        cache.set(`ITEM-${index}`, index);
    }
    assert.equal(cache.getCapacity(), 5);
    assert.equal(cache.size(), 5);
    assert.equal(cache.get("ITEM-1"), undefined);
    assert.deepEqual(cache.entries(), [
        ["ITEM-2", 2], ["ITEM-3", 3], ["ITEM-4", 4],
        ["ITEM-5", 5], ["ITEM-6", 6],
    ]);
});

for (const capacity of [0, -1, 2.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    test(`invalid capacity ${capacity} falls back to five entries`, () => {
        const cache = new LruCache<string, number>(capacity);
        for (let index = 1; index <= 6; index++) {
            cache.set(`ITEM-${index}`, index);
        }
        assert.equal(cache.getCapacity(), 5);
        assert.equal(cache.size(), 5);
        assert.deepEqual(cache.entries(), [
            ["ITEM-2", 2], ["ITEM-3", 3], ["ITEM-4", 4],
            ["ITEM-5", 5], ["ITEM-6", 6],
        ]);
    });
}

test("listing entries does not change recency", () => {
    const cache = new LruCache<string, number>(3);
    cache.set("PRINT", 1000);
    cache.set("BOOK", 2000);
    cache.set("CARD", 300);
    cache.entries();
    cache.set("POSTER", 800);
    assert.deepEqual(cache.entries(), [
        ["BOOK", 2000], ["CARD", 300], ["POSTER", 800],
    ]);
});

test("modifying the returned entries array does not change the cache", () => {
    const cache = new LruCache<string, number>(3);
    cache.set("PRINT", 1000);
    cache.set("BOOK", 2000);
    cache.set("CARD", 300);
    const entries = cache.entries();
    const firstEntry = entries[0];
    if (firstEntry === undefined) throw new Error("Expected an entry");
    firstEntry[1] = 999;
    entries[0] = ["REPLACEMENT", 500];
    entries.push(["EXTRA", 42]);
    assert.deepEqual(cache.entries(), [
        ["PRINT", 1000], ["BOOK", 2000], ["CARD", 300],
    ]);
});

test("reading a cached undefined refreshes recency", () => {
    const cache = new LruCache<string, number | undefined>(2);
    cache.set("PRINT", undefined);
    cache.set("BOOK", 2000);
    assert.equal(cache.get("PRINT"), undefined);
    cache.set("CARD", 300);
    assert.deepEqual(cache.entries(), [["PRINT", undefined], ["CARD", 300]]);
});

test("reading a cached false refreshes recency", () => {
    const cache = new LruCache<string, boolean>(2);
    cache.set("A", false);
    cache.set("B", true);
    assert.equal(cache.get("A"), false);
    cache.set("C", true);
    assert.deepEqual(cache.entries(), [["A", false], ["C", true]]);
});

test("evicts an undefined key when it is least recently used", () => {
    const cache = new LruCache<string | undefined, number>(1);
    cache.set(undefined, 10);
    cache.set("BOOK", 2000);
    assert.deepEqual(cache.entries(), [["BOOK", 2000]]);
    assert.equal(cache.size(), 1);
});
```

These are consolidated reference tests, including strengthened assertions suggested in the session. They should not be treated as a verbatim copy of every test in the learner's repository.

</details>

## Complexity and remaining limits

The cache stores at most capacity entries after each operation, so its storage is O(capacity). entries creates a snapshot and takes O(n) time and additional space for n stored entries. Each get/set uses a bounded number of Map operations rather than scanning all entries; do not infer a strict specification-level O(1) guarantee from that fact.

A high stream of one-use keys can displace useful entries even in an efficient implementation. That is a policy limitation of LRU, not a reason to avoid maintaining recency. This version has no TTL, external loading, concurrency coordination or memory-byte budget. Constructor fallback is forgiving but may conceal a configuration mistake; that trade-off was chosen deliberately for this exercise.

## Completion and verification record

The learner implemented the class and tests in the local academy project and reported completing the checks during the session. The reference below records the developed design; it is not an independently retrieved copy of the final local source or a fresh test run by the tutor.

- [x] Agreed and revised the reconstructed contract.
- [x] Implemented the string/number API, then generic K/V types.
- [x] Practised replacement, read/write recency, eviction and missing keys.
- [x] Added zero, false, stored undefined and undefined-key cases.
- [x] Added capacity fallback and entry-snapshot checks.
- [x] Discussed LRU versus FIFO, iterators, narrowing and ownership.
- [ ] Repeat the implementation from a brief without the reference solution.
- [ ] Add explicit initial-empty and getCapacity assertions if absent from the local suite.
- [ ] Verify all invalid-capacity cases in the matrix, including unsafe integers, if not already covered.

For the academy index, set Lesson 11 to **Complete — implemented and practised** and Lesson 12 to **Next — planned outline**. This lesson update does not modify an unseen local README.
