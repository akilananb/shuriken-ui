import { LTVCalculationRes } from "@/types/LTVCalculation";
import { DisplayItem, HeaderData, OverrideData } from "./types";
import { toCommaSeprated, toSetCommaFormat } from "@/_utils/stringUtils";
import { getDifferenceInYears } from "@/_utils/dateUtils";

export const toLTVFields = (_results: LTVCalculationRes) => {
  return {};
};

export const toHeaderData = (result?: LTVCalculationRes): HeaderData => {
  const ltvCalculation = result?.ltvCalculation;

  const _ltv = ltvCalculation?.override
    ? ltvCalculation?.override.ltvAtIm
    : ltvCalculation?.ltvAtIm;

  const _ltvToolTip = ltvCalculation?.override
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

  const _overrideMsg = ltvCalculation?.override
    ? `This data is correct as of market close on ${result?.marketData?.marketCloseDate}`
    : "";

  const _ltvToolTip = ltvCalculation?.override
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
      value: toCommaSeprated(result?.ltvCalculation?.issueSizeUsd ?? 0),
    },
    {
      label: "Spread",
      value: "" + result?.ltvCalculation?.spread ?? "-",
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
      value: toCommaSeprated(result?.marketData?.exchangeRate ?? 0),
    },
    {
      label: "Amount Issued",
      value: toCommaSeprated(result?.bondDetail?.amountIssue ?? 0),
    },
    {
      label: "Maturity Type",
      value: result?.bondDetail?.maturityType ?? "-",
    },
    {
      label: "Subordinated",
      value: result?.bondDetail?.isSubordinated ? "Y" : "N",
    },
    {
      label: "Capital Contingent Security",
      value: result?.bondDetail?.capitalContingentSecurity ? "Y" : "N",
    },
    {
      label: "CDO",
      value: result?.bondDetail?.cdo ?? "-",
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
      label: "Called",
      value: "N",
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

  const isOverride = ltvCalculation?.override ? true : false;
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
  const mv = result?.marketData?.pxLast ? toSetCommaFormat(String(result.marketData.pxLast/100 * Number(quantity || 0))) : "-";
  const cv = quantity != undefined && result?.ltvCalculation?.ltvAtIm
    ? toSetCommaFormat(String(result.ltvCalculation.ltvAtIm * Number(mv)))
    : "-";
  
  return [
    {
      label: "Quantity",
      value: quantity?.toString() ?? "-",
    },
    {
      label: "MV",
      value: mv,
    },
    {
      label: "CV",
      value: cv,
    },
  ];
};

export const toDisclaimerData = (result?: LTVCalculationRes): DisplayItem => {
  const { ltvCalculation } = result || {};
  const { override } = ltvCalculation || {};

  const reason = override?.reason !== null && override?.reason !== undefined && override?.reason !== "null"
    ? override.reason
    : "-";

  return {
    label: "Disclaimers",
    value: reason,
  };
};
