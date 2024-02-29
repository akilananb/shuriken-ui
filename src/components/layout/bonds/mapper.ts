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
      label: "Security Type",
      value: result?.securityType ?? "-",
      color: "RED",
    },

    {
      label: "Last Close Price",
      value: toCommaSeprated(result?.marketData?.pxLast ?? 0),
    },
    {
      label: "Years to Maturity",
      value: getDifferenceInYears(result?.bondDetail?.maturityDate ?? ""),
    },
    {
      label: "S&P / Moody's Issue Rating",
      value: result?.ltvCalculation?.issueRating ?? "-",
    },
    {
      label: "S&P / Moody's Issuer Rating",
      value: result?.ltvCalculation?.issuerRating ?? "-",
    },
    {
      label: "Rating Used",
      value: result?.ltvCalculation?.ratingUsed ?? "-",
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
  ];
};

export const toOtherInfoData = (result?: LTVCalculationRes): DisplayItem[] => {
  return [
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
      label: "Maturity Type",
      value: result?.bondDetail?.mtyTyp ?? "-",
    },
    {
      label: "Subordinated",
      value: result?.bondDetail?.isSubordinated ? "Y" : "N",
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
      value: `${result?.bondDetail?.guarantor?.ticker ?? "-"} ${
        result?.bondDetail?.guarantor?.exchange ?? "-"
      }`,
    },
    {
      label: "Issuer Parent Ticker",
      value: `${result?.bondDetail?.issueParent?.ticker ?? "-"} ${
        result?.bondDetail?.issueParent?.exchange ?? "-"
      }`,
    },
    {
      label: "Ultimate Parent Ticker",
      value: `${result?.bondDetail?.ultimateIssuerParent?.ticker ?? "-"} ${
        result?.bondDetail?.ultimateIssuerParent?.exchange ?? "-"
      }`,
    },
    {
      label: "Moody's Rating (Ultimate Parent)",
      value:
        result?.bondDetail?.ultimateIssuerParent?.rating?.rtgMoodyLongTerm ??
        "-",
    },
    {
      label: "S&P Rating (Ultimate Parent)",
      value:
        result?.bondDetail?.ultimateIssuerParent?.rating?.rtgSpIssuerCredit ??
        "-",
    },
    {
      label: "Moody’s Rating (Issue)",
      value: result?.bondDetail?.issueRating.rtgMoody ?? "-",
    },
    {
      label: "S&P Rating (Issue)",
      value: result?.bondDetail?.issueRating.rtgSp ?? "-",
    },
    {
      label: "Moody’s Rating (Issuer Parent)",
      value: result?.bondDetail?.issueParent?.rating?.rtgMoodyLongTerm ?? "-",
    },
    {
      label: "S&P Rating (Issuer Parent)",
      value: result?.bondDetail?.issueParent?.rating?.rtgSpIssuerCredit ?? "-",
    },
    {
      label: "Moody’s Rating (Guarantor)",
      value: result?.bondDetail?.guarantor?.rating?.rtgMoodyLongTerm ?? "-",
    },
    {
      label: "S&P Rating (Guarantor)",
      value: result?.bondDetail?.guarantor?.rating?.rtgSpIssuerCredit ?? "-",
    },
    {
      label: "Called Date",
      value: result?.marketData?.calledDt ?? "-",
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
      label: "At IM",
      value: `${_ltvAtIm}%`,
      tooltipMsg: _ltvToolTip,
    },
    {
      label: "At MC",
      value: `${_ltvAtMc}%`,
    },
    {
      label: "At SL",
      value: `${_ltvAtSl}%`,
    },
  ];
};

export const toSummaryValuesData = (
  result?: LTVCalculationRes,
  quantity?: Number
): DisplayItem[] => {
  const mvCalc = result?.marketData?.pxLast
    ? (result.marketData.pxLast / result.marketData.exchangeRate / 100) *
      Number(quantity || 0)
    : 0;
  const mv =
    result?.marketData?.pxLast && quantity
      ? toSetCommaFormatPercentage(String(Math.round(mvCalc)))
      : "-";
  const cvCalc =
    quantity != undefined && result?.ltvCalculation?.ltvAtIm
      ? (result.ltvCalculation.ltvAtIm / 100) * mvCalc
      : 0;
  const cv =
    quantity && result?.ltvCalculation?.ltvAtIm
      ? toSetCommaFormatPercentage(String(Math.round(cvCalc)))
      : "-";

  return [
    {
      label: "Quantity",
      value: quantity ? toCommaSeprated(String(quantity) ?? "") : "-",
    },
    {
      label: "MV (USD)",
      value: mv,
    },
    {
      label: "CV (USD)",
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
