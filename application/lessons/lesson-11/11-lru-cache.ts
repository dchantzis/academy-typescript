export type CacheEntry<K, V> = [key: K, value: V];

export class LruCache<K, V> {
    private readonly capacity: number;
    private static readonly DEFAULT_CAPACITY: number = 5;

    private cache: Map<K, V> = new Map<K, V>();

    constructor(
        capacity: number = LruCache.DEFAULT_CAPACITY,
    ) {
        this.capacity = (Number.isSafeInteger(capacity) && capacity > 0)
            ? capacity
            : LruCache.DEFAULT_CAPACITY;
    }

    public size(): number
    {
        return this.cache.size;
    }

    public getCapacity(): number
    {
        return this.capacity;
    }

    public entries(): CacheEntry<K, V>[]
    {
        return [
            ...this.cache.entries(),
        ]
    }

    public set(
        key: K,
        value: V
    ): void {
        this.cache.delete(key);
        this.cache.set(key, value);

        if (this.cache.size > this.capacity) {
            const oldestKey = this.cache.keys().next();

            if (!oldestKey.done) {
                this.cache.delete(oldestKey.value);
            }
        }
    }

    public get(key: K): V|undefined {

        if (!this.cache.has(key)) {
            return undefined
        }

        const current = this.cache.get(key) as V;

        this.set(key, current);

        return current;
    }
}