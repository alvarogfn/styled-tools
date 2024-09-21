import type { ComponentPropsWithTheme } from "@/shared/types.js";

import { describe, expect, test } from "vitest";

import { prop } from "./prop.js";

function makeSut<P extends object>(path: string, props: P, defaultValue?: unknown) {
  return prop<P>(path, defaultValue)(props as ComponentPropsWithTheme<P>);
}

const testCases = [
  { expected: undefined, path: "color", props: {} },
  { expected: undefined, path: "color.primary", props: {} },
  {
    defaultValue: "red",
    expected: "red",
    path: "color",
    props: {},
  },
  {
    expected: "red",
    path: "color",
    props: { color: "red" },
  },
  {
    defaultValue: "blue",
    expected: "blue",
    path: "color",
    props: {},
  },
  {
    expected: { primary: "red" },
    path: "color",
    props: { color: { primary: "red" } },
  },
  {
    expected: "red",
    path: "color.primary",
    props: { color: { primary: "red" } },
  },
  {
    defaultValue: "blue",
    expected: "blue",
    path: "color.primary",
    props: { color: { secondary: "red" } },
  },
];

describe("[Tools]: Prop", () => {
  describe("when called with empty props", () => {
    test.each(testCases)(
      "should return $expected when props $props and path $path",
      ({ defaultValue, expected, path, props }) => {
        expect(makeSut(path, props, defaultValue)).toStrictEqual(expected);
      },
    );
  });
});
