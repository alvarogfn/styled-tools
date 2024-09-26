import { prop } from "@/tools/prop/prop.js";

export function parseObject<Props>(needles: object, props: Props) {
  const safeProps = Object.assign({}, props);

  const truthValues = Object.entries(needles).reduce(
    (result, [key, value]) => {
      const propValue = prop<Props>(key)(props);

      if (typeof value === "function") {
        return { ...result, [key]: Boolean(value(propValue)) };
      }

      return { ...result, [key]: Boolean(value) };
    },
    {} as { [k: string]: boolean },
  );

  return Object.entries(safeProps).reduce((acc, [key, value]) => {
    if (truthValues[key]) return { ...acc, [key]: value };
    return acc;
  }, {} as Props);
}
