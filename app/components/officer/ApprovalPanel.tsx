"use client";

import "./officer.css";
import { useState } from "react";
import { TimeRangePicker } from "../ui/TimeRangePicker";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";

interface ApprovalPanelProps {
  defaultFrom: string;
  defaultTo: string;
  onApprove: (validFrom: string, validTo: string, note: string) => Promise<void>;
}

export function ApprovalPanel({
  defaultFrom,
  defaultTo,
  onApprove,
}: ApprovalPanelProps) {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function approve() {
    if (!from || !to || to <= from) {
      setError("Set a valid window with the end after the start.");
      return;
    }
    setError(undefined);
    setIsSubmitting(true);
    await onApprove(from, to, note);
    setIsSubmitting(false);
  }

  return (
    <div className="decision-panel">
      <TimeRangePicker
        label="Valid time window"
        fromValue={from}
        toValue={to}
        onFromChange={setFrom}
        onToChange={setTo}
        error={error}
        isRequired
      />
      <Textarea
        label="Note to visitor (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        maxChars={200}
      />
      <div className="decision-panel__actions">
        <Button onClick={approve} isLoading={isSubmitting}>
          Approve request
        </Button>
      </div>
    </div>
  );
}
