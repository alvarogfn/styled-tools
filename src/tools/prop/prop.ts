import type { GenericFunction, StringAutoComplete } from "@/types/utility.js";

import { getProperty } from "dot-prop";

/**
 * A utility function to retrieve a property value from a component's props.
 * Returns the value of `props[path]` or `defaultValue`.
 * @template Props The type of the component's props.
 * @template Path The type of the path to the property in the props.
 * @param path The path to the property in the props. (Supports dot-notation for nested properties)
 * @param defaultValue The default value to return if the property is not found.
 * @example
 * import styled from "styled-components";
 * import { prop } from "styled-bettertools"; // or "styled-bettertools/prop"
 *
 *
 * const Button = styled.button`
 *   color: ${prop("color.primary", "red")};
 * `;
 */
export function prop<Props, Path = StringAutoComplete<keyof Props>>(
  path: Path,
  defaultValue?: unknown,
): GenericFunction<Props> {
  return (props: Props) => {
    return getProperty(props, String(path), defaultValue);
  };
}
