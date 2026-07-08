"use client";

import "./officer.css";
import { useState } from "react";
import { Select, type SelectOption } from "../ui/Select";
import { Button } from "../ui/Button";

interface DelegationControlProps {
  currentDelegate?: { name: string; scope: string };
  eligibleOfficers: SelectOption[];
  onAssign: (officerId: string) => void;
  onRemove: () => void;
}

export function DelegationControl({
  currentDelegate,
  eligibleOfficers,
  onAssign,
  onRemove,
}: DelegationControlProps) {
  const [selected, setSelected] = useState("");

  return (
    <div className="delegation">
      <h3>Queue delegation</h3>
      {currentDelegate ? (
        <div className="delegation__current">
          <span>
            Delegated to <strong>{currentDelegate.name}</strong> ({currentDelegate.scope})
          </span>
          <Button variant="secondary" size="sm" onClick={onRemove}>
            Remove delegate
          </Button>
        </div>
      ) : (
        <>
          <p className="data-table__muted">
            No delegate assigned. Assign a backup before any planned absence so
            your queue does not stall.
          </p>
          <Select
            label="Assign a backup officer"
            options={eligibleOfficers}
            placeholder="Select an officer"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          />
          <Button
            size="sm"
            disabled={!selected}
            onClick={() => onAssign(selected)}
          >
            Assign delegate
          </Button>
        </>
      )}
    </div>
  );
}
