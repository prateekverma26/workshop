"use client";

import "./visitor.css";
import { useState } from "react";
import { Input } from "../ui/Input";
import { Select, type SelectOption } from "../ui/Select";
import { FileUpload } from "../ui/FileUpload";
import { Checkbox } from "../ui/Checkbox";
import { Button } from "../ui/Button";

export interface ProfileFormValues {
  name: string;
  phone: string;
  idType: string;
  idNumber: string;
  idPhoto: File | null;
  consent: boolean;
}

interface ProfileFormProps {
  idTypes: SelectOption[];
  onSubmit: (values: ProfileFormValues) => Promise<void>;
}

const EMPTY: ProfileFormValues = {
  name: "",
  phone: "",
  idType: "",
  idNumber: "",
  idPhoto: null,
  consent: false,
};

export function ProfileForm({ idTypes, onSubmit }: ProfileFormProps) {
  const [values, setValues] = useState<ProfileFormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormValues, string>>>({});
  const [hasSummaryError, setHasSummaryError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function set<K extends keyof ProfileFormValues>(key: K, value: ProfileFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof ProfileFormValues, string>> = {};
    if (!values.name.trim()) next.name = "Enter your full name.";
    if (!/^\d{10}$/.test(values.phone)) next.phone = "Enter a valid 10-digit mobile number.";
    if (!values.idType) next.idType = "Select an ID type.";
    if (!values.idNumber.trim()) next.idNumber = "Enter your ID number.";
    if (!values.idPhoto) next.idPhoto = "Upload a photo of your ID.";
    if (!values.consent) next.consent = "Consent is required to create a profile.";
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
            hint="You'll sign in with this number"
            isRequired
            autoComplete="tel"
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
          label="I consent to my details being held for gate access under the facility's data policy. I can delete my profile at any time."
        />
      </div>

      {hasSummaryError ? (
        <p className="request-form__error-summary" role="alert">
          Please fix the highlighted fields before continuing.
        </p>
      ) : null}

      <Button type="submit" isLoading={isSubmitting} isBlock>
        Create profile
      </Button>
    </form>
  );
}
