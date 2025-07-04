import type React from "react";
import { useEffect, useRef, useState, type MouseEventHandler } from "react";

export type SelectOption = {
  value: string;
  label: string;
};
export type SelectProps = {
  title?: string | undefined;
  options: SelectOption[];
  value: string;
  required: boolean;
  onChange?: (value: string) => void | undefined;
};

const SelectV2: React.FC<SelectProps> = ({
  title,
  options,
  value,
  onChange,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const [selValue, setSelValue] = useState(value);
  const selLabel =
    options.find((o) => o.value === selValue)?.label ?? "Not yet selected";
  const [showOptions, setShowOptions] = useState(false);

  if (showOptions) {
    // dialogRef?.current?.showModal();
  } else {
    // dialogRef?.current?.close();
  }

  const onMouseLeaveContainer: MouseEventHandler<HTMLDivElement> = (e)=>{
    e.stopPropagation();
    setShowOptions(false);
  };

  const handleOptionCLick: MouseEventHandler<HTMLOptionElement> = (e) => {
    e.stopPropagation();
    const elm = e.target as HTMLOptionElement;
    setSelValue(elm.value);
    setShowOptions(false);
    // console.log(`Clicked on ${elm.value}`);
    //Call onChange
    if (onChange) {
      onChange(elm?.value);
    }
  };

  const toggleShowOptions: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    console.log(`Register call back for ${title}`);

    return () => {};
  }, []);
  return (
    <>
      <div className="select-v2" onMouseLeave={onMouseLeaveContainer}>
        {title && <div className="title">{title}</div>}
        <div className="selected-label" onClick={toggleShowOptions}>
          {selLabel}
        </div>

        {showOptions && (
          <div ref={dialogRef} className="dropdown-container">
            {showOptions && (
              <div className="options-container">
                {options.map((o) => {
                  return (
                    <option
                      value={o.value}
                      onClick={handleOptionCLick}
                      key={o.value}
                      className={o.value === selValue ? "selected" : ""}
                    >
                      {o.label}
                    </option>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SelectV2;
