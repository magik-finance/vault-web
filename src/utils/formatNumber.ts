import { Coin, coinConfigs } from "../constants/solana";

export function formatNumber(input?: number): string {
  return typeof input === "number"
    ? input.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 9,
      })
    : "";
}

export function coinAmountIntegerToFloat(coin: Coin, input?: number): number {
  const decimalPlaces = coinConfigs[coin].decimalPlaces;
  return typeof input === "number" ? input / Math.pow(10, decimalPlaces) : 0;
}

export function coinAmountFloatToInteger(coin: Coin, input?: number): number {
  const decimalPlaces = coinConfigs[coin].decimalPlaces;
  return typeof input === "number" ? input * Math.pow(10, decimalPlaces) : 0;
}

interface FormatCoinNumberOptions {
  skipLabel?: boolean;
}

export function formatCoinNumber(
  coin: Coin,
  input?: number,
  options: FormatCoinNumberOptions = {}
): string {
  const label = coinConfigs[coin].label;
  return typeof input === "number"
    ? `${formatNumber(coinAmountIntegerToFloat(coin, input))}${
        options.skipLabel ? "" : ` ${label}`
      }`
    : "";
}
