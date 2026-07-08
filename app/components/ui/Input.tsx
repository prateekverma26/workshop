import "./ui.css";
import { useId } from "react";
import { TriangleAlert } from "lucide-react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  isRequired?: boolean;
}

export function Input({
  label,
  hint,
  error,
  isRequired,
  id,
  className,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  return (
    <div className="field">
      <label className="field__label" htmlFor={inputId}>
        {label}
        {isRequired ? <span className="field__required" aria-hidden="true">*</span> : null}
      </label>
      <input
        id={inputId}
        className={`control ${className ?? ""}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        aria-required={isRequired || undefined}
        {...rest}
      />
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
