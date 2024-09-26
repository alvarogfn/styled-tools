import type { ComponentPropsWithTheme, Needles } from "@/types/styled-types.js";

import { describe, expect, it } from "vitest";

import { withProp } from "./with-prop.js";

type CallbackFunction = (...args: any[]) => any;

function makeSut<Props extends object>(props: Props, needle: Needles<Props> | Needles<Props>[], fn: CallbackFunction) {
  return withProp<Props>(needle, fn)(props as ComponentPropsWithTheme<Props>);
}

const testCases = [
  {
    expected: false,
    fn: (type: any) => type === "foo",
    needle: "type",
    props: {},
    title: "return false when called with needle type == 'foo' and no props",
  },
  {
    expected: false,
    fn: (type: any) => type === "foo",
    needle: "type",
    props: { type: "bar" },
    title: "return false when called with needle type === 'foo' and props { type: bar }",
  },
  {
    expected: true,
    fn: (type: any) => type === "foo",
    needle: "type",
    props: { type: "foo" },
    title: "return true when called with needle type === 'foo' and props { type: 'foo' }",
  },
  {
    expected: false,
    fn: (bar: any) => bar === "foo",
    needle: "foo.bar",
    props: {},
    title: "return false when called with needle foo.bar, bar === 'foo' and no props",
  },
  {
    expected: false,
    fn: (bar: any) => bar === "foo",
    needle: "foo.bar",
    props: { foo: {} },
    title: "return false when called with needle foo.bar, bar === 'foo' and no props",
  },
  {
    expected: false,
    fn: (bar: any) => bar === "foo",
    needle: "foo.bar",
    props: { foo: { bar: "bar" } },
    title: "return false when called with needle foo.bar, bar === 'foo' and no props",
  },
  {
    expected: true,
    fn: (bar: any) => bar === "foo",
    needle: "foo.bar",
    props: { foo: { bar: "foo" } },
    title: "return false when called with needle foo.bar, bar === 'foo' and no props",
  },
  {
    expected: [undefined, undefined],
    fn: (...args: any) => args,
    needle: ["foo", "bar"],
    props: {},
    title: "return ['foo', undefined] when called with needle is array and props {foo: 'foo'}",
  },
  {
    expected: ["foo", undefined],
    fn: (...args: any) => args,
    needle: ["foo", "bar"],
    props: { foo: "foo" },
    title: "return ['foo', undefined] when called with needle is array and props {foo: 'foo'}",
  },
  {
    expected: [undefined, "bar"],
    fn: (...args: any) => args,
    needle: ["foo", "bar"],
    props: { bar: "bar" },
    title: "return [undefined, 'bar'] when called with needle is array and props {bar: 'bar'}",
  },
  {
    expected: ["foo", "bar"],
    fn: (...args: any) => args,
    needle: ["foo", "bar"],
    props: { bar: "bar", foo: "foo" },
    title: "return ['foo', 'bar'] when called with needle is array and props {bar: 'bar', foo: 'foo'}",
  },
  {
    expected: false,
    fn: (type: any) => type === "foo",
    needle: (props: any) => props.type,
    props: {},
    title: "return false when called with needle is function and no props",
  },
  {
    expected: false,
    fn: (type: any) => type === "foo",
    needle: (props: any) => props.type,
    props: { type: "bar" },
    title: "return false when called with needle is function",
  },
  {
    expected: true,
    fn: (type: any) => type === "foo",
    needle: (props: any) => props.type,
    props: { type: "foo" },
    title: "return true when called with needle is function",
  },
];

describe("[Tools]: with-prop", () => {
  it.each(testCases)("$title", ({ expected, fn, needle, props }) => {
    expect(makeSut(props, needle, fn)).toEqual(expected);
  });
});
