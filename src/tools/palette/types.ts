import type { ComponentProps, ComponentPropsWithTheme } from "@/shared/types.js";

export type ComponentPropsWithPalette<Props extends ComponentProps> = ComponentPropsWithTheme<Props> & {
  palette?: { [key: string]: unknown };
  tone?: number;
};
