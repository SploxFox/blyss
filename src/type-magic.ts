interface Data {
    a: string,
    b: {
      c: {
        d: string
      },
      e: 1
    }
  }

type ValueOf<T> = T[keyof T];

type Shift<T extends Array<any>> 
= ((...a: T) => any) extends ((a: any, ...result: infer Result) => any) 
? Result 
  : never;

export type KeyStrings<TData> = ValueOf<{
  [K in keyof TData]: TData[K] extends object ? [K, ...KeyStrings<TData[K]>] | [K] : [K]
}> | []

type T10 = KeyStrings<Data>

// @ts-ignore
export type GetValue<TData, TKeys extends KeyStrings<TData>> = TKeys['length'] extends 0 ? TData : GetValue<TData[TKeys[0]], Shift<TKeys>>;

/*export type AtFnType<TData> = AtFnTypeImpl<TData>;

type AtFnTypeImpl<TData, TKeys = KeyStrings<TData>> = (...prop: TKeys) => */