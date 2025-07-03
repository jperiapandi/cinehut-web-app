import { useCallback, useState } from "react";
import { languages } from "../languages";
import SelectV2 from "./SelectV2";
import { years } from "../constants";

export default function Filter({ language, year, page, onChange }) {
  const [curLang, setCurLang] = useState(language);
  const [curYear, setCurYear] = useState(year);

  const onLanguageChange = (value: string) => {
    setCurLang(value);
    onChange({
      language: value,
      year: curYear,
    });
  };

  const onYearChange = (value: string) => {
    setCurYear(value);
    onChange({
      language: curLang,
      year: value,
    });
  };

  return (
    <div className="filter-container">
      <SelectV2
        title="Select Language"
        options={languages}
        value="en"
        onChange={onLanguageChange}
        required={true}
      />

      <SelectV2
        title="Select Year"
        value={years[0].value}
        options={years}
        required={true}
        onChange={onYearChange}
      />
    </div>
  );
}
