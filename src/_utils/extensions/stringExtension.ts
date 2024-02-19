import { BASE_NAME } from "@/config/appConfig";
export {};
declare global {
  interface String {
    toPublicPath(): string;
    isNullOrEmpty(): Boolean;
    toNullOrDefault(defaultValue: string): string;
  }
}

String.prototype.toPublicPath = function () {
  return `${BASE_NAME}${this}`;
};

String.prototype.isNullOrEmpty = function () {
  return [undefined, "", "null"].includes(this.toString());
};

String.prototype.toNullOrDefault = function (defaultValue: string) {
  return [undefined, "", "null"].includes(this.toString()) ? "" : "";
};
