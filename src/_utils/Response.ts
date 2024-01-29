import { ApiError, Loader } from "./base";
export class Response<RESULT = any> {
  private _result?: RESULT | null;
  private _error?: ApiError[] | null;
  private _loader?: Loader | null;

  constructor(result?: RESULT) {
    this._result = result;
  }
  public applyError(err?: any) {
    const error = err?.response?.data?.errors ?? [];
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

  public getError(): ApiError[] | null | undefined {
    return this?._error;
  }

  public getLoader(): Loader | null | undefined {
    return this?._loader;
  }

  public getErrorMessage(
    customMessages?: { code: string; message: string }[]
  ): string | null | undefined {
    return this?._error
      ?.map((err) => {
        let customMessage = customMessages?.find(
          (cusErr) => cusErr?.code == err?.code
        );
        if (customMessage) {
          return { ...err, ...{ detail: customMessage?.message } };
        }
        return err;
      })
      ?.flatMap((err) => err?.detail)
      .join(" | ");
  }
  public throwError(customMessages?: { code: string; message: string }[]) {
    if (this.hasError()) {
      const msg = this.getErrorMessage(customMessages);
      throw { errorMsg: msg };
    }
  }
}
