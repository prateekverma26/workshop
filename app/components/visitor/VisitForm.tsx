"use client";

import "./visitor.css";
import { useState } from "react";
import { Textarea } from "../ui/Textarea";
import { Select, type SelectOption } from "../ui/Select";
import { DatePicker } from "../ui/DatePicker";
import { TimeRangePicker } from "../ui/TimeRangePicker";
import { Button } from "../ui/Button";

export interface VisitFormValues {
  purpose: string;
  hostDepartment: string;
  date: string;
  timeFrom: string;
  timeTo: string;
}

interface VisitFormProps {
  departments: SelectOption[];
  onSubmit: (values: VisitFormValues) => Promise<void>;
}

const EMPTY: VisitFormValues = {
  purpose: "",
  hostDepartment: "",
  date: "",
  timeFrom: "",
  timeTo: "",
};

export function VisitForm({ departments, onSubmit }: VisitFormProps) {
  const [values, setValues] = useState<VisitFormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof VisitFormValues, string>>>({});
  const [hasSummaryError, setHasSummaryError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function set<K extends keyof VisitFormValues>(key: K, value: VisitFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof VisitFormValues, string>> = {};
    if (values.purpose.trim().length < 10)
      next.purpose = "Describe your purpose in at least 10 characters.";
    if (!values.hostDepartment) next.hostDepartment = "Select the host department.";
    if (!values.date) {
      next.date = "Choose a visit date.";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(values.date) < today) next.date = "Choose today or a future date.";
    }
    if (!values.timeFrom || !values.timeTo || values.timeTo <= values.timeFrom)
      next.timeFrom = "Set a valid time window (end after start).";
    setErrors(next);
    const ok = Object.keys(next).length === 0;
    setHasSummaryError(!ok);
    return ok;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);
  }

  return (
    <form className="request-form" onSubmit={handleSubmit} noValidate>
      <div className="request-form__grid">
        <Textarea
          label="Purpose of visit"
          value={values.purpose}
          onChange={(e) => set("purpose", e.target.value)}
          error={errors.purpose}
          maxChars={200}
          isRequired
        />

        <Select
          label="Host department"
          options={departments}
          placeholder="Select a department"
          onChange={(e) => set("hostDepartment", e.target.value)}
          error={errors.hostDepartment}
          isRequired
        />

        <div className="request-form__row">
          <DatePicker
            label="Visit date"
            value={values.date}
            onChange={(e) => set("date", e.target.value)}
            error={errors.date}
            isRequired
          />
          <TimeRangePicker
            label="Time window"
            fromValue={values.timeFrom}
            toValue={values.timeTo}
            onFromChange={(v) => set("timeFrom", v)}
            onToChange={(v) => set("timeTo", v)}
            error={errors.timeFrom}
            isRequired
          />
        </div>
      </div>

      {hasSummaryError ? (
        <p className="request-form__error-summary" role="alert">
          Please fix the highlighted fields before submitting.
        </p>
      ) : null}

      <Button type="submit" isLoading={isSubmitting} isBlock>
        Submit request
      </Button>
    </form>
  );
}
