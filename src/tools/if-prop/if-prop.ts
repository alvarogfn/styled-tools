import type { GenericFunction, Needles } from "@/types/utility.js";

import { evaluateNeedles } from "@/helpers/evaluate-needles.js";

/**
 * Returns `pass` if prop is truthy. Otherwise returns `fail`
 * @template Props The type of the component props.
 * @param test the needles that will define whether the test passed or failed
 * @param pass The value to return or execute if the test is truthy.
 * @param fail The value to return or execute if the test is falsy.
 *
 * @example
 * import styled from "styled-components";
 * import { ifProp, palette } from "styled-bettertools"; // or "styled-bettertools/if-prop"
 *
 * const Button = styled.button`
 *   background-color: ${ifProp("transparent", "transparent", palette(0))};
 *   color: ${ifProp(["transparent", "accent"], palette("secondary"))};
 *   font-size: ${ifProp({ size: "large" }, "20px", ifProp({ size: "medium" }, "16px", "12px"))};
 * `;
 */
export function ifProp<Props, Pass, Fail>(
  test: Needles<Props>,
  pass: Pass | string = "",
  fail: Fail | string = "",
): GenericFunction<Props> {
  return (props: Props): Pass | Fail | string => {
    const result = evaluateNeedles(test, props);

    const value = result ? pass : fail;

    if (typeof value === "function") {
      return value.call(null, props);
    }

    return value;
  };
}
