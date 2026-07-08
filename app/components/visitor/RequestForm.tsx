"use client";

import "./visitor.css";
import { useState } from "react";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Select, type SelectOption } from "../ui/Select";
import { DatePicker } from "../ui/DatePicker";
import { TimeRangePicker } from "../ui/TimeRangePicker";
import { FileUpload } from "../ui/FileUpload";
import { Checkbox } from "../ui/Checkbox";
import { Button } from "../ui/Button";

export interface RequestFormValues {
  name: string;
  phone: string;
  purpose: string;
  hostDepartment: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  idType: string;
  idNumber: string;
  idPhoto: File | null;
  consent: boolean;
}

interface RequestFormProps {
  departments: SelectOption[];
  idTypes: SelectOption[];
  minDate: string;
  onSubmit: (values: RequestFormValues) => Promise<void>;
}

const EMPTY: RequestFormValues = {
  name: "",
  phone: "",
  purpose: "",
  hostDepartment: "",
  date: "",
  timeFrom: "",
  timeTo: "",
  idType: "",
  idNumber: "",
  idPhoto: null,
  consent: false,
};

export function RequestForm({
  departments,
  idTypes,
  minDate,
  onSubmit,
}: RequestFormProps) {
  const [values, setValues] = useState<RequestFormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof RequestFormValues, string>>>({});
  const [hasSummaryError, setHasSummaryError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function set<K extends keyof RequestFormValues>(key: K, value: RequestFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof RequestFormValues, string>> = {};
    if (!values.name.trim()) next.name = "Enter your full name.";
    if (!/^\d{10}$/.test(values.phone)) next.phone = "Enter a valid 10-digit mobile number.";
    if (values.purpose.trim().length < 10)
      next.purpose = "Describe your purpose in at least 10 characters.";
    if (!values.hostDepartment) next.hostDepartment = "Select the host department.";
    if (!values.date) next.date = "Choose a visit date.";
    if (!values.timeFrom || !values.timeTo || values.timeTo <= values.timeFrom)
      next.timeFrom = "Set a valid time window (end after start).";
    if (!values.idType) next.idType = "Select an ID type.";
    if (!values.idNumber.trim()) next.idNumber = "Enter your ID number.";
    if (!values.idPhoto) next.idPhoto = "Upload a photo of your ID.";
    if (!values.consent) next.consent = "Consent is required to submit.";
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
        <div className="request-form__row">
          <Input
            label="Full name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            error={errors.name}
            isRequired
            autoComplete="name"
          />
          <Input
            label="Mobile number"
            type="tel"
            inputMode="numeric"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            error={errors.phone}
            hint="OTP will be sent to this number"
            isRequired
            autoComplete="tel"
          />
        </div>

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
            min={minDate}
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

        <div className="request-form__row">
          <Select
            label="Government ID type"
            options={idTypes}
            placeholder="Select ID type"
            onChange={(e) => set("idType", e.target.value)}
            error={errors.idType}
            isRequired
          />
          <Input
            label="ID number"
            value={values.idNumber}
            onChange={(e) => set("idNumber", e.target.value)}
            error={errors.idNumber}
            hint="Only the last 4 digits are stored"
            isRequired
          />
        </div>

        <FileUpload
          label="Photo of your government ID"
          onFileChange={(f) => set("idPhoto", f)}
          isRequired
        />

        <Checkbox
          checked={values.consent}
          onChange={(e) => set("consent", e.target.checked)}
          error={Boolean(errors.consent)}
          label="I consent to my details being held for this visit under the facility's data policy."
        />
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
