export function toArray(arg: unknown) {
  return Array.isArray(arg) ? arg : [arg];
}
