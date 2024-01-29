export type LTVCalculationTypes = "UNKNOWN" | "LOADING" | "SUCCESS" | "FAILED";
import { SearchRes } from "@/services/search_services";

export interface LTVCalculationViewProps {
  className?: string;
  searchKey: string;
  loading: LTVCalculationTypes;
}

export interface LTVSearchInputProps {
  onSelect?: (selectedItem?: SearchRes) => void;
}
