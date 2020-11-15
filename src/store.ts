import { GetValue, KeyStrings } from "./type-magic";

interface Listeners<TVal = any> {
    onChange: ((val: TVal) => void)[]
}

interface ListenerNode {
    children?: {[index: string]: ListenerNode}
    listeners?: Listeners<any>
    transactionActive?: boolean
}

export class Store<TData> {
    data: TData;
    listeners: ListenerNode = {};

    private constructor(data: TData) {
        this.data = data;
    }

    static from<TData>(data: TData) {
        return new Store<TData>(data);
    }

    get<TPos extends KeyStrings<TData>>(pos: TPos): GetValue<TData, TPos> {
        let val = this.data;

        let i = 0;
        for (const key of pos as any) {
            try {
                val = (val as any)[key];
            } catch (e) {
                console.error(`The error below happened while evaluating ${key} of ${(pos as string[]).slice(0, i).join('.')}`);
                throw e;
            }

            i++;
        }

        return val as any;
    }

    set<TPos extends KeyStrings<TData>, TVal extends GetValue<TData, TPos>>(pos: TPos, val: TVal) {

    }

    private getListener(pos: string[]) {
        let val = this.listeners;

        for (const key of pos) {
            if (!val.children) {
                val.children = {};
            }

            val = val.children[key];
        }

        return val;
    }

    private sendUpdates(pos: string[]) {
        const pos2 = pos.slice();

        while (pos2.length >= 0) {
            const node = this.getListener(pos2);
            if (node.transactionActive) {
                break;
            }

            node.transactionActive = true;

            this.sendUpdateOneNode(node, (this.get as any)(pos2));

            delete node.transactionActive;

            pos2.pop();
        }
    }

    private sendUpdateOneNode(node: ListenerNode, val: any) {
        if (node.listeners?.onChange) {
            for (const listener of node.listeners.onChange) {
                listener(val);
            }
        }
    }

    attachListener(pos: string[], type: keyof Listeners, fn: (...args: any) => any) {
        let node = this.listeners;
        for (const key of pos) {
            if (!node.children) {
                node.children = {};
            }

            if (!node.children[key]) {
                node.children[key] = {}
            }

            node = node.children[key];
        }

        if (!node.listeners) {
            node.listeners = { onChange: [] };
        }

        node.listeners[type].push(fn);
    }
}