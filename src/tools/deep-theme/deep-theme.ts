import type { GenericFunction, StringAutoComplete } from "@/types/utility.js";

import { deepProp } from "@/tools/deep-prop/deep-prop.js";

/**
 * Same as `deepProp`, except that it returns `props.theme[path]` instead of
 * `props[path]`.
 * @example
 * import styled from "styled-components";
 * import type { Theme } from './theme';
 * import { deepTheme } from "styled-bettertools"; // or "styled-bettertools/deep-theme"
 *
 * // For example, if your theme is:
 * const defaultTheme = {
 *   button: () => ({ color: "blue" }),
 * }
 *
 * const Button = styled.button<object>`
 *  color: ${deepTheme<Theme>("button.color", "red")};
 * `;
 *
 * @template Theme - the type that represents your `DefaultTheme`. Set to receive path auto-complete from your editor.
 * @template Path - the type keys defined in `Theme`, override if you want to customize editor auto-complete.
 * @template Props - the type that represents the Props of your component
 * @param path - The path to the desired value within the theme object.
 * @param [defaultValue] - The default value to return if the path does not exist.
 */
export function deepTheme<
  Theme extends Props extends { theme: object } ? Props["theme"] : object,
  Path = StringAutoComplete<Theme>,
  Props = object,
>(path: Path, defaultValue?: unknown): GenericFunction<Props> {
  return (props) => {
    return deepProp(`theme.${path}`, defaultValue)(props);
  };
}
