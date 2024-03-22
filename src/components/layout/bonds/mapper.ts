import { LTVCalculationRes } from "@/types/LTVCalculation";
import {
  DisplayItem,
  HeaderData,
  OverrideData,
  DisplayListItem,
} from "./types";
import {
  toCommaSeprated,
  toSetCommaFormat,
  toSetCommaFormatPercentage,
} from "@/_utils/stringUtils";
import { getDifferenceInYears } from "@/_utils/dateUtils";

export const toLTVFields = (_results: LTVCalculationRes) => {
  return {};
};

export const isOverride = (ltvCalculation: any) => {
  return ltvCalculation?.override && ltvCalculation?.override?.hasOverride;
};

export const toHeaderData = (result?: LTVCalculationRes): HeaderData => {
  const ltvCalculation = result?.ltvCalculation;

  const _ltv = isOverride(ltvCalculation)
    ? ltvCalculation?.override.ltvAtIm
    : ltvCalculation?.ltvAtIm;

  const _ltvToolTip = isOverride(ltvCalculation)
    ? `Generic LTV: ${ltvCalculation?.ltvAtIm}%`
    : "";

  return {
    currency: result?.marketData?.currency ?? "-",
    exchange: result?.exchange ?? "-",
    isin: result?.isin ?? "-",
    ltv: `${_ltv ?? "0"}`,
    ltvTooltipMsg: _ltvToolTip,
    name: result?.securityName ?? "-",
    result: "LTV Result",
    ticker: result?.ticker ?? "-",
  };
};

export const toOverrideData = (result?: LTVCalculationRes): OverrideData => {
  const ltvCalculation = result?.ltvCalculation;

  const _overrideMsg = isOverride(ltvCalculation)
    ? `This data is correct as of market close on ${result?.marketData?.marketCloseDate}`
    : "";

  const _ltvToolTip = isOverride(ltvCalculation)
    ? `Generic LTV: ${ltvCalculation?.override.ltvAtIm}%`
    : "";

  return { message: _overrideMsg, tooltipMsg: _ltvToolTip };
};

export const toSummaryDetailData = (
  result?: LTVCalculationRes
): DisplayItem[] => {
  return [
    {
      label: "Maturity date",
      value: result?.ltvCalculation?.isPerpetual === true ? "Perpetual" : result?.bondDetail?.maturityDate ?? "",
    },
    {
      label: "Maturity Type",
      value: result?.bondDetail?.mtyTyp ?? "-",
    },
    {
      label: "Issue Rating (S&P / Moody's)",
      value: `${(result?.ltvCalculation?.issueRating?.snp !== "" && result?.ltvCalculation?.issueRating?.snp !== undefined) ? result?.ltvCalculation?.issueRating?.snp : "Unrated"} /
      ${(result?.ltvCalculation?.issueRating?.moodys !== "" && result?.ltvCalculation?.issueRating?.moodys !== undefined) ? result?.ltvCalculation?.issueRating?.moodys : "Unrated"}`,
    },
    {
      label: "Issuer Rating (S&P / Moody's)",
      value: `${result?.ltvCalculation?.issuerRating?.snp !== "" && result?.ltvCalculation?.issuerRating?.snp !== undefined ? result?.ltvCalculation?.issuerRating?.snp : "Unrated"} / ${result?.ltvCalculation?.issuerRating?.moodys !== "" && result?.ltvCalculation?.issuerRating?.moodys !== undefined ? result?.ltvCalculation?.issuerRating?.moodys : "Unrated"}`,
    },
    {
      label: "Subordinated",
      value: result?.bondDetail?.isSubordinated ? "Y" : "N",
    },
    {
      label: "Called Date",
      value: result?.marketData?.calledDt ?? "-",
    },
    {
      label: "Last Close Price",
      value: toCommaSeprated(result?.marketData?.pxLast ?? 0),
    },
    {
      label: "Issuer Name",
      value: result?.bondDetail?.issuerName ?? "-",
    },
    {
      label: "Loss Absorption",
      value: result?.bondDetail?.lossAbsorption ?? "-",
    },
    {
      label: "144A Flag",
      value: result?.bondDetail?.rule144aFlag ?? "-",
    },
    {
      label: "Private Placement",
      value: result?.bondDetail?.privatePlacementFlag ?? "-",
    },
    {
      label: "Market Sector",
      value: result?.bondDetail?.marketSectorDes ?? "-",
    },
    {
      label: "Bond Type",
      value: result?.ltvCalculation?.bondType ?? "-",
    },
    {
      label: "Bond Grade",
      value: result?.ltvCalculation?.bondGrade ?? "-",
    },
    {
      label: "Country Classification",
      value: result?.ltvCalculation?.countryClassification ?? "-",
    },
    {
      label: "Country of Risk",
      value: result?.bondDetail?.countryOfRisk ?? "-",
    },
    {
      label: "Issue Size",
      value: `${toCommaSeprated(
        result?.ltvCalculation?.issueSizeUsd && result?.marketData?.exchangeRate
          ? result.ltvCalculation.issueSizeUsd / 1000000
          : "-"
      )} (USD Mil)`,
    },
    {
      label: "Spread",
      value: "" + Number(result?.ltvCalculation?.spread ?? 0).toFixed(2) ?? "-",
    },

    {
      label: "Coupon Type",
      value: result?.bondDetail?.cpnTyp ?? "-",
    },
    {
      label: "Exchange Rate",
      value: toCommaSeprated(
        Number(result?.marketData?.exchangeRate ?? 0).toFixed(2)
      ),
    },
    {
      label: "Amount Issued",
      value: toCommaSeprated(result?.bondDetail?.amountIssued ?? 0),
    },

    {
      label: "Capital Contingent Security",
      value:
        result?.bondDetail?.capitalContingentSecurity &&
          result?.bondDetail?.capitalContingentSecurity === "Y"
          ? "Y"
          : "N",
    },
    {
      label: "CDO",
      value:
        result?.bondDetail?.marketSectorDes &&
          result?.bondDetail?.marketSectorDes.toUpperCase() === "MTGE"
          ? "Y"
          : "N",
    },
    {
      label: "Industry Sector",
      value: result?.bondDetail?.industrySectorCode ?? "-",
    },
    {
      label: "Industry Group",
      value: result?.bondDetail?.industryGroupCode ?? "-",
    },
    {
      label: "Guarantor Ticker",
      value: `${result?.bondDetail?.guarantor?.ticker ?? "-"}`,
    },
    {
      label: "Issuer Parent Ticker",
      value: `${result?.bondDetail?.issueParent?.ticker ?? "-"}`,
    },
    {
      label: "Ultimate Parent Ticker",
      value: `${result?.bondDetail?.ultimateIssuerParent?.ticker ?? "-"}`,
    },
    {
      label: "Defaulted",
      value: "N",
    },
    {
      label: "Sovereign",
      value: "N",
    },
  ];
};

export const toLTVValuesData = (result?: LTVCalculationRes): DisplayItem[] => {
  const ltvCalculation = result?.ltvCalculation;

  const isOverride =
    ltvCalculation?.override && ltvCalculation?.override?.hasOverride;
  const _ltvAtIm = isOverride
    ? ltvCalculation?.override.ltvAtIm
    : ltvCalculation?.ltvAtIm;

  const _ltvToolTip = isOverride
    ? `Generic LTV: ${ltvCalculation?.ltvAtIm}%`
    : "";

  const _ltvAtMc = isOverride
    ? ltvCalculation?.override.ltvAtMc
    : ltvCalculation?.ltvAtMc;
  const _ltvAtSl = isOverride
    ? ltvCalculation?.override.ltvAtSl
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
  result?: LTVCalculationRes,
  quantity?: Number
): DisplayItem[] => {
  const ltvCalculation = result?.ltvCalculation;
  const override = ltvCalculation?.override;
  const marketData = result?.marketData;

  const mvCalc = marketData?.pxLast
    ? (marketData.pxLast / marketData.exchangeRate / 100) *
    Number(quantity || 0)
    : 0;
  const mv =
    marketData?.pxLast && quantity
      ? toSetCommaFormatPercentage(String(Math.round(mvCalc)))
      : "-";

  let cvCalculation = 0;
  if (quantity !== undefined || quantity !== null) {
    const ltvAtIm = override?.hasOverride
      ? override?.ltvAtIm
      : ltvCalculation?.ltvAtIm;
    if (ltvAtIm) {
      cvCalculation = (ltvAtIm / 100) * mvCalc;
    }
  }

  const cv = quantity ? String(Math.round(cvCalculation)) : "-";

  return [
    {
      label: "Quantity (Face Value)",
      value: quantity ? toCommaSeprated(String(quantity) ?? "") : "-",
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

export const toDisclaimerData = (
  result?: LTVCalculationRes
): DisplayListItem => {
  const { ltvCalculation } = result || {};
  const { disclaimer } = ltvCalculation || {};
  const reason = ltvCalculation?.override?.reason;
  const disclaimers: string[] = [disclaimer ?? "", reason ?? ""];

  return {
    label: "Disclaimers",
    value: disclaimers,
  };
};
