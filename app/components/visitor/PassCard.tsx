import "./visitor.css";
import { CircleCheck } from "lucide-react";
import { TimeWindow } from "../ui/TimeWindow";

interface PassCardProps {
  /** A data-URI or URL for the pre-rendered single-use QR image. */
  qrSrc: string;
  visitorName: string;
  validFrom: string;
  validTo: string;
  facility: string;
  gate: string;
  approverName: string;
  referenceNumber: string;
  /** APPROVED shows the live QR; EXPIRED dims it; USED replaces it. */
  state?: "APPROVED" | "EXPIRED" | "USED";
}

export function PassCard({
  qrSrc,
  visitorName,
  validFrom,
  validTo,
  facility,
  gate,
  approverName,
  referenceNumber,
  state = "APPROVED",
}: PassCardProps) {
  return (
    <section className="pass-card" aria-label="Gate pass">
      {state === "USED" ? (
        <div className="pass-card__used">
          <CircleCheck size={40} strokeWidth={1.5} aria-hidden="true" />
          <p>Entry recorded — this pass has been used.</p>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={`pass-card__qr ${state === "EXPIRED" ? "pass-card__qr--dim" : ""}`}
          src={qrSrc}
          alt={`Gate pass QR code for ${visitorName}, reference ${referenceNumber}`}
        />
      )}

      <h2 className="pass-card__name">{visitorName}</h2>
      <TimeWindow from={validFrom} to={validTo} size="lg" isExpired={state === "EXPIRED"} />

      <div className="pass-card__meta">
        <span>
          <strong>{facility}</strong> · {gate}
        </span>
        <span>Approved by {approverName}</span>
        <span className="pass-card__ref">Ref {referenceNumber}</span>
      </div>
    </section>
  );
}
