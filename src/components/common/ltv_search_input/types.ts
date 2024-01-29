export type LTVCalculationTypes = "UNKNOWN" | "LOADING" | "SUCCESS" | "FAILED";
export type NoDataFoundOption =
  | "UNKNOWN"
  | "LESS_THAN_3_CHAR"
  | "NO_MATCH"
  | "LOADING"
  | "SUCCESS"
  | "FAILED";

import { LTVSearch } from "@/services/search_services";

export interface LTVCalculationViewProps {
  className?: string;
  searchKey: string;
  loading: LTVCalculationTypes;
}

export interface LTVSearchInputProps {
  onSelect?: (selectedItem?: LTVSearch) => void;
}
