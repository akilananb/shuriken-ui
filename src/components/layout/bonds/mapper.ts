import { LTVCalculationRes } from "@/types/LTVCalculation";
import {
  DisplayItem,
  HeaderData,
  OverrideData,
  DisplayListItem,
} from "./types";
import {
  toCommaSeprated,
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
  const getValueOrDefault = (
    value: any,
    defaultValue: string = "-"
  ): string => {
    return value !== undefined && value !== null ? value : defaultValue;
  };

  const getIssueSize = (
    issueSizeUsd?: number,
    exchangeRate?: number
  ): string => {
    if (issueSizeUsd !== undefined && exchangeRate !== undefined) {
      const issueSizeMilUSD = issueSizeUsd / 1000000;
      return `${toCommaSeprated(issueSizeMilUSD)} (USD Mil)`;
    }
    return "-";
  };

  return [
    {
      label: "Security Type",
      value: getValueOrDefault(result?.securityType),
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
      value: getValueOrDefault(result?.ltvCalculation?.issueRating),
    },
    {
      label: "S&P / Moody's Issuer Rating",
      value: getValueOrDefault(result?.ltvCalculation?.issuerRating),
    },
    {
      label: "Rating Used",
      value: getValueOrDefault(result?.ltvCalculation?.ratingUsed),
    },
    {
      label: "Issuer Name",
      value: getValueOrDefault(result?.bondDetail?.issuerName),
    },
    {
      label: "Loss Absorption",
      value: getValueOrDefault(result?.bondDetail?.lossAbsorption),
    },
    {
      label: "144A Flag",
      value: getValueOrDefault(result?.bondDetail?.rule144aFlag),
    },
    {
      label: "Private Placement",
      value: getValueOrDefault(result?.bondDetail?.privatePlacementFlag),
    },
    {
      label: "Market Sector",
      value: getValueOrDefault(result?.bondDetail?.marketSectorDes),
    },
    {
      label: "Bond Type",
      value: getValueOrDefault(result?.ltvCalculation?.bondType),
    },
    {
      label: "Bond Grade",
      value: getValueOrDefault(result?.ltvCalculation?.bondGrade),
    },
    {
      label: "Country Classification",
      value: getValueOrDefault(result?.ltvCalculation?.countryClassification),
    },
    {
      label: "Country of Risk",
      value: getValueOrDefault(result?.bondDetail?.countryOfRisk),
    },
    {
      label: "Issue Size",
      value: getIssueSize(
        result?.ltvCalculation?.issueSizeUsd,
        result?.marketData?.exchangeRate
      ),
    },
    {
      label: "Spread",
      value: "" + Number(result?.ltvCalculation?.spread ?? 0).toFixed(2) ?? "-",
    },

    {
      label: "Coupon Type",
      value: getValueOrDefault(result?.bondDetail?.cpnTyp),
    },
  ];
};

export const toOtherInfoData = (result?: LTVCalculationRes): DisplayItem[] => {
  const getValueOrDefault = (
    value: any,
    defaultValue: string = "-"
  ): string => {
    return value !== undefined && value !== null ? value : defaultValue;
  };
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
      value: getValueOrDefault(result?.bondDetail?.mtyTyp),
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
      value: getValueOrDefault(result?.bondDetail?.industrySectorCode),
    },
    {
      label: "Industry Group",
      value: getValueOrDefault(result?.bondDetail?.industryGroupCode),
    },
    {
      label: "Guarantor Ticker",
      value: `${getValueOrDefault(
        result?.bondDetail?.guarantor?.ticker
      )} ${getValueOrDefault(result?.bondDetail?.guarantor?.exchange)}`,
    },
    {
      label: "Issuer Parent Ticker",
      value: `${getValueOrDefault(
        result?.bondDetail?.issueParent?.ticker
      )} ${getValueOrDefault(result?.bondDetail?.issueParent?.exchange)}`,
    },
    {
      label: "Ultimate Parent Ticker",
      value: `${getValueOrDefault(
        result?.bondDetail?.ultimateIssuerParent?.ticker
      )} ${getValueOrDefault(
        result?.bondDetail?.ultimateIssuerParent?.exchange
      )}`,
    },
    {
      label: "Moody's Rating (Ultimate Parent)",
      value: getValueOrDefault(
        result?.bondDetail?.ultimateIssuerParent?.rating?.rtgMoodyLongTerm
      ),
    },
    {
      label: "S&P Rating (Ultimate Parent)",
      value: getValueOrDefault(
        result?.bondDetail?.ultimateIssuerParent?.rating?.rtgSpIssuerCredit
      ),
    },
    {
      label: "Moody’s Rating (Issue)",
      value: getValueOrDefault(result?.bondDetail?.issueRating.rtgMoody),
    },
    {
      label: "S&P Rating (Issue)",
      value: getValueOrDefault(result?.bondDetail?.issueRating.rtgSp),
    },
    {
      label: "Moody’s Rating (Issuer Parent)",
      value: getValueOrDefault(
        result?.bondDetail?.issueParent?.rating?.rtgMoodyLongTerm
      ),
    },
    {
      label: "S&P Rating (Issuer Parent)",
      value: getValueOrDefault(
        result?.bondDetail?.issueParent?.rating?.rtgSpIssuerCredit
      ),
    },
    {
      label: "Moody’s Rating (Guarantor)",
      value: getValueOrDefault(
        result?.bondDetail?.guarantor?.rating?.rtgMoodyLongTerm
      ),
    },
    {
      label: "S&P Rating (Guarantor)",
      value: getValueOrDefault(
        result?.bondDetail?.guarantor?.rating?.rtgSpIssuerCredit
      ),
    },
    {
      label: "Called Date",
      value: getValueOrDefault(result?.marketData?.calledDt),
    },
    // {
    //   label: "Defaulted",
    //   value: "N",
    // },
    // {
    //   label: "Sovereign",
    //   value: "N",
    // },
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
  quantity?: number
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
