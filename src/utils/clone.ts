import cloneDeep from 'clone-deep';

/*export function clone<T>(a: T): T {
    if (typeof a === 'object') {
        const newObj = Object.create(null);
        for (const key in a) {
            if (key === '__proto__') {
                // Preventing prototype pollution.
                continue;
            }

            newObj[key] = clone(a[key]);
        }
        return newObj;
    } else {
        return a;
    }
}*/

export function clone<T>(a: T): T {
    return cloneDeep(a);
}