import type {
  ComponentProps,
  ComponentPropsWithTheme,
  Interpolation,
  StringAutoComplete,
  StyleFunction,
} from "@/types/styled-types.js";
import type {} from "@/types/styled-types.js";

import { getProperty } from "dot-prop";

/**
 * Returns the value of `props[path]` or `defaultValue`
 * @example
 * import styled from "styled-components";
 * import { prop } from "styled-bettertools";
 *
 * const Button = styled.button`
 *   color: ${prop("color", "red")};
 * `;
 */

/**
 * A utility function to retrieve a property value from a component's props.
 * Returns the value of `props[path]` or `defaultValue`.
 *
 * @example
 * import styled from "styled-components";
 * import { prop } from "styled-bettertools";
 *
 * const Button = styled.button`
 *   color: ${prop("color.primary", "red")};
 * `;
 *
 * @template Props - The type of the component's props.
 * @template Path - The type of the path to the property in the props.
 * @param path - The path to the property in the props. (Supports dot-notation for nested properties)
 * @param [defaultValue] - The default value to return if the property is not found.
 * @returns A function that takes the component's props and returns the property value or the default value.
 */
export function prop<Props extends ComponentProps, Path = StringAutoComplete<keyof Props>>(
  path: Path,
  defaultValue?: unknown,
): StyleFunction<Props> {
  return (props: ComponentPropsWithTheme<Props>) => {
    return getProperty(props, String(path), defaultValue) as Interpolation<Props>;
  };
}
