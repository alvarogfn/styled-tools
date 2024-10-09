import type { GenericFunction, StringAutoComplete } from "@/types/utility.js";

import { getProperty } from "@/helpers/get-property.js";
import { resolveValue } from "@/helpers/resolve-value.js";

/**
 * A utility function to retrieve a property value from a component's props
 * that deeply resolves each property in the path.
 * Returns the value of `props[path]` or `defaultValue`.
 * @template Props The type of the component's props.
 * @template Path The type of the path to the property in the props.
 * @param path The path to the property in the props. (Supports dot-notation for nested properties)
 * @param defaultValue The default value to return if the property is not found.
 * @example
 * import styled from "styled-components";
 * import { deepProp } from "styled-bettertools"; // or "styled-bettertools/deep-prop"
 *
 *
 * const Button = styled.button`
 *   color: ${deepProp("color.primary", "red")};
 * `;
 *
 * function App() {
 *   return <Button color={{ primary: () => "blue" }} />;
 * }
 *
 * @see {@link https://github.com/alvarogfn/styled-bettertools/blob/main/src/tools/prop/prop.ts prop}
 */
export function deepProp<Props, Path = StringAutoComplete<keyof Props>>(
  path: Path,
  defaultValue?: any,
): GenericFunction<Props> {
  return (props) => {
    const propsPath = path as keyof Props;

    if (typeof props[propsPath] !== "undefined") {
      return resolveValue(props[propsPath], props);
    }

    const object = getProperty(props, path as string);

    if (typeof object !== "undefined") {
      return resolveValue(object, props);
    }

    return defaultValue;
  };
}
