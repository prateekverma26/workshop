import "./visitor.css";
import { Avatar } from "../ui/Avatar";
import { PartialId } from "../ui/PartialId";

interface ProfileSummaryProps {
  name: string;
  phoneLast4: string;
  idType: string;
  idLast4: string;
  photoSrc?: string;
  action?: React.ReactNode;
}

/** Read-only "signed in as" identity card shown above the visit form. */
export function ProfileSummary({
  name,
  phoneLast4,
  idType,
  idLast4,
  photoSrc,
  action,
}: ProfileSummaryProps) {
  return (
    <section className="profile-summary" aria-label="Your profile">
      <Avatar src={photoSrc} alt={`ID photo of ${name}`} name={name} size="md" />
      <div className="profile-summary__facts">
        <span className="profile-summary__name">{name}</span>
        <span className="profile-summary__meta tabular-nums">
          ×××××× {phoneLast4}
        </span>
        <PartialId last4={idLast4} idType={idType} />
      </div>
      {action ? <div className="profile-summary__action">{action}</div> : null}
    </section>
  );
}
