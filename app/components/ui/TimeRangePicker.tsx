import "./ui.css";
import { useId } from "react";
import { ArrowRight, TriangleAlert } from "lucide-react";

interface TimeRangePickerProps {
  label: string;
  fromValue: string;
  toValue: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  error?: string;
  isRequired?: boolean;
}

export function TimeRangePicker({
  label,
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  error,
  isRequired,
}: TimeRangePickerProps) {
  const baseId = useId();
  const fromId = `${baseId}-from`;
  const toId = `${baseId}-to`;
  const errorId = `${baseId}-error`;
  const invalid = Boolean(error) || (Boolean(fromValue && toValue) && toValue <= fromValue);

  return (
    <fieldset className="field" aria-describedby={error ? errorId : undefined}>
      <legend className="field__label">
        {label}
        {isRequired ? <span className="field__required" aria-hidden="true">*</span> : null}
      </legend>
      <div className="time-window">
        <input
          id={fromId}
          type="time"
          className="control"
          value={fromValue}
          aria-label="Start time"
          aria-invalid={invalid || undefined}
          onChange={(e) => onFromChange(e.target.value)}
        />
        <ArrowRight size={16} aria-hidden="true" />
        <input
          id={toId}
          type="time"
          className="control"
          value={toValue}
          aria-label="End time"
          aria-invalid={invalid || undefined}
          onChange={(e) => onToChange(e.target.value)}
        />
      </div>
      {error ? (
        <span id={errorId} className="field__error" role="alert">
          <TriangleAlert size={13} aria-hidden="true" />
          {error}
        </span>
      ) : null}
    </fieldset>
  );
}
