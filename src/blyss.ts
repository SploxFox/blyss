import { Store } from "./store";
import { GetValue, KeyStrings } from "./type-magic";
import { clone } from "./utils/clone";

interface BlyssProps<TData> {
    data: TData
}

export class Blyss<TData, TPos extends KeyStrings<TData>> {
    private constructor(private store: Store<TData>, private pos: TPos) {

    }

    // @ts-ignore
    static create(props?: Partial<BlyssProps<{}>>): Blyss<{}, []>
    static create<TData>(props: BlyssProps<TData>): Blyss<TData, []>
    static create<TData>(props?: Partial<BlyssProps<TData>>) {
        return new Blyss<TData, []>(Store.from<TData>(props?.data ?? {} as any), []);

    }

    clone() {
        return new Blyss<TData, TPos>(this.store, (this.pos as any).slice() as TPos);
    }

    // @ts-ignore
    at<TKeyStrings extends KeyStrings<TData> = KeyStrings<TData>>(...pos: TKeyStrings) {
        const newBlyss = this.clone();

        // @ts-ignore
        newBlyss.pos.push(...pos);

        // @ts-ignore
        return newBlyss as Blyss<TData, [...TPos, ...TKeyStrings]>;
    }

    get() {
        return clone(this.store.get<TPos>(this.pos));
    }

    set(value: TData) {

    }
}