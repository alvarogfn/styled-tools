import type { ComponentPropsWithTheme, Interpolation, Needles } from "@/types/styled-types.js";

import { describe, expect, test } from "vitest";

import { ifNotProp } from "./if-not-prop.js";

function makeSut<Props extends object>(
  test: Needles<Props> | Needles<Props>[] | object,
  props: Props,
  pass?: Interpolation<Props>,
  fail?: Interpolation<Props>,
) {
  return ifNotProp<Props>(test, pass, fail)(props as ComponentPropsWithTheme<Props>);
}

describe("ifNotProp", () => {
  describe("when called with a string argument", () => {
    test.each([
      { expected: "yes", props: {}, test: "foo" },
      { expected: "no", props: { foo: true }, test: "foo" },
      { expected: "yes", props: { foo: false }, test: "foo" },
    ])(`return $expected when test is $test and props is $props`, ({ expected, props, test }) => {
      expect(makeSut(test, props, "yes", "no")).toBe(expected);
    });
  });

  describe("when called with a dot-notation string argument", () => {
    test.each([
      { expected: "no", props: { foo: { bar: true } }, test: "foo.bar" },
      { expected: "yes", props: { foo: { bar: false } }, test: "foo.bar" },
    ])(`return $expected when test is $test and props is $props`, ({ expected, props, test }) => {
      expect(makeSut(test, props, "yes", "no")).toBe(expected);
    });
  });

  describe("when called with an array argument", () => {
    test.each([
      { expected: "no", fail: "no", props: { bar: false, foo: true }, test: ["foo"] },
      { expected: "no", fail: "no", props: { bar: true, foo: true }, test: ["foo", "bar"] },
      { expected: "yes", fail: "no", props: { bar: false, foo: true }, test: ["foo", "bar"] },
      { expected: "yes", fail: () => "no", props: { bar: false, foo: true }, test: ["foo", "bar"] },
    ])(`return $expected when test is $test and props is $props`, ({ expected, fail, props, test }) => {
      expect(makeSut(test, props, "yes", fail)).toBe(expected);
    });
  });

  describe("when called with an dot-notation array argument", () => {
    test.each([
      { expected: "no", props: { baz: true, foo: { bar: true } }, test: ["foo.bar", "baz"] },
      { expected: "yes", props: { baz: false, foo: { bar: true } }, test: ["foo.bar", "baz"] },
      { expected: "yes", props: { baz: true, foo: { bar: false } }, test: ["foo.bar", "baz"] },
    ])(`return $expected when test is $test and props is $props`, ({ expected, props, test }) => {
      expect(makeSut(test, props, "yes", "no")).toBe(expected);
    });
  });

  describe("when called with an function array argument", () => {
    test.each([
      { expected: "no", fail: "no", props: { bar: false, foo: true }, test: [(props: any) => props.foo] },
      {
        expected: "yes",
        fail: () => "no",
        props: { bar: false, foo: true },
        test: ["bar", (props: any) => props.foo],
      },
    ])(`return $expected when test is $test and props is $props`, ({ expected, fail, props, test }) => {
      expect(makeSut(test, props, "yes", fail)).toBe(expected);
    });
  });

  describe("when called with an object array argument", () => {
    test.each([{ expected: "no", props: { bar: false, foo: true }, test: [{ foo: true }] }])(
      `return $expected when test is $test and props is $props`,
      ({ expected, props, test }) => {
        expect(makeSut(test, props, "yes", "no")).toBe(expected);
      },
    );
  });

  describe("when called with an object argument", () => {
    test.each([
      { expected: "no", props: { foo: "ok" }, test: { foo: "ok" } },
      { expected: "yes", props: { foo: "not ok" }, test: { foo: "ok" } },
      { expected: "no", props: { bar: "ok", foo: "ok" }, test: { bar: "ok", foo: "ok" } },
      { expected: "yes", props: { bar: "ok", foo: "not ok" }, test: { bar: "ok", foo: "ok" } },
    ])(`return $expected when test is $test and props is $props`, ({ expected, props, test }) => {
      expect(makeSut(test, props, "yes", "no")).toBe(expected);
    });
  });

  describe("when called with a deep object argument", () => {
    test.each([
      { expected: "no", props: { foo: { bar: "ok" } }, test: { "foo.bar": "ok" } },
      { expected: "yes", props: { foo: { bar: "no" } }, test: { "foo.bar": "ok" } },
    ])(`return $expected when test is $test and props is $props`, ({ expected, props, test }) => {
      expect(makeSut(test, props, "yes", "no")).toBe(expected);
    });
  });

  describe("when called with a function argument", () => {
    test("return 'yes' when test is '(props) => props.foo' and props is {}", () => {
      expect(makeSut((props: any) => props.foo, {}, "yes", "no")).toBe("yes");
    });

    test("return 'yes' when test is '(props) => props.foo' and props is { foo: false }", () => {
      expect(makeSut((props: any) => props.foo, { foo: false }, "yes", "no")).toBe("yes");
    });

    test("return 'no' when test is '(props) => props.foo' and props is { foo: true }", () => {
      expect(makeSut((props: any) => props.foo, { foo: true }, "yes", "no")).toBe("no");
    });
  });

  describe("when called with pass/fail as a function", () => {
    test("return 'bar' when test is 'foo' and pass is '(props) => props.bar' and props is '{bar: \"bar\"}'}", () => {
      expect(makeSut("foo", { bar: "bar" }, "foo", (props) => props.bar)).toBe("foo");
    });

    test("return 'foo' when test is 'foo' and fail is '(props) => props.foo' and props is '{foo: \"foo\"}'}", () => {
      expect(makeSut("foo", { foo: "foo" }, (props) => props.foo, "bar")).toBe("bar");
    });
  });
});
