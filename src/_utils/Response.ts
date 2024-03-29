import { ApiError, Loader } from "./base";
export class Response<RESULT = any> {
  private _result?: RESULT | null;
  private _error?: ApiError | null;
  private _loader?: Loader | null;

  constructor(result?: RESULT) {
    this._result = result;
  }
  public applyError(error?: ApiError | null) {
    this._error = error;
    return this;
  }
  public applyLoader(_loader?: Loader) {
    this._loader = _loader;
    return this;
  }
  public applyResponse(response?: RESULT | null) {
    this._result = response;
    return this;
  }

  public hasError(): boolean {
    return typeof this?._error !== "undefined" && this?._error !== null;
  }

  public hasResult(): boolean {
    return typeof this?._result !== "undefined" && this?._result !== null;
  }

  public hasLoader(): boolean {
    return typeof this?._loader !== "undefined" && this?._loader !== null;
  }

  public isLoading(): boolean {
    return typeof this?._loader !== "undefined" && this?._loader == "LOADING";
  }

  public getResponse(): RESULT | null | undefined {
    return this?._result;
  }

  public getError(): ApiError | null {
    return this?._error ?? null;
  }

  public getLoader(): Loader | null | undefined {
    return this?._loader;
  }
}
