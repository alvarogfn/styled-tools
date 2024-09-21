import { prop } from "./prop";
import type { ComponentProps, ComponentPropsWithTheme, Needle } from "./types";
import { Interpolation, StyleFunction } from "styled-components";

type Cases<Props extends ComponentProps> =
  | { [key: string]: Interpolation<Props> }
  | ((props: Props) => { [key: string]: Interpolation<Props> });

/**
 * Switches on a given prop. Returns the value or function for a given prop value. Third parameter is default value.
 * @example
 * import styled, { css } from "styled-components";
 * import { switchProp, prop } from "styled-tools";
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

    if (value in finalCases) {
      return finalCases[value];
    }

    return defaultCase;
  };
}
