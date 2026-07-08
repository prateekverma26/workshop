import "./ui.css";
import { Info } from "lucide-react";

/**
 * Persistent demo-mode notice. The demo OTP is 123456 per
 * al/knowledge/domain/entry-permit-rules.md. This notice must never be removed.
 */
export function DemoNotice() {
  return (
    <p className="demo-notice" role="note">
      <Info size={14} strokeWidth={2} aria-hidden="true" />
      Demo mode — OTP is 123456
    </p>
  );
}
