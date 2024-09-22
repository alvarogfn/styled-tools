import type { ComponentProps } from "@/types/styled-types.js";
import type { Interpolation } from "@/types/styled-types.js";

export type Cases<Props extends ComponentProps> =
  | { [key: string]: Interpolation<Props> }
  | ((props: Props) => { [key: string]: Interpolation<Props> });
