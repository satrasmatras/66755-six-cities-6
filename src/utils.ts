export const toCapitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatDateToMachine = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, `0`);
  const day = String(date.getDate()).padStart(2, `0`);

  return `${year}-${month}-${day}`;
};

const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const getMonthNameByIndex = (index: number): string => {
  return MONTH_NAMES[index];
};

export const formatDateToHuman = (date: Date): string => {
  const monthName = getMonthNameByIndex(date.getMonth());
  const year = date.getFullYear();

  return `${monthName} ${year}`;
};
