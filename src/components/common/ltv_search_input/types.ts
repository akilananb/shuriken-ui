export type LTVCalculationTypes = "UNKNOWN" | "LOADING" | "SUCCESS" | "FAILED";

export interface LTVCalculationViewProps {
  className?: string;
  searchKey: string;
  loading: LTVCalculationTypes;
}
