import "./gate.css";
import { ScanLine } from "lucide-react";
import { ManualLookup, type LookupResult } from "./ManualLookup";

interface ScanErrorResultProps {
  onSearch: (query: string) => Promise<LookupResult[]>;
  onSelect: (passId: string) => void;
}

export function ScanErrorResult({ onSearch, onSelect }: ScanErrorResultProps) {
  return (
    <div className="result result--neutral">
      <div className="result__band">
        <ScanLine size={28} aria-hidden="true" />
        QR UNREADABLE
      </div>
      <div className="result__body">
        <p className="denied__detail">
          The QR code could not be read. Use manual lookup to verify this visitor.
        </p>
        <ManualLookup onSearch={onSearch} onSelect={onSelect} />
      </div>
    </div>
  );
}
