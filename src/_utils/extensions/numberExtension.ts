export {};
declare global {
  interface Number {
    isNullToDefaultValue(defaultValue: number): string;
  }
}

Number.prototype.isNullToDefaultValue = function (
  defaultValue: number
): string {
  const num: number | null | undefined = null;

  return `${
    [null, undefined, ""].includes(`${this}`) ? defaultValue : this ?? ""
  }`;
};
