import { getProperty } from "dot-prop";
import { ComponentProps, ComponentPropsWithTheme, StringAutoComplete, StyleFunction } from "@/styled-tools/types";

/**
 * Returns the value of `props[path]` or `defaultValue`
 * @example
 * import styled from "styled-components";
 * import { prop } from "styled-tools";
 *
 * const Button = styled.button`
 *   color: ${prop("color", "red")};
 * `;
 */
export function prop<Props extends ComponentProps, Path = StringAutoComplete<keyof Props>>(
  path: Path,
  defaultValue?: unknown,
): StyleFunction<Props> {
  return (props: ComponentPropsWithTheme<Props>) => {
    return getProperty(props, String(path), defaultValue) as any;
  };
}
