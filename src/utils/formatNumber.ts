export function formatNumber(input?: number): string {
  return typeof input === "number"
    ? input.toLocaleString("en-US", { minimumFractionDigits: 2 })
    : "";
}
