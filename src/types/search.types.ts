type LTVSearchType = "Active" | "InActive";

export interface LTVSearch {
  // id: string;
  // category: string;
  // value1: string;
  // value2: string;
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
