export const toCapitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatDateToMachine = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, `0`);
  const day = String(date.getDate()).padStart(2, `0`);

  return `${year}-${month}-${day}`;
};

const getMonthNameByIndex = (index: number): string => {
  switch (index) {
    case 0: return `January`;
    case 1: return `February`;
    case 2: return `March`;
    case 3: return `April`;
    case 4: return `May`;
    case 5: return `June`;
    case 6: return `July`;
    case 7: return `August`;
    case 8: return `September`;
    case 9: return `October`;
    case 10: return `November`;
    case 11: return `December`;
    default: return `Unknown`;
  }
};

export const formatDateToHuman = (date: Date): string => {
  const monthName = getMonthNameByIndex(date.getMonth());
  const year = date.getFullYear();

  return `${monthName} ${year}`;
};
