import type { GenericFunction } from "@/types/utility.js";

import { clamp } from "@/helpers/clamp.js";
import { toArray } from "@/helpers/to-array.js";

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
 *   color: ${palette(1)}; // props.theme.palette[props.palette][1]
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
export function palette<Props>(tone?: number): GenericFunction<Props>;

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
 * @param tone The tone index to retrieve from the palette.
 * @param defaultValue The default value to return if the palette or tone is not found.
 * @returns Returns `props.theme.palette[key || props.palette][tone || props.tone || 0]` or `defaultValue`.
 */
export function palette<Props>(tone: number, defaultValue: unknown): GenericFunction<Props>;

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
 * @param key The key of the palette to retrieve the tone from.
 * @param tone The tone index to retrieve from the palette.
 * @returns Returns `props.theme.palette[key || props.palette][tone || props.tone || 0]` or `defaultValue`.
 */
export function palette<Props>(key: string, tone?: number): GenericFunction<Props>;
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
export function palette<Props>(key: string, defaultValue?: Exclude<unknown, number>): GenericFunction<Props>;

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
export function palette<Props>(
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
export function palette<Props>(
  keyOrTone?: unknown,
  toneOrDefaultValue?: unknown,
  defaultValue?: unknown,
): GenericFunction<Props> {
  return (props: Props) => {
    const safeProps = Object.assign({ palette: undefined, theme: { palette: undefined }, tone: undefined }, props);

    const key = typeof keyOrTone === "string" ? keyOrTone : safeProps.palette;

    const tone =
      typeof keyOrTone === "number"
        ? keyOrTone
        : typeof toneOrDefaultValue === "number"
          ? toneOrDefaultValue
          : safeProps.tone || 0;

    const finalDefaultValue = toneOrDefaultValue === tone ? defaultValue : toneOrDefaultValue;

    if (!safeProps.theme.palette || !safeProps.theme.palette[key as string]) {
      return finalDefaultValue;
    }

    const tones = toArray(safeProps.theme.palette[key as string]);

    if (tone < 0) {
      return tones[clamp(tones.length + tone, 0, tones.length - 1)];
    }

    return tones[clamp(tone, 0, tones.length - 1)];
  };
}
