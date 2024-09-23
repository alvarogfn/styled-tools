import type { ComponentProps, ComponentPropsWithTheme } from "@/types/styled-types.js";

export type ComponentPropsWithPalette<Props extends ComponentProps> = ComponentPropsWithTheme<Props> & {
  palette?: { [key: string]: unknown };
  theme: {
    palette?: { [key: string]: unknown };
    tone?: number;
  };
  tone?: number;
};
