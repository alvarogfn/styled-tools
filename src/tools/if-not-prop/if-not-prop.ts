import { ifProp } from "./if-prop";
import { ComponentProps, Needle } from "./types";
import { Interpolation, StyleFunction } from "styled-components";

/**
 * Returns `pass` if prop is falsy. Otherwise returns `fail`
 * @example
 * import styled from "styled-components";
 * import { ifNotProp } from "styled-tools";
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
