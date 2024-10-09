export function resolvePaletteKey<Props>(props: Props, keyOrTone?: unknown) {
  const safeProps = Object.assign({ palette: {} as Record<any, any> }, props);

  return typeof keyOrTone === "string" ? keyOrTone : safeProps.palette;
}

export function resolvePaletteTone<Props>(props: Props, keyOrTone?: unknown, toneOrDefaultValue?: any) {
  const safeProps = Object.assign({ palette: undefined, tone: undefined }, props);

  return typeof keyOrTone === "number"
    ? keyOrTone
    : typeof toneOrDefaultValue === "number"
      ? toneOrDefaultValue
      : safeProps.tone || 0;
}

export function resolvePaletteDefaultValue(tone: unknown, toneOrDefaultValue?: any, defaultValue?: any) {
  return toneOrDefaultValue === tone ? defaultValue : toneOrDefaultValue;
}
