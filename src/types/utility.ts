import type { Paths } from "type-fest";

export type GenericFunction<Props> = (props: Props) => any;

export type StringAutoComplete<T> = Paths<T> | (string & {});

export type Needles<Props> = StringAutoComplete<Props> | ((props: Props) => any) | Needles<Props>[] | object;
export type Needle<Props> = StringAutoComplete<Props> | ((props: Props) => string);
