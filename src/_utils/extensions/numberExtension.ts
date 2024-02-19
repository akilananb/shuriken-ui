export {};
declare global {
  interface Number {
    isNullToDefaultValue(defaultValue: Number): string;
  }
}

Number.prototype.isNullToDefaultValue = function (
  defaultValue: Number
): string {
  const num: number | null | undefined = null;

  return `${
    [null, undefined, ""].includes(`${this}`) ? defaultValue : this ?? ""
  }`;
};
