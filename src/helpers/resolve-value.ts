export function resolveValue<Return, Props>(value: any, props: Props): Return {
  if (typeof value === "function") {
    return resolveValue<Return, Props>(value(props), props);
  }
  return value;
}
