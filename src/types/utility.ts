export type GenericFunction<Props> = (props: Props) => any;

export type StringAutoComplete<T> = T | (string & {});

export type Needles<Props> = StringAutoComplete<keyof Props> | ((props: Props) => any) | Needles<Props>[] | object;
export type Needle<Props> = StringAutoComplete<keyof Props> | ((props: Props) => string);
