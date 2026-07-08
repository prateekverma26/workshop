import "./onboarding.css";
import type { LucideIcon } from "lucide-react";

export interface Requirement {
  key: string;
  icon: LucideIcon;
  title: string;
  detail: string;
}

interface RequirementListProps {
  items: Requirement[];
}

/** "What you'll need" checklist for the visitor welcome screen. */
export function RequirementList({ items }: RequirementListProps) {
  return (
    <ul className="req-list">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.key} className="req-list__item">
            <span className="req-list__icon">
              <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span>
              <span className="req-list__title">{item.title}</span>
              <br />
              <span className="req-list__detail">{item.detail}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
