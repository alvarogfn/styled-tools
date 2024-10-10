import type { GenericFunction } from "@/types/utility.js";

import { clamp } from "@/helpers/clamp.js";
import { resolveValue } from "@/helpers/resolve-value.js";
import { toArray } from "@/helpers/to-array.js";
import { resolvePaletteDefaultValue, resolvePaletteKey, resolvePaletteTone } from "@/tools/deep-palette/utils.js";

/**
 * @example
 * const theme = {
 *   palette: {
 *     primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
 *     secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0']
 *   }
 * };
 *
 * const Button = styled.button<object>`
 *   color: ${deepPalette(1)}; // props.theme.palette[props.palette][1]
 * `;
 *
 * <ThemeProvider theme={theme}>
 *   <Button palette="secondary" />
 * </ThemeProvider>
 *
 * Returns a `StyleFunction` that retrieves a color tone from the theme palette.
 * @param tone The tone index to retrieve from the palette.
 * @returns Returns `props.theme.palette[key || props.palette][tone || props.tone || 0]` or `defaultValue`.
 */
export function deepPalette<Props>(tone?: number): GenericFunction<Props>;

/**
 *
 * Returns `props.theme.palette[props.palette][tone]`.
 * @example
 * const theme = {
 *   palette: {
 *     primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
 *     secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0']
 *   }
 * };
 *
 * const Button = styled.button`
 *  color: ${deepPalette("primary", 4, "red")}; // props.theme.palette.primary[4] || red
 * `;
 *
 * <ThemeProvider theme={theme}>
 *   <Button palette="secondary" />
 * </ThemeProvider>
 *
 * @param tone The tone index to retrieve from the palette.
 * @param defaultValue The default value to return if the palette or tone is not found.
 * @returns Returns `props.theme.palette[key || props.palette][tone || props.tone || 0]` or `defaultValue`.
 */
export function deepPalette<Props>(tone: number, defaultValue: unknown): GenericFunction<Props>;

/**
 * @example
 * const theme = {
 *   palette: {
 *     primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
 *     secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0']
 *   }
 * };
 *
 * const Button = styled.button`
 *   color: ${deepPalette(1)};                    // props.theme.palette[props.palette][1]
 *   color: ${deepPalette("primary", 1)};         // props.theme.palette.primary[1]
 *   color: ${deepPalette("primary")};            // props.theme.palette.primary[props.tone || 0]
 *   color: ${deepPalette("primary", -1)};        // props.theme.palette.primary[3]
 *   color: ${deepPalette("primary", 10)};        // props.theme.palette.primary[3]
 *   color: ${deepPalette("primary", -10)};       // props.theme.palette.primary[0]
 *   color: ${deepPalette("primary", 0, "red")};  // props.theme.palette.primary[0] || red
 * `;
 *
 * <ThemeProvider theme={theme}>
 *   <Button palette="secondary" />
 * </ThemeProvider>
 *
 * @param key The key of the palette to retrieve the tone from.
 * @param tone The tone index to retrieve from the palette.
 * @returns Returns `props.theme.palette[key || props.palette][tone || props.tone || 0]` or `defaultValue`.
 */
export function deepPalette<Props>(key: string, tone?: number): GenericFunction<Props>;
/**
 * @example
 * const theme = {
 *   palette: {
 *     primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
 *     secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0']
 *   }
 * };
 *
 * const Button = styled.button`
 *   color: ${deepPalette(1)};                    // props.theme.palette[props.palette][1]
 *   color: ${deepPalette("primary", 1)};         // props.theme.palette.primary[1]
 *   color: ${deepPalette("primary")};            // props.theme.palette.primary[props.tone || 0]
 *   color: ${deepPalette("primary", -1)};        // props.theme.palette.primary[3]
 *   color: ${deepPalette("primary", 10)};        // props.theme.palette.primary[3]
 *   color: ${deepPalette("primary", -10)};       // props.theme.palette.primary[0]
 *   color: ${deepPalette("primary", 0, "red")};  // props.theme.palette.primary[0] || red
 * `;
 *
 * <ThemeProvider theme={theme}>
 *   <Button palette="secondary" />
 * </ThemeProvider>
 *
 * @param key - The key of the palette to retrieve the tone from.
 * @param defaultValue - The default value to return if the palette or tone is not found.
 * @returns Returns `props.theme.palette[key || props.palette][tone || props.tone || 0]` or `defaultValue`.
 */
export function deepPalette<Props>(key: string, defaultValue?: Exclude<unknown, number>): GenericFunction<Props>;

/**
 * @example
 * const theme = {
 *   palette: {
 *     primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
 *     secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0']
 *   }
 * };
 *
 * const Button = styled.button`
 *   color: ${deepPalette(1)};                    // props.theme.palette[props.palette][1]
 *   color: ${deepPalette("primary", 1)};         // props.theme.palette.primary[1]
 *   color: ${deepPalette("primary")};            // props.theme.palette.primary[props.tone || 0]
 *   color: ${deepPalette("primary", -1)};        // props.theme.palette.primary[3]
 *   color: ${deepPalette("primary", 10)};        // props.theme.palette.primary[3]
 *   color: ${deepPalette("primary", -10)};       // props.theme.palette.primary[0]
 *   color: ${deepPalette("primary", 0, "red")};  // props.theme.palette.primary[0] || red
 * `;
 *
 * <ThemeProvider theme={theme}>
 *   <Button palette="secondary" />
 * </ThemeProvider>
 *
 * @param key - The key of the palette to retrieve the tone from.
 * @param tone - The tone index to retrieve from the palette.
 * @param defaultValue - The default value to return if the palette or tone is not found.
 * @returns Returns `props.theme.palette[key || props.palette][tone || props.tone || 0]` or `defaultValue`.
 */
export function deepPalette<Props>(
  key: string,
  tone: number,
  defaultValue?: Exclude<unknown, number>,
): GenericFunction<Props>;

/**
 * @example
 *
 * const theme = {
 *   palette: {
 *     primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
 *     secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0']
 *   }
 * };
 *
 * const Button = styled.button`
 *   color: ${deepPalette(1)};                    // props.theme.palette[props.palette][1]
 *   color: ${deepPalette("primary", 1)};         // props.theme.palette.primary[1]
 *   color: ${deepPalette("primary")};            // props.theme.palette.primary[props.tone || 0]
 *   color: ${deepPalette("primary", -1)};        // props.theme.palette.primary[3]
 *   color: ${deepPalette("primary", 10)};        // props.theme.palette.primary[3]
 *   color: ${deepPalette("primary", -10)};       // props.theme.palette.primary[0]
 *   color: ${deepPalette("primary", 0, "red")};  // props.theme.palette.primary[0] || red
 * `;
 *
 * <ThemeProvider theme={theme}>
 *   <Button palette="secondary" />
 * </ThemeProvider>
 */
export function deepPalette<Props>(
  keyOrTone?: unknown,
  toneOrDefaultValue?: unknown,
  defaultValue?: unknown,
): GenericFunction<Props> {
  return (props: Props) => {
    const safeProps = Object.assign(
      { palette: undefined, theme: { palette: {} as Record<any, any> }, tone: undefined },
      props,
    );

    const key = resolvePaletteKey(safeProps, keyOrTone) as string;
    const tone = resolvePaletteTone(props, keyOrTone, toneOrDefaultValue);
    const finalDefaultValue = resolvePaletteDefaultValue(tone, toneOrDefaultValue, defaultValue);

    if (!safeProps.theme.palette || !safeProps.theme.palette[key]) {
      return finalDefaultValue;
    }

    const tones = toArray(resolveValue(safeProps.theme.palette[key], safeProps));

    if (tone < 0) {
      return resolveValue(tones[clamp(tones.length + tone, 0, tones.length - 1)], safeProps);
    }

    return resolveValue(tones[clamp(tone, 0, tones.length - 1)], safeProps);
  };
}
