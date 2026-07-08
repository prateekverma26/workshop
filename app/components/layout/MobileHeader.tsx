import "./layout.css";
import { ChevronLeft } from "lucide-react";

interface MobileHeaderProps {
  title: string;
  onBack?: () => void;
  action?: React.ReactNode;
}

export function MobileHeader({ title, onBack, action }: MobileHeaderProps) {
  return (
    <header className="mobile-header">
      {onBack ? (
        <button
          type="button"
          className="mobile-header__back"
          onClick={onBack}
          aria-label="Go back"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>
      ) : (
        <span className="mobile-header__spacer" aria-hidden="true" />
      )}
      <h1 className="mobile-header__title">{title}</h1>
      {action ?? <span className="mobile-header__spacer" aria-hidden="true" />}
    </header>
  );
}
