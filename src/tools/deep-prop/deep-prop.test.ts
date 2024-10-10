import { describe, expect, test } from "vitest";

import { deepProp } from "./deep-prop.js";

function makeSut<P extends object>(path: string, props: P, defaultValue?: unknown) {
  return deepProp<P>(path, defaultValue)(props);
}

const testCases = [
  { expected: undefined, path: "color", props: {} },
  {
    expected: "red",
    path: "color",
    props: { color: () => "red" },
  },
  {
    expected: "red",
    path: "color",
    props: { bg: "red", color: (props: any) => props.bg },
  },
  {
    expected: undefined,
    path: "color.primary",
    props: {},
  },
  {
    expected: "red",
    path: "color.primary",
    props: { color: { primary: () => "red" } },
  },
  {
    expected: "blue",
    path: "color.primary",
    props: { color: { primary: deepProp("color.secondary"), secondary: "blue" } },
  },
  {
    defaultValue: "red",
    expected: "red",
    path: "color.primary",
    props: {},
  },
  {
    defaultValue: "red",
    expected: "blue",
    path: "color",
    props: { color: () => "blue" },
  },
  {
    defaultValue: "red",
    expected: "red",
    path: "color.primary",
    props: {},
  },
];

describe("[Tools]: DeepProp", () => {
  describe("when called with empty props", () => {
    test.each(testCases)(
      "should return $expected when props $props and path $path",
      ({ defaultValue, expected, path, props }) => {
        expect(makeSut(path, props, defaultValue)).toStrictEqual(expected);
      },
    );
  });
});
