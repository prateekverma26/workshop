"use client";

import "./gate.css";
import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

interface FlagDiscrepancyActionProps {
  visitorName: string;
  onConfirm: () => void;
}

export function FlagDiscrepancyAction({
  visitorName,
  onConfirm,
}: FlagDiscrepancyActionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="btn btn--danger"
        onClick={() => setIsOpen(true)}
      >
        Face doesn&rsquo;t match — deny
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Flag face mismatch and deny entry?"
        isDismissLocked
        actions={
          <>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                onConfirm();
                setIsOpen(false);
              }}
            >
              Flag &amp; deny entry
            </Button>
          </>
        }
      >
        This records a face-mismatch discrepancy for {visitorName} with your
        guard ID and the current time, and denies entry. Escalate to your
        supervisor after confirming.
      </Modal>
    </>
  );
}
