//Common API error
export type ApiError = {
  id: string;
  code: string;
  title?: string;
  detail: string;
};

export type BaseElementAttributes = {
  className?: string;
};
export type Loader = "UNKNOWN" | "LOADING" | "LOADED";
