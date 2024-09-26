import type { Needles } from "@/types/utility.js";

import { describe, expect, test } from "vitest";

import { ifProp } from "./if-prop.js";

function makeSut<Props, Pass, Fail>(test: Needles<Props>, props: Props, pass?: Pass, fail?: Fail) {
  return ifProp<Props, Pass, Fail>(test, pass, fail)(props);
}

describe("ifProp", () => {
  describe("when called without pass or fail", () => {
    test("return an empty string", () => {
      expect(makeSut("foo", { foo: true })).toBe("");
    });
  });

  describe("when called with a string argument", () => {
    test.each([
      { expected: "no", props: {}, test: "foo" },
      { expected: "yes", props: { foo: true }, test: "foo" },
      { expected: "no", props: { foo: false }, test: "foo" },
    ])(`return $expected when test is $test and props is $props`, ({ expected, props, test }) => {
      expect(makeSut(test, props, "yes", "no")).toBe(expected);
    });
  });

  describe("when called with a dot-notation string argument", () => {
    test.each([
      { expected: "yes", props: { foo: { bar: true } }, test: "foo.bar" },
      { expected: "no", props: { foo: { bar: false } }, test: "foo.bar" },
    ])(`return $expected when test is $test and props is $props`, ({ expected, props, test }) => {
      expect(makeSut(test, props, "yes", "no")).toBe(expected);
    });
  });

  describe("when called with an array argument", () => {
    test.each([
      { expected: "yes", fail: "no", props: { bar: false, foo: true }, test: ["foo"] },
      { expected: "yes", fail: "no", props: { bar: true, foo: true }, test: ["foo", "bar"] },
      { expected: "no", fail: "no", props: { bar: false, foo: true }, test: ["foo", "bar"] },
      { expected: "no", fail: () => "no", props: { bar: false, foo: true }, test: ["foo", "bar"] },
    ])(`return $expected when test is $test and props is $props`, ({ expected, fail, props, test }) => {
      expect(makeSut(test, props, "yes", fail)).toBe(expected);
    });
  });

  describe("when called with an dot-notation array argument", () => {
    test.each([
      { expected: "yes", props: { baz: true, foo: { bar: true } }, test: ["foo.bar", "baz"] },
      { expected: "no", props: { baz: false, foo: { bar: true } }, test: ["foo.bar", "baz"] },
      { expected: "no", props: { baz: true, foo: { bar: false } }, test: ["foo.bar", "baz"] },
    ])(`return $expected when test is $test and props is $props`, ({ expected, props, test }) => {
      expect(makeSut(test, props, "yes", "no")).toBe(expected);
    });
  });

  describe("when called with an function array argument", () => {
    test.each([
      { expected: "yes", props: { bar: false, foo: true }, test: [(props: any) => props.foo] },
      {
        expected: "no",
        fail: () => "no",
        props: { bar: false, foo: true },
        test: ["bar", (props: any) => props.foo],
      },
    ])(`return $expected when test is $test and props is $props`, ({ expected, fail, props, test }) => {
      expect(makeSut(test, props, "yes", fail)).toBe(expected);
    });
  });

  describe("when called with an object array argument", () => {
    test.each([{ expected: "yes", props: { bar: false, foo: true }, test: [{ foo: true }] }])(
      `return $expected when test is $test and props is $props`,
      ({ expected, props, test }) => {
        expect(makeSut(test, props, "yes", "no")).toBe(expected);
      },
    );
  });

  describe("when called with an object argument", () => {
    test.each([
      { expected: "yes", props: { foo: "ok" }, test: { foo: "ok" } },
      { expected: "no", props: { foo: "not ok" }, test: { foo: "ok" } },
      { expected: "yes", props: { bar: "ok", foo: "ok" }, test: { bar: "ok", foo: "ok" } },
      { expected: "no", props: { bar: "ok", foo: "not ok" }, test: { bar: "ok", foo: "ok" } },
      { expected: "yes", props: { bar: "ok", foo: "not ok" }, test: { bar: (bar: string) => bar === "ok" } },
    ])(`return $expected when test is $test and props is $props`, ({ expected, props, test }) => {
      expect(makeSut(test, props, "yes", "no")).toBe(expected);
    });
  });

  describe("when called with a deep object argument", () => {
    test.each([
      { expected: "yes", props: { foo: { bar: "ok" } }, test: { "foo.bar": "ok" } },
      { expected: "no", props: { foo: { bar: "no" } }, test: { "foo.bar": "ok" } },
    ])(`return $expected when test is $test and props is $props`, ({ expected, props, test }) => {
      expect(makeSut(test, props, "yes", "no")).toBe(expected);
    });
  });

  describe("when called with a function argument", () => {
    test("return 'no' when test is '(props) => props.foo' and props is {}", () => {
      expect(makeSut((props: any) => props.foo, {}, "yes", "no")).toBe("no");
    });

    test("return 'no' when test is '(props) => props.foo' and props is { foo: false }", () => {
      expect(makeSut((props: any) => props.foo, { foo: false }, "yes", "no")).toBe("no");
    });

    test("return 'yes' when test is '(props) => props.foo' and props is { foo: true }", () => {
      expect(makeSut((props: any) => props.foo, { foo: true }, "yes", "no")).toBe("yes");
    });
  });

  describe("when called with pass/fail as a function", () => {
    test("return 'bar' when test is 'foo' and fail is '(props) => props.bar' and props is '{bar: \"bar\"}'}", () => {
      expect(makeSut("foo", { bar: "bar" }, "foo", (props: any) => props.bar)).toBe("bar");
    });

    test("return 'foo' when test is 'foo' and pass is '(props) => props.foo' and props is '{foo: \"foo\"}'}", () => {
      expect(makeSut("foo", { foo: "foo" }, (props: any) => props.foo, "bar")).toBe("foo");
    });
  });
});
