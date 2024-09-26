export type DefaultTheme = {
  [key: string]: unknown;
};

export type GenericFunction<Props> = (props: Props) => any;

export type StringAutoComplete<T> = T | (string & {});

export type AnyFunction<Props = object, Return = unknown> = (props: Props) => Return;

export type Needle<Props> = StringAutoComplete<keyof Props> | ((props: Props) => unknown);

export type ComponentProps = object;

export type ComponentPropsWithTheme<Props extends ComponentProps> = Props & {
  theme: DefaultTheme;
};

import type { Properties, Pseudos } from "csstype";

type StyledObject<Props extends object = object> = Properties &
  Pseudos & {
    [key: string]: StyledObject<Props> | string | number | StyleFunction<Props> | Interpolation<Props>[] | undefined;
  };

export type StyleFunction<Props extends object> = (props: ComponentPropsWithTheme<Props>) => Interpolation<Props>;

export type Interpolation<Props extends object> =
  | StyleFunction<Props>
  | StyledObject<Props>
  | TemplateStringsArray
  | string
  | number
  | false
  | undefined
  | null
  | Interpolation<Props>[];
