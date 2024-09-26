import type { GenericFunction, Needle } from "@/types/styled-types.js";

import { prop } from "../prop/prop.js";

export type SwitchPropCases<Props, Interpolation> =
  | { [key: string]: Interpolation }
  | ((props: Props) => { [key: string]: Interpolation });

/**
 * Switches on a given prop. Returns the value or function for a given prop value. Third parameter is default value.
 * @template Props The type of the component props object.
 * @param needle The function that will resolve the key of `cases`.
 * @param cases An object mapping prop values to their corresponding values or functions.
 * @param defaultCase The value that will be returned if no case property is found.
 * @example
 * import styled, { css } from "styled-components";
 * import { switchProp, prop } from "styled-bettertools" // or "styled-bettertools/switch-prop";
 *
 * const Button = styled.button`
 *   font-size: ${switchProp(prop("size", "medium"), {
 *     small: prop("theme.sizes.sm", "12px"),
 *     medium: prop("theme.sizes.md", "16px"),
 *     large: prop("theme.sizes.lg", "20px")
 *   }, prop("theme.sizes.md", "16px"))};
 *   ${switchProp("theme.kind", {
 *     light: css`
 *       color: LightBlue;
 *     `,
 *     dark: css`
 *       color: DarkBlue;
 *     `
 *   }, css`color: black;`)}
 * `;
 */
export function switchProp<Props, Interpolation>(
  needle: Needle<Props>,
  cases: SwitchPropCases<Props, Interpolation>,
  defaultCase?: Interpolation,
): GenericFunction<Props> {
  return (props: Props) => {
    const value: string = typeof needle === "function" ? needle(props) : prop<Props>(String(needle))(props);

    const finalCases = typeof cases === "function" ? cases(props) : cases;

    if (value in finalCases) {
      return finalCases[value];
    }

    return defaultCase;
  };
}
