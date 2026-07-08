import "./onboarding.css";
import { ShieldCheck, Check } from "lucide-react";

interface PrivacyPromiseProps {
  title?: string;
  items: string[];
}

/** Plain-language DPDP commitments shown before any data is collected. */
export function PrivacyPromise({
  title = "Your data, protected",
  items,
}: PrivacyPromiseProps) {
  return (
    <section className="privacy" aria-label={title}>
      <div className="privacy__head">
        <ShieldCheck size={20} aria-hidden="true" />
        <h3 className="privacy__title">{title}</h3>
      </div>
      <ul className="privacy__items">
        {items.map((item) => (
          <li key={item} className="privacy__item">
            <Check size={14} strokeWidth={3} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
