import "./ui.css";
import { useId } from "react";
import { Check } from "lucide-react";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode;
  error?: boolean;
}

export function Checkbox({ label, error, id, className, ...rest }: CheckboxProps) {
  const generatedId = useId();
  const boxId = id ?? generatedId;

  return (
    <label
      className={`checkbox ${error ? "checkbox--error" : ""} ${className ?? ""}`}
      htmlFor={boxId}
    >
      <input
        id={boxId}
        type="checkbox"
        className="checkbox__input visually-hidden"
        aria-invalid={error || undefined}
        {...rest}
      />
      <span className="checkbox__box" aria-hidden="true">
        <Check size={14} strokeWidth={3} />
      </span>
      <span className="checkbox__label">{label}</span>
    </label>
  );
}
