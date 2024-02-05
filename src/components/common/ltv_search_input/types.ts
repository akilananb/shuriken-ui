export type LTVCalculationTypes = "UNKNOWN" | "LOADING" | "SUCCESS" | "FAILED";
export type NoDataFoundOption =
  | "UNKNOWN"
  | "LESS_THAN_3_CHAR"
  | "NO_MATCH"
  | "LOADING"
  | "SUCCESS"
  | "FAILED";

import { BaseElementAttributes } from "@/_utils/base";
import { LTVSearch } from "@/services/search_services";
import { HTMLAttributes } from "react";

export interface LTVCalculationViewProps extends BaseElementAttributes {
  searchKey: string;
  loading: LTVCalculationTypes;
}

export interface LTVSearchInputProps extends BaseElementAttributes {
  onSelectedItem?: (selectedItem: LTVSearch | null) => void;
}
