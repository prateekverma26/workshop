import "./layout.css";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  key: string;
  label: string;
  icon: LucideIcon;
  href: string;
  isActive?: boolean;
}

interface SidebarProps {
  items: NavItem[];
  isCollapsed?: boolean;
  isOpen?: boolean;
  onNavigate?: (href: string) => void;
}

export function Sidebar({
  items,
  isCollapsed = false,
  isOpen = false,
  onNavigate,
}: SidebarProps) {
  const classes = [
    "sidebar",
    isCollapsed ? "sidebar--collapsed" : "",
    isOpen ? "sidebar--open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={classes} aria-label="Primary">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.key}
            href={item.href}
            className={`sidebar__item ${item.isActive ? "sidebar__item--active" : ""}`}
            aria-current={item.isActive ? "page" : undefined}
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate(item.href);
              }
            }}
          >
            <Icon className="sidebar__icon" size={20} aria-hidden="true" />
            <span className="sidebar__item-label">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
