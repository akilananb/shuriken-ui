export const toSetCommaFormat = (value: string): string => {
  return value
    .replace(/[^0-9.]/g, "")
    .replace(/\./g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const toSetCommaFormatPercentage = (value: string): string => {
  return value
    .replace(/[^0-9.]/g, "")
    .replace(/^0+/, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const toRemoveCommaFormat = (value: string): string => {
  return value
    .replace(/[^0-9.]/g, "")
    .replace(/\./g, "")
    .replace(/,/g, "");
};

export const toCommaSeprated = (value: number | string): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const extractNomuraRoles = (text: string): string[] | null => {
  const match = text.match(/\[([^\]]+)\]/);
  if (match && match[1]) {
    // Splitting the matched group by comma and trimming spaces
    return match[1].split(',').map(s => s.trim());
  }
  return null; // Return null if no match is found
}
