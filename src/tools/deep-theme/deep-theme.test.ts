import { describe, expect, it } from "vitest";

import { deepTheme } from "./deep-theme.js";

function makeSut<Props extends object>(path: string, props: Props, defaultValue?: unknown) {
  return deepTheme<Props>(path, defaultValue)(props);
}

describe("[Tools]: deepTheme", () => {
  describe("with string as test argument", () => {
    it.each([
      { expected: undefined, path: "color", props: {} },
      { expected: "red", path: "color", props: { theme: { color: () => "red" } } },
      {
        expected: "blue",
        path: "color",
        props: {
          theme: { bg: "blue", color: (props: any) => props.theme.bg },
        },
      },
      {
        expected: "blue",
        path: "color",
        props: { theme: { bg: "blue", color: deepTheme("bg") } },
      },
      {
        expected: "#007bff",
        path: "linkColor",
        props: {
          theme: {
            blue: "#007bff",
            linkColor: deepTheme("primary"),
            primary: deepTheme("blue"),
          },
        },
      },
    ])("returns $expected when called with $path and theme is $props.theme", ({ expected, path, props }) => {
      expect(makeSut(path, props)).toBe(expected);
    });
  });

  describe("with dot-notation string as test argument", () => {
    it.each([
      {
        expected: "blue",
        path: "color.primary",
        props: {
          theme: {
            color: { primary: deepTheme("color.secondary"), secondary: "blue" },
          },
        },
      },
    ])("returns $expected when called with $path and props is $props.theme", ({ expected, path, props }) => {
      expect(makeSut(path, props)).toBe(expected);
    });
  });
});
