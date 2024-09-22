import type {
  ComponentProps,
  ComponentPropsWithTheme,
  StringAutoComplete,
  StyleFunction,
} from "@/types/styled-types.js";

import { prop } from "../prop/prop.js";

/**
 * Same as `prop`, except that it returns `props.theme[path]` instead of
 * `props[path]`.
 * @example
 * import styled from "styled-components";
 * import { theme } from "styled-bettertools";
 *
 * const Button = styled.button`
 *  color: ${theme("button.color", "red")};
 * `;
 */
export function theme<Props extends ComponentProps, Path = StringAutoComplete<keyof Props>>(
  path: Path,
  defaultValue?: unknown,
): StyleFunction<Props> {
  return (props: ComponentPropsWithTheme<Props>) => {
    return prop<Props, Path>(path, defaultValue)(props.theme as ComponentPropsWithTheme<Props>);
  };
}
