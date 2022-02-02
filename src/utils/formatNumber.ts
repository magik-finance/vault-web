import { Coin, coinConfigs } from "../constants/solana";

export function formatNumber(input?: number): string {
  return typeof input === "number"
    ? input.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 9,
      })
    : "";
}

export function formatCoinNumber(coin: Coin, input?: number): string {
  const decimalPlaces = coinConfigs[coin].decimalPlaces;
  const label = coinConfigs[coin].label;
  return typeof input === "number"
    ? `${formatNumber(input / Math.pow(10, decimalPlaces))} ${label}`
    : "";
}
