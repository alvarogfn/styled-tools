import type { GenericFunction, Needles } from "@/types/utility.js";

import { prop } from "../prop/prop.js";
import { parseObject } from "./utils.js";

/**
 * Calls a function passing properties values as arguments.
 * @example
 * // example with polished
 * import styled from "styled-components";
 * import { darken } from "polished";
 * import { withProp, prop } from "styled-bettertools"; // or "styled-bettertools/with-prop";
 *
 * const Button = styled.button`
 *   border-color: ${withProp(prop("theme.primaryColor", "blue"), darken(0.5))};
 *   font-size: ${withProp("theme.size", size => `${size + 1}px`)};
 *   background: ${withProp(["foo", "bar"], (foo, bar) => `${foo}${bar}`)};
 * `;
 */
export function withProp<Props, Interpolation>(
  needles: Needles<Props>,
  fn: (...args: any[]) => Interpolation,
): GenericFunction<Props> {
  return (props: Props) => {
    if (Array.isArray(needles)) {
      const results = needles.map((arg) => withProp<Props, Interpolation>(arg, (x) => x)(props));
      return fn(...results);
    }

    if (typeof needles === "function") {
      return fn(needles(props));
    }

    if (typeof needles === "object") {
      return fn(parseObject(needles, props));
    }

    return fn(prop(String(needles))(props));
  };
}
