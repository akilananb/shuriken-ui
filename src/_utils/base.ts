//Common API error
export type ApiError = {
  id: string;
  status?: string;
  code: string;
  title?: string;
  detail: string;
  meta?;
};
export type Loader = "UNKNOWN" | "LOADING" | "LOADED";
