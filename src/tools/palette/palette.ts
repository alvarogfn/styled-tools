import type { ComponentProps, StyleFunction } from "@/types/styled-types.js";

import { clamp } from "@/helpers/clamp.js";
import { toArray } from "@/helpers/to-array.js";

import type { ComponentPropsWithPalette } from "./types.js";

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
 *   color: ${palette(1)}; // props.theme.palette[props.palette][1]
 * `;
 *
 * <ThemeProvider theme={theme}>
 *   <Button palette="secondary" />
 * </ThemeProvider>
 *
 * Returns a `StyleFunction` that retrieves a color tone from the theme palette.
 * @param [tone] - The tone index to retrieve from the palette.
 * @returns Returns `props.theme.palette[key || props.palette][tone || props.tone || 0]` or `defaultValue`.
 */
export function palette<Props extends ComponentProps>(tone?: number): StyleFunction<Props>;

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
 *  color: ${palette("primary", 4, "red")}; // props.theme.palette.primary[4] || red
 * `;
 *
 * <ThemeProvider theme={theme}>
 *   <Button palette="secondary" />
 * </ThemeProvider>
 *
 * @param tone - The tone index to retrieve from the palette.
 * @param defaultValue - The default value to return if the palette or tone is not found.
 * @returns Returns `props.theme.palette[key || props.palette][tone || props.tone || 0]` or `defaultValue`.
 */
export function palette<Props extends ComponentProps>(tone: number, defaultValue: unknown): StyleFunction<Props>;

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
 *   color: ${palette(1)};                    // props.theme.palette[props.palette][1]
 *   color: ${palette("primary", 1)};         // props.theme.palette.primary[1]
 *   color: ${palette("primary")};            // props.theme.palette.primary[props.tone || 0]
 *   color: ${palette("primary", -1)};        // props.theme.palette.primary[3]
 *   color: ${palette("primary", 10)};        // props.theme.palette.primary[3]
 *   color: ${palette("primary", -10)};       // props.theme.palette.primary[0]
 *   color: ${palette("primary", 0, "red")};  // props.theme.palette.primary[0] || red
 * `;
 *
 * <ThemeProvider theme={theme}>
 *   <Button palette="secondary" />
 * </ThemeProvider>
 *
 * @param key - The key of the palette to retrieve the tone from.
 * @param [tone] - The tone index to retrieve from the palette.
 * @returns Returns `props.theme.palette[key || props.palette][tone || props.tone || 0]` or `defaultValue`.
 */
export function palette<Props extends ComponentProps>(key: string, tone?: number): StyleFunction<Props>;
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
 *   color: ${palette(1)};                    // props.theme.palette[props.palette][1]
 *   color: ${palette("primary", 1)};         // props.theme.palette.primary[1]
 *   color: ${palette("primary")};            // props.theme.palette.primary[props.tone || 0]
 *   color: ${palette("primary", -1)};        // props.theme.palette.primary[3]
 *   color: ${palette("primary", 10)};        // props.theme.palette.primary[3]
 *   color: ${palette("primary", -10)};       // props.theme.palette.primary[0]
 *   color: ${palette("primary", 0, "red")};  // props.theme.palette.primary[0] || red
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
export function palette<Props extends ComponentProps>(
  key: string,
  defaultValue?: Exclude<unknown, number>,
): StyleFunction<Props>;

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
 *   color: ${palette(1)};                    // props.theme.palette[props.palette][1]
 *   color: ${palette("primary", 1)};         // props.theme.palette.primary[1]
 *   color: ${palette("primary")};            // props.theme.palette.primary[props.tone || 0]
 *   color: ${palette("primary", -1)};        // props.theme.palette.primary[3]
 *   color: ${palette("primary", 10)};        // props.theme.palette.primary[3]
 *   color: ${palette("primary", -10)};       // props.theme.palette.primary[0]
 *   color: ${palette("primary", 0, "red")};  // props.theme.palette.primary[0] || red
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
export function palette<Props extends ComponentProps>(
  key: string,
  tone: number,
  defaultValue?: Exclude<unknown, number>,
): StyleFunction<Props>;

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
 *   color: ${palette(1)};                    // props.theme.palette[props.palette][1]
 *   color: ${palette("primary", 1)};         // props.theme.palette.primary[1]
 *   color: ${palette("primary")};            // props.theme.palette.primary[props.tone || 0]
 *   color: ${palette("primary", -1)};        // props.theme.palette.primary[3]
 *   color: ${palette("primary", 10)};        // props.theme.palette.primary[3]
 *   color: ${palette("primary", -10)};       // props.theme.palette.primary[0]
 *   color: ${palette("primary", 0, "red")};  // props.theme.palette.primary[0] || red
 * `;
 *
 * <ThemeProvider theme={theme}>
 *   <Button palette="secondary" />
 * </ThemeProvider>
 */
export function palette<Props extends ComponentProps>(
  keyOrTone?: unknown,
  toneOrDefaultValue?: unknown,
  defaultValue?: unknown,
): StyleFunction<Props> {
  return (props: ComponentPropsWithPalette<Props>) => {
    const key = typeof keyOrTone === "string" ? keyOrTone : props.palette;

    const tone =
      typeof keyOrTone === "number"
        ? keyOrTone
        : (typeof toneOrDefaultValue === "number"
          ? toneOrDefaultValue
          : props.tone || 0);

    const finalDefaultValue = toneOrDefaultValue === tone ? defaultValue : toneOrDefaultValue;

    if (!props.theme.palette || !props.theme.palette[key as string]) {
      return finalDefaultValue;
    }

    const tones = toArray(props.theme.palette[key as string]);

    if (tone < 0) {
      return tones[clamp(tones.length + tone, 0, tones.length - 1)];
    }

    return tones[clamp(tone, 0, tones.length - 1)];
  };
}
