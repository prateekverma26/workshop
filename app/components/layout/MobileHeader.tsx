import "./layout.css";
import { ChevronLeft, ShieldCheck } from "lucide-react";

interface MobileHeaderProps {
  facilityName: string;
  /** App/product name shown after the facility. Defaults to "Gate Pass". */
  appName?: string;
  onBack?: () => void;
  action?: React.ReactNode;
}

/**
 * Sticky, mobile-first app bar for the visitor flow. Carries the facility
 * identity (trust), an optional back affordance, and an optional action.
 * The screen's own <h1> lives in the page content, not here.
 */
export function MobileHeader({
  facilityName,
  appName = "Gate Pass",
  onBack,
  action,
}: MobileHeaderProps) {
  return (
    <header className="mobile-header">
      <div className="mobile-header__inner">
        {onBack ? (
          <button
            type="button"
            className="mobile-header__back"
            onClick={onBack}
            aria-label="Go back"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
        ) : null}
        <span className="mobile-header__brand">
          <ShieldCheck
            className="mobile-header__brand-icon"
            size={20}
            aria-hidden="true"
          />
          <span className="mobile-header__brand-name">{facilityName}</span>
          <span className="mobile-header__brand-sub">{appName}</span>
        </span>
        {action ? <span className="mobile-header__action">{action}</span> : null}
      </div>
    </header>
  );
}
