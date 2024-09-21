import type { ComponentProps, Interpolation } from "@/shared/types.js";

export type Cases<Props extends ComponentProps> =
  | { [key: string]: Interpolation<Props> }
  | ((props: Props) => { [key: string]: Interpolation<Props> });
