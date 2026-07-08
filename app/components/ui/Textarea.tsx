"use client";

import "./ui.css";
import { useId } from "react";
import { TriangleAlert } from "lucide-react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
  isRequired?: boolean;
  maxChars?: number;
  value: string;
}

export function Textarea({
  label,
  hint,
  error,
  isRequired,
  maxChars,
  value,
  id,
  className,
  ...rest
}: TextareaProps) {
  const generatedId = useId();
  const areaId = id ?? generatedId;
  const hintId = `${areaId}-hint`;
  const errorId = `${areaId}-error`;
  const count = value.length;
  const isOver = maxChars !== undefined && count > maxChars;

  return (
    <div className="field">
      <label className="field__label" htmlFor={areaId}>
        {label}
        {isRequired ? <span className="field__required" aria-hidden="true">*</span> : null}
      </label>
      <textarea
        id={areaId}
        className={`control control--textarea ${className ?? ""}`}
        value={value}
        aria-invalid={error || isOver ? true : undefined}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        aria-required={isRequired || undefined}
        {...rest}
      />
      {maxChars !== undefined ? (
        <span
          className={`textarea__counter ${isOver ? "textarea__counter--over" : ""}`}
          aria-live="polite"
        >
          {count}/{maxChars}
        </span>
      ) : null}
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
