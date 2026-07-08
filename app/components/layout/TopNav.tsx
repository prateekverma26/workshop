import "./layout.css";
import { Menu, ShieldCheck } from "lucide-react";
import { Button } from "../ui/Button";

interface TopNavProps {
  facilityName: string;
  roleLabel: string;
  userName?: string;
  onSignOut?: () => void;
  onOpenMenu?: () => void;
  hasMenu?: boolean;
}

export function TopNav({
  facilityName,
  roleLabel,
  userName,
  onSignOut,
  onOpenMenu,
  hasMenu = false,
}: TopNavProps) {
  return (
    <header className="topnav">
      <div className="topnav__brand">
        {hasMenu ? (
          <button
            type="button"
            className="topnav__menu-btn"
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        ) : null}
        <ShieldCheck className="topnav__brand-icon" size={20} aria-hidden="true" />
        <span>{facilityName}</span>
      </div>
      <div className="topnav__right">
        <span className="topnav__role">{roleLabel}</span>
        {userName ? <span className="topnav__user">{userName}</span> : null}
        {onSignOut ? (
          <Button variant="ghost" size="sm" onClick={onSignOut}>
            Sign out
          </Button>
        ) : null}
      </div>
    </header>
  );
}
