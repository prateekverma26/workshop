import "./onboarding.css";
import { CircleCheck, XCircle, Clock, ScanLine } from "lucide-react";

/**
 * Legend of the five gate verification states. Mirrors the real terminal
 * result screens 1:1 (same tokens as gate/) — taught once at first run
 * because instant colour recognition is an operational requirement.
 */
const ENTRIES = [
  {
    key: "VALID",
    tone: "valid",
    icon: CircleCheck,
    label: "Valid",
    meaning: "Pass checks out. Compare the visitor's face to the photo.",
    action: "Grant Entry available",
  },
  {
    key: "EXPIRED",
    tone: "danger",
    icon: XCircle,
    label: "Expired",
    meaning: "The valid window has closed.",
    action: "No entry — visitor may re-request",
  },
  {
    key: "INVALID_TIME",
    tone: "amber",
    icon: Clock,
    label: "Outside window",
    meaning: "Too early or too late for this pass.",
    action: "No entry — call supervisor to escalate",
  },
  {
    key: "ALREADY_USED",
    tone: "danger",
    icon: XCircle,
    label: "Already entered",
    meaning: "This QR was used once before. Passes are single-use.",
    action: "No entry — escalate the attempt",
  },
  {
    key: "SCAN_ERROR",
    tone: "neutral",
    icon: ScanLine,
    label: "QR unreadable",
    meaning: "The code could not be read.",
    action: "Use manual lookup by name or ID",
  },
] as const;

export function TerminalLegend() {
  return (
    <ul className="legend" aria-label="Terminal verification states">
      {ENTRIES.map((entry) => {
        const Icon = entry.icon;
        return (
          <li key={entry.key} className="legend__entry">
            <div className={`legend__band legend__band--${entry.tone}`}>
              <Icon size={16} aria-hidden="true" />
              {entry.label}
            </div>
            <div className="legend__body">
              <span className="legend__meaning">{entry.meaning}</span>
              <span className="legend__action">{entry.action}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
