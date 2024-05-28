import { EquityLTVCalculationRes } from "@/types/LTVCalculation";
import { DisplayItem, DisplayListItem, OverrideData } from "../bonds/types";
import { HeaderData } from "./types";
import {
  roundDownQuantity,
  toCommaSeprated,
  toSetCommaFormatPercentage,
} from "@/_utils/stringUtils";

export const isOverride = (ltvCalculation: any) => {
  return (
    ltvCalculation?.overrideCalculationResult &&
    ltvCalculation?.overrideCalculationResult?.hasOverride
  );
};

export const toEquityHeaderData = (
  result?: EquityLTVCalculationRes
): HeaderData => {
  const ltvCalculation = result?.ltvCalculation;
  const _ltv = isOverride(ltvCalculation)
    ? ltvCalculation?.overrideCalculationResult.ltvAtIm
    : ltvCalculation?.ltvAtIm;

  const _ltvToolTip = isOverride(ltvCalculation)
    ? `Generic LTV: ${ltvCalculation?.ltvAtIm}%`
    : "";

  return {
    currency: result?.marketData?.crncy ?? "-",
    exchange: result?.exchange ?? "-",
    isin: result?.isin ?? "-",
    ltv: `${_ltv ?? "0"}`,
    ltvTooltipMsg: _ltvToolTip,
    name: result?.securityName ?? "-",
    result: "LTV Result",
    ticker:
      `${result?.ticker} ${result?.takaraData?.equityExchangeMarket}` ?? "-",
  };
};

export const toSummaryEquitiesData = (
  result?: EquityLTVCalculationRes
): DisplayItem[] => {
  const lp = result?.ltvCalculation?.lp ?? 0;
  const liquidPeriod = lp > 10 ? 10 : lp;
  const ltvAtImFull = lp < 10 ? "NA" : result?.ltvCalculation?.ltvAtIm ?? 0;
  const ltvAtMcFull = lp < 10 ? "NA" : result?.ltvCalculation?.ltvAtMc ?? 0;
  const ltvAtSmFull = lp < 10 ? "NA" : result?.ltvCalculation?.ltvAtSl ?? 0;
  const lastClosingPrice = result?.marketData?.pxYestClose ?? "";


  return [
    {
      label: "Country",
      value: result?.takaraData?.country ?? "-",
    },
    {
      label: "Security Type",
      value: result?.takaraData?.assetType ?? "-",
    },
    {
      label: "Market",
      value: result?.takaraData?.equityExchangeMarket ?? "-",
    },
    {
      label: "Last Close Price",
      value: `${Number(lastClosingPrice).toFixed(2)}` ?? 0,
    },
    {
      label: "Market Cap (USD)",
      value: toCommaSeprated(result?.ltvCalculation?.curMktCap ?? 0),
    },
    {
      label: "260 Days Volatility (%)",
      value: result?.marketData?.volatility260dCalc ?? "-",
    },
    {
      label: "Exchange Rate",
      value: (roundDownQuantity(result?.assetCrncyExchangeRate) ?? 0),
    },
    {
      label: "LTV at IM in Full Equity Financing",
      value: `${ltvAtImFull}` ?? "-",
    },
    {
      label: "LTV at MC in Full Equity Financing",
      value: `${ltvAtMcFull}` ?? 0,
    },
    {
      label: "LTV at SL in Full Equity Financing",
      value: `${ltvAtSmFull}` ?? 0,
    },
    {
      label: "Liquidation Period",
      value: `${liquidPeriod.toFixed(6)}` ?? 0,
    },
    {
      label: "3 month Average Liquidity",
      value: toCommaSeprated(Math.round(result?.ltvCalculation?.volumeAvg3m ?? 0) ?? 0),
    },
    {
      label: "3 month Average Traded Value (USD)",
      value: toCommaSeprated(
        result?.ltvCalculation?.avgDailyValueTraded3m ?? 0
      ),
    },
  ];
};

export const toLTVValuesData = (
  result?: EquityLTVCalculationRes
): DisplayItem[] => {
  const ltvCalculation = result?.ltvCalculation;

  const isOverride =
    ltvCalculation?.overrideCalculationResult &&
    ltvCalculation?.overrideCalculationResult?.hasOverride;
  const _ltvAtIm = isOverride
    ? ltvCalculation?.overrideCalculationResult.ltvAtIm
    : ltvCalculation?.ltvAtIm;

  const _ltvToolTip = isOverride
    ? `Generic LTV: ${ltvCalculation?.ltvAtIm}%`
    : "";

  const _ltvAtMc = isOverride
    ? ltvCalculation?.overrideCalculationResult.ltvAtMc
    : ltvCalculation?.ltvAtMc;
  const _ltvAtSl = isOverride
    ? ltvCalculation?.overrideCalculationResult.ltvAtSl
    : ltvCalculation?.ltvAtSl;
  return [
    {
      label: "Initial Margin",
      value: `${_ltvAtIm}%`,
      tooltipMsg: _ltvToolTip,
    },
    {
      label: "Margin Call",
      value: `${_ltvAtMc}%`,
    },
    {
      label: "Stop Loss",
      value: `${_ltvAtSl}%`,
    },
  ];
};
export const toSummaryValuesData = (
  result?: EquityLTVCalculationRes,
  quantity?: Number | string
): DisplayItem[] => {
  const tradedValue = result?.ltvCalculation?.volumeAvg3m ?? 0;
  const qty = quantity === "" ? tradedValue / 10 : quantity ?? 0;
  const ltvCalculation = result?.ltvCalculation;
  const override = ltvCalculation?.overrideCalculationResult;
  const marketData = result?.marketData;
  const exchangeRate = result?.assetCrncyExchangeRate ?? 0;

  const mvCalc = marketData?.pxLast
    ? (marketData.pxLast / exchangeRate) * Number(qty || 0)
    : 0;
  const mv =
    marketData?.pxLast && qty
      ? toSetCommaFormatPercentage(String(Math.round(mvCalc)))
      : "-";

  let cvCalculation = 0;
  if (qty !== undefined || qty !== null) {
    const ltvAtIm = override?.hasOverride
      ? override?.ltvAtIm
      : ltvCalculation?.ltvAtIm;
    if (ltvAtIm) {
      cvCalculation = (ltvAtIm / 100) * mvCalc;
    }
  }

  const cv = qty ? cvCalculation === 0 ? "0" : toSetCommaFormatPercentage(String(Math.round(cvCalculation))) : "-";

  return [
    {
      label: "Quantity",
      value: qty ? toCommaSeprated(String(Math.floor(Number(qty))) ?? "") : "-",
    },
    {
      label: "Market Value (USD)",
      value: mv,
    },
    {
      label: "Collateral Value (USD)",
      value: cv,
    },
  ];
};

export const toOverrideData = (
  result?: EquityLTVCalculationRes
): OverrideData => {
  const ltvCalculation = result?.ltvCalculation;

  const _overrideMsg = isOverride(ltvCalculation)
    ? `This data is correct as of market close on ${result?.marketData?.marketCloseDate}`
    : "";

  const _ltvToolTip = isOverride(ltvCalculation)
    ? `Generic LTV: ${ltvCalculation?.overrideCalculationResult.ltvAtIm}%`
    : "";

  return { message: _overrideMsg, tooltipMsg: _ltvToolTip };
};
export const toDisclaimerData = (
  result?: EquityLTVCalculationRes
): DisplayListItem => {
  const { ltvCalculation } = result || {};
  const { disclaimer } = ltvCalculation || {};
  const reason = ltvCalculation?.overrideCalculationResult?.reason;
  const disclaimers: string[] = reason ? [reason] : [];
  const notes: string[] = disclaimer ? [ disclaimer] : [];

  return {
    label: "Disclaimers",
    value: disclaimers,
    notes: notes,
  };
};
