import type { GenericFunction, Needles } from "@/types/utility.js";

import { prop } from "@/tools/prop/prop.js";

function parseFunction<Props, Function extends GenericFunction<Props>>(props: Props, test: Function): boolean {
  return Boolean(test(props));
}

function parseString<Props>(props: Props, test: string): boolean {
  return Boolean(prop(test)(props));
}

function parseObject<Props>(props: Props, test: object): boolean {
  return Object.entries(test).every(([key, value]) => {
    const propValue = prop(key)(props);
    if (typeof value === "function") {
      return value(propValue);
    }
    return propValue === value;
  });
}

function resolver<Props>(test: any, props: Props) {
  switch (typeof test) {
    case "object": {
      return parseObject(props, test);
    }
    case "function": {
      return parseFunction(props, test);
    }
    default: {
      return parseString(props, test);
    }
  }
}

export function evaluateNeedles<Props>(needles: Needles<Props>, props: Props) {
  let result: boolean;

  if (Array.isArray(needles)) {
    result = needles.every((item: Needles<Props>) => {
      return resolver(item, props);
    });
  } else {
    result = resolver(needles, props);
  }

  return result;
}
