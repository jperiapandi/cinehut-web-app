import type { MouseEventHandler } from "react";
import type React from "react";

export type MatButtonProps = {
  icon: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
};
const MatRoundButton: React.FC<MatButtonProps> = ({
  icon,
  disabled,
  onClick,
}) => {
  const children = <span className="material-symbols-outlined">{icon}</span>;

  return disabled ? (
    <div className="mat-round-btn disabled" role="button">
      {children}
    </div>
  ) : (
    <div onClick={onClick} className="mat-round-btn" role="button">
      {children}
    </div>
  );
};

export default MatRoundButton;
