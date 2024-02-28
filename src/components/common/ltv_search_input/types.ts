export type LTVCalculationTypes = "UNKNOWN" | "LOADING" | "SUCCESS" | "FAILED";
export type NoDataFoundOption =
  | "UNKNOWN"
  | "LESS_THAN_3_CHAR"
  | "NO_MATCH"
  | "LOADING"
  | "SUCCESS"
  | "FAILED";

import { BaseElementAttributes } from "@/_utils/base";
import { CalculationRes, LTVSearch } from "@/services/search_services";
import { HTMLAttributes } from "react";

export interface LTVCalculationViewProps extends BaseElementAttributes {
  loading: LTVCalculationTypes;
  calculationData?: CalculationRes | null;
}

export interface LTVSearchInputProps extends BaseElementAttributes {
  value;
  onSelectedItem?: (selectedItem: LTVSearch | null) => void;
}
