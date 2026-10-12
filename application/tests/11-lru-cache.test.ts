import test from "node:test";
import assert from "node:assert/strict";

import { LruCache } from "../lessons/lesson-11/11-lru-cache.ts";

test (
    "reading an entry protects it from the next eviction",
    () => {
        const cache = new LruCache<string, number>(2);
        cache.set("PRINT", 1200);
        cache.set("BOOK", 2000);
        assert.equal(
            cache.get("PRINT"),
            1200
        );

        cache.set("CARD", 300);

        assert.deepEqual(
            cache.entries(),
            [
                ["PRINT", 1200],
                ["CARD", 300]
            ]
        )
        assert.equal(
            cache.size(),
            2
        );
    }
)

test (
    "updating an existing entry refreshes recency without eviction",
    () => {
        const cache = new LruCache<string, number>(2);
        cache.set("PRINT", 1200);
        cache.set("BOOK", 2000);
        cache.set("CARD", 300);
        cache.set("BOOK", 2001);

        assert.deepEqual(
            cache.entries(),
            [
                ["CARD", 300],
                ["BOOK", 2001]
            ]
        )

        assert.equal(cache.size(), 2);
    }
)

test (
    "replaces a value at capacity without evicting another entry",
    () => {
        const cache = new LruCache<string, number>(2);
        cache.set("PRINT", 1200);
        cache.set("BOOK", 2000);
        cache.set("BOOK", 2001);
        cache.set("PRINT", 1500);

        assert.deepEqual(
            cache.entries(),
            [
                ["BOOK", 2001],
                ["PRINT", 1500]
            ]
        )

        assert.equal(cache.size(), 2);
    }
)

test (
    "reading a cached zero returns zero and refreshes recency",
    () => {
        const cache = new LruCache<string, number>(2);
        cache.set("PRINT", 0);
        cache.set("BOOK", 2000);

        assert.equal(
            cache.get("PRINT"),
            0
        );

        assert.deepEqual(
            cache.entries(),
            [
                ["BOOK", 2000],
                ["PRINT", 0]
            ]
        )
    }
)

test (
    "a missing lookup leaves size and recency unchanged",
    () => {
        const cache = new LruCache<string, number>(2);
        cache.set("PRINT", 0);
        cache.set("BOOK", 2000);

        assert.equal(
            cache.get("MISSING_SKU"),
            undefined
        )
        assert.deepEqual(
            cache.entries(),
            [
                ["PRINT", 0],
                ["BOOK", 2000],
            ]
        )
        assert.equal(cache.size(), 2);
    }
)

test (
    "capacity one retains only the most recently inserted entry",
    () => {
        const cache = new LruCache<string, number>(1);
        cache.set("PRINT", 0);
        cache.set("BOOK", 2000);

        assert.equal(
            cache.get("PRINT"),
            undefined
        )
        assert.deepEqual(
            cache.entries(),
            [
                ["BOOK", 2000],
            ]
        )
        assert.equal(cache.size(), 1);
    }
);

test (
    "omitted capacity defaults to five entries",
    () => {
        const cache = new LruCache<string, number>(-1);
        cache.set("PRINT", 1000);
        cache.set("BOOK", 2000);
        cache.set("CARD", 300);
        cache.set("ORIGINAL", 300);
        cache.set("STICKER", 150);
        cache.set("POSTER", 800);

        assert.equal(
            cache.size(),
            5
        )
        assert.equal(cache.get("PRINT"), undefined);

        assert.deepEqual(cache.entries(), [
            ["BOOK", 2000],
            ["CARD", 300],
            ["ORIGINAL", 300],
            ["STICKER", 150],
            ["POSTER", 800],
        ]);
    }
)

test (
    "invalid capacity value -1 defaults to five entries",
    () => {
        const cache = new LruCache<string, number>(-1);
        cache.set("PRINT", 1000);
        cache.set("BOOK", 2000);
        cache.set("CARD", 300);
        cache.set("ORIGINAL", 300);
        cache.set("STICKER", 150);
        cache.set("POSTER", 800);

        assert.equal(
            cache.size(),
            5
        )

        assert.equal(cache.get("PRINT"), undefined);

        assert.deepEqual(cache.entries(), [
            ["BOOK", 2000],
            ["CARD", 300],
            ["ORIGINAL", 300],
            ["STICKER", 150],
            ["POSTER", 800],
        ]);
    }
)

test (
    "invalid capacity value 0 defaults to five entries",
    () => {
        const cache = new LruCache<string, number>(0);
        cache.set("PRINT", 1000);
        cache.set("BOOK", 2000);
        cache.set("CARD", 300);
        cache.set("ORIGINAL", 300);
        cache.set("STICKER", 150);
        cache.set("POSTER", 800);

        assert.equal(
            cache.size(),
            5
        )

        assert.equal(cache.get("PRINT"), undefined);

        assert.deepEqual(cache.entries(), [
            ["BOOK", 2000],
            ["CARD", 300],
            ["ORIGINAL", 300],
            ["STICKER", 150],
            ["POSTER", 800],
        ]);
    }
)

test (
    "invalid capacity value 2.5 defaults to five entries",
    () => {
        const cache = new LruCache<string, number>(2.5);
        cache.set("PRINT", 1000);
        cache.set("BOOK", 2000);
        cache.set("CARD", 300);
        cache.set("ORIGINAL", 300);
        cache.set("STICKER", 150);
        cache.set("POSTER", 800);

        assert.equal(
            cache.size(),
            5
        )

        assert.equal(cache.get("PRINT"), undefined);

        assert.deepEqual(cache.entries(), [
            ["BOOK", 2000],
            ["CARD", 300],
            ["ORIGINAL", 300],
            ["STICKER", 150],
            ["POSTER", 800],
        ]);
    }
)

test (
    "listing entries does not change recency",
    () => {
        const cache = new LruCache<string, number>(3);
        cache.set("PRINT", 1000);
        cache.set("BOOK", 2000);
        cache.set("CARD", 300);
        cache.entries();
        cache.set("POSTER", 800);

        assert.deepEqual(cache.entries(), [

            ["BOOK", 2000],
            ["CARD", 300],
            ["POSTER", 800],
        ]);
    }
)

test (
    "modifying the returned entries array does not change the cache",
    () => {
        const cache = new LruCache<string, number>(3);
        cache.set("PRINT", 1000);
        cache.set("BOOK", 2000);
        cache.set("CARD", 300);

        const entries = cache.entries();

        entries[0] = ["PRINT", 500];

        const firstEntry = entries[0];

        if (firstEntry === undefined) {
            throw new Error("Expected an entry");
        }

        firstEntry[1] = 999;
        entries.push(["EXTRA", 42]);

        assert.deepEqual(cache.entries(), [
            ["PRINT", 1000],
            ["BOOK", 2000],
            ["CARD", 300],
        ]);
    }
)

test (
    "reading a cached undefined refreshes recency",
    () => {
        const cache = new LruCache<string, number | undefined>(2);

        cache.set("PRINT", undefined);
        cache.set("BOOK", 2000);

        assert.equal(cache.get("PRINT"), undefined);

        cache.set("CARD", 300);

        assert.deepEqual(cache.entries(), [
            ["PRINT", undefined],
            ["CARD", 300],
        ]);
    }
)

test (
    "reading a cached false refreshes recency",
    () => {
        const cache = new LruCache<string, boolean>(2);

        cache.set("A", false);
        cache.set("B", true);

        assert.equal(cache.get("A"), false);

        cache.set("C", true);

        assert.deepEqual(cache.entries(), [
            ["A", false],
            ["C", true],
        ]);
    }
)

test (
    "reading a cached false refreshes recency",
    () => {
        const cache = new LruCache<string | undefined, number>(1);

        cache.set(undefined, 10);
        cache.set("BOOK", 2000);

        assert.deepEqual(cache.entries(), [
            ["BOOK", 2000],
        ]);

        assert.equal(cache.size(), 1);
    }
)