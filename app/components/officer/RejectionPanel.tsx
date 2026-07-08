"use client";

import "./officer.css";
import { useState } from "react";
import { Select } from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";

const REASONS = [
  { value: "purpose_unclear", label: "Purpose unclear" },
  { value: "outside_hours", label: "Outside working hours" },
  { value: "host_unavailable", label: "Host unavailable" },
  { value: "other", label: "Other" },
];

interface RejectionPanelProps {
  onReject: (reason: string, detail: string) => Promise<void>;
}

export function RejectionPanel({ onReject }: RejectionPanelProps) {
  const [reason, setReason] = useState("");
  const [detail, setDetail] = useState("");
  const [errors, setErrors] = useState<{ reason?: string; detail?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOther = reason === "other";

  async function reject() {
    const next: { reason?: string; detail?: string } = {};
    if (!reason) next.reason = "Select a reason.";
    if (isOther && detail.trim().length < 20)
      next.detail = "Provide at least 20 characters explaining the reason.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setIsSubmitting(true);
    await onReject(reason, detail);
    setIsSubmitting(false);
  }

  return (
    <div className="decision-panel">
      <Select
        label="Reason for rejection"
        options={REASONS}
        placeholder="Select a reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        error={errors.reason}
        isRequired
      />
      <Textarea
        label={isOther ? "Explain the reason" : "Additional context (optional)"}
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        error={errors.detail}
        maxChars={200}
        hint="This is shown to the visitor."
        isRequired={isOther}
      />
      <div className="decision-panel__actions">
        <Button variant="danger" onClick={reject} isLoading={isSubmitting}>
          Reject request
        </Button>
      </div>
    </div>
  );
}
