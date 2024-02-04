export const toSetCommaFormat = (value) => {
  return value
    .replace(/[^0-9\.]/g, "")
    .replace(/\./g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const toRemoveCommaFormat = (value) => {
  return value
    .replace(/[^0-9\.]/g, "")
    .replace(/\./g, "")
    .replace(/\,/g, "");
};
