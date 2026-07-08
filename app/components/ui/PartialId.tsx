import "./ui.css";

interface PartialIdProps {
  /** The last 4 digits only. Full IDs must never be passed in. */
  last4: string;
  idType?: string;
}

/**
 * Renders a masked government ID. By contract, only the last 4 digits are
 * ever known to the UI — see al/knowledge/domain/entry-permit-rules.md.
 */
export function PartialId({ last4, idType }: PartialIdProps) {
  const safe = last4.slice(-4);
  return (
    <span className="partial-id tabular-nums">
      {idType ? `${idType} ` : ""}
      <span aria-hidden="true">×××× ×××× </span>
      <span className="visually-hidden">ending in </span>
      {safe}
    </span>
  );
}
