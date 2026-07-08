import "./ui.css";
import { useId } from "react";
import { ChevronDown, TriangleAlert } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  hint?: string;
  error?: string;
  isRequired?: boolean;
  placeholder?: string;
}

export function Select({
  label,
  options,
  hint,
  error,
  isRequired,
  placeholder,
  id,
  className,
  ...rest
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const hintId = `${selectId}-hint`;
  const errorId = `${selectId}-error`;
  const isControlled = rest.value !== undefined;

  return (
    <div className="field">
      <label className="field__label" htmlFor={selectId}>
        {label}
        {isRequired ? <span className="field__required" aria-hidden="true">*</span> : null}
      </label>
      <div className="select-wrap">
        <select
          id={selectId}
          className={`control ${className ?? ""}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          aria-required={isRequired || undefined}
          defaultValue={isControlled ? undefined : ""}
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="select-wrap__chevron"
          size={16}
          aria-hidden="true"
        />
      </div>
      {hint && !error ? (
        <span id={hintId} className="field__hint">
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={errorId} className="field__error" role="alert">
          <TriangleAlert size={13} aria-hidden="true" />
          {error}
        </span>
      ) : null}
    </div>
  );
}
