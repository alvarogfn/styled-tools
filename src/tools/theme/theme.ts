import type { GenericFunction, StringAutoComplete } from "@/types/utility.js";

import { prop } from "../prop/prop.js";

type ThemeProperty<Theme> = { theme: Theme };

/**
 * Same as `prop`, except that it returns `props.theme[path]` instead of
 * `props[path]`.
 * @example
 * import styled from "styled-components";
 * import type { Theme } from './theme';
 * import { theme } from "styled-bettertools";
 *
 * const Button = styled.button<object>`
 *  color: ${theme("button.color", "red")};
 *  color: ${theme<Theme>("button", "red")};
 * `;
 *
 * @template Theme - the type that represents your `DefaultTheme`. Set to receive path auto-complete from your editor.
 * @template Path - the type keys defined in `Theme`, override if you want to customize editor auto-complete.
 * @template Props - the type that represents the Props of your component
 * @param path - The path to the desired value within the theme object.
 * @param [defaultValue] - The default value to return if the path does not exist.
 */
export function theme<
  Theme extends Props extends { theme: object } ? Props["theme"] : object,
  Path = StringAutoComplete<keyof Theme>,
  Props = object,
>(path: Path, defaultValue?: unknown): GenericFunction<Props> {
  return (props: Props) => {
    const { theme } = Object.assign({ theme: {} } as ThemeProperty<Theme>, props);

    return prop<Theme, Path>(path, defaultValue)(theme);
  };
}
