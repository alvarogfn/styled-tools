import type { ComponentPropsWithTheme } from "@/shared/types.js";

import { describe, expect, it } from "vitest";

import { theme } from "./theme.js";

function makeSut<Props extends object>(path: string, props: Props, defaultValue?: unknown) {
  return theme<Props>(path, defaultValue)(props as ComponentPropsWithTheme<Props>);
}

describe("[Tools]: theme", () => {
  describe("with string as test argument", () => {
    it.each([
      { expected: undefined, path: "color", props: {} },
      { expected: "red", path: "color", props: { theme: { color: "red" } } },
    ])("returns $expected when called with $path and theme is $props.theme", ({ expected, path, props }) => {
      expect(makeSut(path, props)).toBe(expected);
    });
  });

  describe("with dot-notation string as test argument", () => {
    it.each([
      { expected: undefined, path: "color.primary", props: { theme: { color: {} } } },
      { expected: "red", path: "color.primary", props: { theme: { color: { primary: "red" } } } },
    ])("returns $expected when called with $path and props is $props.theme", ({ expected, path, props }) => {
      expect(makeSut(path, props)).toBe(expected);
    });
  });

  describe("with defaultValue defined", () => {
    it.each([
      { defaultValue: "red", expected: "blue", path: "color", props: { theme: { color: "blue" } } },
      { defaultValue: "red", expected: "red", path: "color.primary", props: { theme: { color: {} } } },
    ])(
      "returns $expected when called with $path and props is $props.theme",
      ({ defaultValue, expected, path, props }) => {
        expect(makeSut(path, props, defaultValue)).toBe(expected);
      },
    );
  });
});
