export function minMax(value: number, min?: number, max?: number): number {
  let processedValue = value;

  processedValue =
    typeof min === "number" ? Math.max(processedValue, min) : processedValue;

  processedValue =
    typeof max === "number" ? Math.min(processedValue, max) : processedValue;

  return processedValue;
}
