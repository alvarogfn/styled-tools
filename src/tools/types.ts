export interface DefaultTheme {
  [key: string]: any;
}

export type StringAutoComplete<T> = T | (string & {});

export type Needle<Props> = StringAutoComplete<keyof Props> | ((props: Props) => any);

export type ComponentProps = object;

export type { Interpolation, StyleFunction } from "styled-components";

export type ComponentPropsWithTheme<Props extends ComponentProps> = Props & {
  theme: DefaultTheme;
};
