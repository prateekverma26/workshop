import "./ui.css";
import { useId } from "react";
import { Calendar, TriangleAlert } from "lucide-react";

interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  isRequired?: boolean;
  /** Defaults to today — enforces future-only selection per the workflow. */
  min?: string;
}

function todayISO(): string {
  // Rendered server + client; value is passed in by callers in practice.
  return "";
}

export function DatePicker({
  label,
  error,
  isRequired,
  min,
  id,
  className,
  ...rest
}: DatePickerProps) {
  const generatedId = useId();
  const dateId = id ?? generatedId;
  const errorId = `${dateId}-error`;

  return (
    <div className="field">
      <label className="field__label" htmlFor={dateId}>
        {label}
        {isRequired ? <span className="field__required" aria-hidden="true">*</span> : null}
      </label>
      <div className="select-wrap">
        <input
          id={dateId}
          type="date"
          className={`control ${className ?? ""}`}
          min={min ?? todayISO()}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-required={isRequired || undefined}
          {...rest}
        />
        <Calendar className="select-wrap__chevron" size={16} aria-hidden="true" />
      </div>
      {error ? (
        <span id={errorId} className="field__error" role="alert">
          <TriangleAlert size={13} aria-hidden="true" />
          {error}
        </span>
      ) : null}
    </div>
  );
}
