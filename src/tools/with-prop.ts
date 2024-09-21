import { prop } from "./prop";
import { ComponentProps, ComponentPropsWithTheme, Needle } from "./types";
import { Interpolation, StyleFunction } from "styled-components";

type CallbackFunction<Props extends ComponentProps, CallbackArgs extends Array<any>> = (
  ...args: [...CallbackArgs]
) => Interpolation<Props>;

/**
 * Calls a function passing properties values as arguments.
 * @example
 * // example with polished
 * import styled from "styled-components";
 * import { darken } from "polished";
 * import { withProp, prop } from "styled-tools";
 *
 * const Button = styled.button`
 *   border-color: ${withProp(prop("theme.primaryColor", "blue"), darken(0.5))};
 *   font-size: ${withProp("theme.size", size => `${size + 1}px`)};
 *   background: ${withProp(["foo", "bar"], (foo, bar) => `${foo}${bar}`)};
 * `;
 */
export function withProp<Props extends ComponentProps, CallbackArgs extends Array<any>>(
  needle: Needle<Props> | Needle<Props>[],
  fn: CallbackFunction<Props, CallbackArgs>,
): StyleFunction<Props> {
  return (props: ComponentPropsWithTheme<Props>) => {
    if (Array.isArray(needle)) {
      // @ts-expect-error - TS doesn't support variadic tuple types
      const needles = needle.map((arg) => withProp<Props, CallbackArgs>(arg, (x) => x)(props));
      return fn(...(needles as CallbackArgs));
    }
    if (typeof needle === "function") {
      return fn(...([needle(props)] as CallbackArgs));
    }
    return fn(...([prop(String(needle))(props)] as CallbackArgs));
  };
}
