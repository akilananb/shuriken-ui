import { BASE_NAME } from "@/config/appConfig";
export {};
declare global {
  interface String {
    toPublicPath(): string;
  }
}

String.prototype.toPublicPath = function () {
  return `${BASE_NAME}${this}`;
};
