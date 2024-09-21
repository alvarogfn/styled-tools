import { prop } from "./prop";
import type { ComponentProps, ComponentPropsWithTheme } from "./types";
import { StyleFunction } from "styled-components";

/**
 * Same as `prop`, except that it returns `props.theme[path]` instead of
 * `props[path]`.
 * @example
 * import styled from "styled-components";
 * import { theme } from "styled-tools";
 *
 * const Button = styled.button`
 *  color: ${theme("button.color", "red")};
 * `;
 */
function theme<Props extends ComponentProps>(path: string, defaultValue?: any): StyleFunction<Props> {
  return (props: ComponentPropsWithTheme<Props>) => {
    return prop<Props>(path, defaultValue)(props.theme as ComponentPropsWithTheme<Props>);
  };
}

export default theme;
