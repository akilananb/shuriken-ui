export function getDifferenceInYears(givenDate: string): string {
  const _givenDate = new Date(givenDate);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const givenYear = _givenDate.getFullYear();
  const differenceInYears = givenYear - currentYear;
  return differenceInYears.toString();
}
