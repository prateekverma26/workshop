import "./gate.css";
import { TriangleAlert } from "lucide-react";

interface FallbackModeBannerProps {
  reason?: string;
}

export function FallbackModeBanner({ reason }: FallbackModeBannerProps) {
  return (
    <div className="fallback-banner" role="alert">
      <TriangleAlert size={18} aria-hidden="true" />
      Manual fallback mode active{reason ? ` — ${reason}` : ""}. Complete the
      paper register for every entry.
    </div>
  );
}
