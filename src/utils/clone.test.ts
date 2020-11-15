import { clone } from "./clone"

test('Clone function', () => {
    const objs = [
        1,
        'abc',
        ['a', 2, 3, 'd'],
        { c: 'foo' }
    ]

    for (const obj of objs) {
        if (typeof obj === 'object') {
            expect(clone(obj)).toMatchObject(obj);
        } else {
            expect(clone(obj)).toBe(obj);
        }
    }
})