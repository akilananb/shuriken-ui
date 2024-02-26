export const toSetCommaFormat = (value) => {
  return value
    .replace(/[^0-9\.]/g, "")
    .replace(/\./g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const toSetCommaFormatPercentage = (value) => {
  return value
    .replace(/[^0-9\.]/g, "")
    .replace(/^0+/, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const toRemoveCommaFormat = (value) => {
  return value
    .replace(/[^0-9\.]/g, "")
    .replace(/\./g, "")
    .replace(/\,/g, "");
};

export const toCommaSeprated = (value: number | string) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
