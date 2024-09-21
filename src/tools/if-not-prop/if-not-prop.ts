import type { Interpolation, StyleFunction } from "styled-components";

import type { ComponentProps, Needle } from "../../shared/types.js";

import { ifProp } from "../if-prop/if-prop.js";

/**
 * Returns `pass` if prop is falsy. Otherwise returns `fail`
 * @example
 * import styled from "styled-components";
 * import { ifNotProp } from "styled-bettertools";
 *
 * const Button = styled.button`
 *   font-size: ${ifNotProp("large", "20px", "30px")};
 * `;
 */
export function ifNotProp<Props extends ComponentProps>(
  test: Needle<Props> | Needle<Props>[] | object,
  pass?: Interpolation<Props>,
  fail?: Interpolation<Props>,
): StyleFunction<Props> {
  return ifProp<Props>(test, fail, pass);
}
