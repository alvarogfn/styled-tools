export interface DefaultTheme {
  [key: string]: unknown;
}

export type StringAutoComplete<T> = T | (string & {});

export type AnyFunction<Props = object, Return = unknown> = (props: Props) => Return;

export type Needle<Props> = StringAutoComplete<keyof Props> | ((props: Props) => unknown);

export type ComponentProps = object;

export type { Interpolation, StyleFunction } from "styled-components";

export type ComponentPropsWithTheme<Props extends ComponentProps> = Props & {
  theme: DefaultTheme;
};
