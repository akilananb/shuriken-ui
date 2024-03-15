import { LTVCalculationRes } from "@/types/LTVCalculation";

export interface BondsProps {
  isin?: string;
  securityType?: string;
  quantity?: Number;
}

export interface SearchInput{
  isin: string;
  quantity: Number;
}
export interface MutiSearchInput{
  searchInput: SearchInput[];
}

export interface BondsChildProps extends BondsProps {
  Itvfields: any;
  ltvData?: LTVCalculationRes;
}

export interface HeaderData {
  result: string;
  name: string;
  ltv: string;
  ltvTooltipMsg: string;
  isin: string;
  ticker: string;
  exchange: string;
  currency: string;
}

export interface HeaderProps {
  Itvfields: any;
  data: HeaderData;
}

export interface OverrideData {
  message: string;
  tooltipMsg: string;
}
export interface TabsProps {
  overrideData: OverrideData;
}
export interface DisplayItem {
  label: string;
  value: string;
  key?: string;
  color?: "RED" | "BLACK";
  tooltipMsg?: string;
}

export interface DisplayListItem {
  label: string;
  value: string[];
  key?: string;
  color?: "RED" | "BLACK";
  tooltipMsg?: string;
}

export interface DetailVerticalDisplayCardProps {
  data: DisplayItem[];
  colSize: number;
  title: string;
  labelClassName: string;
  valueClassName: string;
}

export interface LTVValueCardProps {
  data: DisplayItem[];
  title: string;
  subTitle: string;
  className: string;
  cardValue: string;
}

export interface DisclaimerProps {
  title: string;
  disclaimer: DisplayListItem;
}

