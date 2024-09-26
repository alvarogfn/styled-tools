import type { Needle } from "@/types/utility.js";

import { describe, expect, it } from "vitest";

import type { SwitchPropCases } from "./switch-prop.js";

import { switchProp } from "./switch-prop.js";

function makeSut<Props extends object, Interpolation>(
  props: Props,
  needle: Needle<Props>,
  cases: SwitchPropCases<Props, Interpolation>,
  defaultCase?: Interpolation,
) {
  return switchProp<Props, Interpolation>(needle, cases, defaultCase)(props as Props);
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
