import { Blyss } from "./blyss"

interface FooData {
    a: string,
    b: {
        c: {
            d: number
        },
        e: 'bar'
    }
}

const data = {
    a: 'myString',
    b: {
        c: {
            d: 1
        },
        e: 'bar'
    }
} as const;

const blyss = Blyss.create<FooData>({ data });

test('Clone', () => {
    const clone = blyss.clone();

    expect(blyss).toMatchObject(clone);
    expect(blyss).not.toBe(clone);
});

test('At', () => {
    const clone = blyss.clone();

    const afterAt = blyss.at('b', 'c');

    // Check that its not mutating the main object.
    expect(blyss).toMatchObject(clone);
    expect(afterAt).not.toBe(blyss);
})

test('Basics', () => {
    expect(blyss.at('b').get()).toMatchObject(data.b);
    expect(blyss.at('a').get()).toBe(data.a);
});

test('Nested', () => {
    console.log(blyss);
    expect(blyss.at('b', 'c', 'd').get()).toBe(data.b.c.d);
})