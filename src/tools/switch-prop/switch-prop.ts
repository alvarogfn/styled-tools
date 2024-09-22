import type {
  ComponentProps,
  ComponentPropsWithTheme,
  Interpolation,
  Needle,
  StyleFunction,
} from "@/types/styled-types.js";

import type { Cases } from "./types.js";

import { prop } from "../prop/prop.js";

/**
 * Switches on a given prop. Returns the value or function for a given prop value. Third parameter is default value.
 * @example
 * import styled, { css } from "styled-components";
 * import { switchProp, prop } from "styled-bettertools";
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
 *
 * <Button size="large" theme={{ kind: "light" }} />
 */
export function switchProp<Props extends ComponentProps>(
  needle: Needle<Props>,
  cases: Cases<Props>,
  defaultCase?: Interpolation<Props>,
): StyleFunction<Props> {
  return (props: ComponentPropsWithTheme<Props>) => {
    const value = typeof needle === "function" ? needle(props) : prop(String(needle))(props);

    const finalCases = typeof cases === "function" ? cases(props) : cases;

    if ((value as string) in finalCases) {
      return finalCases[value as string];
    }

    return defaultCase;
  };
}
