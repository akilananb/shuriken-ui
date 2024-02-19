type LTVSearchType = "Active" | "InActive";

export interface LTVSearch {
  securityName: string;
  isin: string;
  ticker: string;
  securityType: string;
  status: string;
  exchange: string;
}

export interface SearchRes {
  size: number;
  payLoad: LTVSearch[];
}

export interface CalculationRes {
  status: string;
  message: string;
  data: {
    result: {
      ltv: number;
    };
  };
}
