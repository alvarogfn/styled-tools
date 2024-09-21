import type { ComponentPropsWithTheme, Interpolation, Needle } from "@/shared/types.js";
import type { Cases } from "@/tools/switch-prop/types.js";

import { describe, expect, it } from "vitest";

import { switchProp } from "./switch-prop.js";

function makeSut<Props extends object>(
  props: Props,
  needle: Needle<Props>,
  cases: Cases<Props>,
  defaultCase?: Interpolation<Props>,
) {
  return switchProp<Props>(needle, cases, defaultCase)(props as ComponentPropsWithTheme<Props>);
}

const testCases = [
  {
    cases: { blue: "blue", red: "red" },
    expected: undefined,
    props: {},
    test: "type",
  },
  {
    cases: { blue: "blue", red: "red" },
    expected: "red",
    props: { type: "red" },
    test: "type",
  },
  {
    cases: { blue: "blue", red: "red" },
    expected: "blue",
    props: { type: "blue" },
    test: "type",
  },
  {
    cases: { blue: "blue", red: "red" },
    expected: "red",
    props: { foo: { bar: "red" } },
    test: "foo.bar",
  },
  {
    cases: { blue: "blue", red: "red" },
    expected: "blue",
    props: { foo: { bar: "blue" } },
    test: "foo.bar",
  },
  {
    cases: { blue: "blue", red: "red" },
    expected: undefined,
    props: {},
    test: (props: any) => props.type,
  },
  {
    cases: { blue: "blue", red: "red" },
    expected: "red",
    props: { type: "red" },
    test: (props: any) => props.type,
  },
  {
    cases: { blue: "blue", red: "red" },
    expected: "blue",
    props: { type: "blue" },
    test: (props: any) => props.type,
  },
  {
    cases: { blue: "blue", red: "red" },
    defaultCase: "green",
    expected: "green",
    props: { foo: "foo" },
    test: "foo",
  },
  {
    cases: () => ({ blue: "blue", red: "red" }),
    expected: "blue",
    props: { foo: "blue" },
    test: "foo",
  },
];

describe("[Tools]: switch-prop", () => {
  describe("when called with a string argument", () => {
    it.each(testCases)(
      "returns $expected when called with needle $test and props $props",
      ({ cases, defaultCase, expected, props, test }) => {
        expect(makeSut(props, test, cases, defaultCase)).toBe(expected);
      },
    );
  });
});
