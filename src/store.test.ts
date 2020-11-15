import { Store } from "./store";

const data = { a: 'hi', b: { c: { d: 1 }}};

const store = Store.from(data)

describe('Store methods', () => {
    test('get', () => {
        expect(store.get([])).toBe(data);
        expect(store.get(['a'])).toBe(data.a);
        expect(store.get(['b'])).toBe(data.b);
        expect(store.get(['b', 'c', 'd'])).toBe(data.b.c.d);
    });
});