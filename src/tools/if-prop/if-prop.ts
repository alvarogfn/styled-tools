import type {
  AnyFunction,
  ComponentProps,
  ComponentPropsWithTheme,
  Interpolation,
  Needle,
  StyleFunction,
} from "@/shared/types.js";

import { prop } from "../prop/prop.js";

function parseFunction<Props, Function extends AnyFunction<Props>>(props: Props, test: Function): boolean {
  return Boolean(test(props));
}

function parseObject<Props extends ComponentProps>(props: ComponentPropsWithTheme<Props>, test: object): boolean {
  return Object.entries(test).every(([key, value]) => {
    const propValue = prop(key)(props);
    if (typeof value === "function") {
      return value(propValue);
    }
    return propValue === value;
  });
}

function parseString<Props extends ComponentProps>(props: ComponentPropsWithTheme<Props>, test: string): boolean {
  return Boolean(prop(test)(props));
}

type ParseMapKey = "function" | "object" | "string";

const parseMap: Record<ParseMapKey, Function> = {
  function: parseFunction,
  object: parseObject,
  string: parseString,
};

/**
 * Returns `pass` if prop is truthy. Otherwise returns `fail`
 * @example
 * import styled from "styled-components";
 * import { ifProp, palette } from "styled-bettertools";
 *
 * const Button = styled.button`
 *   background-color: ${ifProp("transparent", "transparent", palette(0))};
 *   color: ${ifProp(["transparent", "accent"], palette("secondary"))};
 *   font-size: ${ifProp({ size: "large" }, "20px", ifProp({ size: "medium" }, "16px", "12px"))};
 * `;
 */
export function ifProp<Props extends ComponentProps>(
  test: Needle<Props> | Needle<Props>[] | object,
  pass: Interpolation<Props> = "",
  fail: Interpolation<Props> = "",
): StyleFunction<Props> {
  return (props: ComponentPropsWithTheme<Props>) => {
    let result: boolean;

    if (Array.isArray(test)) {
      result = test.every((item: Needle<Props>) => {
        return parseMap[typeof item as ParseMapKey](props, item);
      });
    } else {
      result = parseMap[typeof test as ParseMapKey](props, test);
    }

    const value = result ? pass : fail;
    return typeof value === "function" ? value(props) : value;
  };
}
