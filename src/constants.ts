import type { SelectOption } from "./components/SelectV2";

export const years = ((): SelectOption[] => {
  let years: SelectOption[] = [];

  const date = new Date();

  //Set This Year
  years.push({
    value: date.getFullYear().toString(),
    label: "This Year",
  });

  //Set Last Year
  date.setFullYear(date.getFullYear() - 1);
  years.push({
    value: date.getFullYear().toString(),
    label: "Last Year",
  });

  for (let i = 2; i <= 5; i++) {
    date.setFullYear(date.getFullYear() - 1);

    years.push({
      value: date.getFullYear().toString(),
      label: date.getFullYear() + "",
    });
  }
  //Before 5 years
  years.push({
    value: `before${date.getFullYear()}`,
    label: `Before ${date.getFullYear()}`,
  });

  return years;
})();
