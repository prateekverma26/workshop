import "./gate.css";
import { QrCode } from "lucide-react";

interface ScanReadyScreenProps {
  gateName: string;
  shiftStart: string;
  children?: React.ReactNode;
}

export function ScanReadyScreen({
  gateName,
  shiftStart,
  children,
}: ScanReadyScreenProps) {
  return (
    <div className="scan-ready">
      <div className="scan-ready__area">
        {children ?? <QrCode size={96} strokeWidth={1} aria-hidden="true" />}
      </div>
      <h1>{gateName}</h1>
      <p className="scan-ready__meta">Ready to scan · Shift started {shiftStart}</p>
    </div>
  );
}
