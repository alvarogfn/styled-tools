import { describe, expect, it } from "vitest";

import { deepPalette } from "./deep-palette.js";

const theme = {
  palette: {
    primary: [() => "primary0", () => "primary1", () => "primary2"],
    secondary: () => "secondary0",
  },
};

type Theme = Partial<typeof theme>;

function makeSut<Props extends object>(
  props: Props,
  theme: Theme,
  keyOrTone?: any,
  toneOrDefaultValue?: any,
  defaultValue?: any,
) {
  return deepPalette<Props>(keyOrTone, toneOrDefaultValue, defaultValue)({ ...props, theme });
}

describe("[Tools]: palette", () => {
  it.each([
    {
      expected: undefined,
      props: {},
      theme,
    },
    {
      expected: undefined,
      keyOrTone: 0,
      props: {},
      theme,
    },
    {
      expected: "primary0",
      props: { palette: "primary" },
      theme,
    },
    {
      expected: "primary0",
      props: { palette: "primary" },
      theme,
    },
    {
      expected: "primary2",
      props: { palette: "primary", tone: 2 },
      theme,
    },
    {
      expected: "primary0",
      keyOrTone: 0,
      props: { palette: "primary" },
      theme,
    },
    {
      expected: "primary1",
      keyOrTone: 1,
      props: { palette: "primary" },
      theme,
    },
    {
      expected: "primary2",
      keyOrTone: -1,
      props: { palette: "primary" },
      theme,
    },
    {
      expected: "primary0",
      keyOrTone: -5,
      props: { palette: "primary" },
      theme,
    },
    {
      expected: "primary2",
      keyOrTone: 5,
      props: { palette: "primary" },
      theme,
    },
    {
      expected: "secondary0",
      keyOrTone: 0,
      props: { palette: "secondary" },
      theme,
    },
    {
      expected: "secondary0",
      keyOrTone: 1,
      props: { palette: "secondary" },
      theme,
    },
    {
      expected: undefined,
      keyOrTone: 0,
      props: { palette: "other" },
      theme,
    },
    {
      expected: "foo",
      keyOrTone: 1,
      props: {},
      theme,
      toneOrDefaultValue: "foo",
    },
    {
      expected: "foo",
      keyOrTone: 1,
      props: { palette: "other" },
      theme,
      toneOrDefaultValue: "foo",
    },
    {
      expected: "primary0",
      keyOrTone: "primary",
      props: {},
      theme,
    },
    {
      expected: "primary2",
      keyOrTone: "primary",
      props: { tone: 2 },
      theme,
    },
    {
      expected: "primary0",
      keyOrTone: "primary",
      props: {},
      theme,
      toneOrDefaultValue: 0,
    },
    {
      expected: "primary2",
      keyOrTone: "primary",
      props: {},
      theme,
      toneOrDefaultValue: 5,
    },
    {
      expected: "primary2",
      keyOrTone: "primary",
      props: {},
      theme,
      toneOrDefaultValue: -1,
    },
    {
      expected: "primary0",
      keyOrTone: "primary",
      props: {},
      theme,
      toneOrDefaultValue: -5,
    },
    {
      expected: "secondary0",
      keyOrTone: "secondary",
      props: {},
      theme,
      toneOrDefaultValue: 0,
    },
    {
      expected: "secondary0",
      keyOrTone: "secondary",
      props: {},
      theme,
      toneOrDefaultValue: 1,
    },
    {
      defaultValue: "foo",
      expected: "secondary0",
      keyOrTone: "secondary",
      props: {},
      theme,
      toneOrDefaultValue: 1,
    },
    {
      expected: undefined,
      keyOrTone: "other",
      props: {},
      theme,
      toneOrDefaultValue: 1,
    },
    {
      expected: "foo",
      keyOrTone: "other",
      props: {},
      theme: {},
      toneOrDefaultValue: "foo",
    },
    {
      expected: "foo",
      keyOrTone: "other",
      props: {},
      theme,
      toneOrDefaultValue: "foo",
    },
    {
      defaultValue: "foo",
      expected: "foo",
      keyOrTone: "other",
      props: {},
      theme,
      toneOrDefaultValue: 1,
    },
    {
      expected: undefined,
      keyOrTone: "other",
      props: { palette: "primary" },
      theme,
      toneOrDefaultValue: 1,
    },
    {
      defaultValue: "foo",
      expected: "foo",
      keyOrTone: "other",
      props: { palette: "primary" },
      theme,
      toneOrDefaultValue: 1,
    },
  ])("should return $expected", ({ defaultValue, expected, keyOrTone, props, theme, toneOrDefaultValue }) => {
    expect(makeSut(props, theme, keyOrTone, toneOrDefaultValue, defaultValue)).toBe(expected);
  });
});
