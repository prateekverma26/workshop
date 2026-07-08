import "./gate.css";
import { CircleCheck } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { TimeWindow } from "../ui/TimeWindow";
import { GrantEntryButton } from "./GrantEntryButton";

interface ValidResultProps {
  visitorName: string;
  photoSrc?: string;
  purpose: string;
  validFrom: string;
  validTo: string;
  approverName: string;
  onGrant: () => void;
  onFlagDiscrepancy: () => void;
  isGranting?: boolean;
}

export function ValidResult({
  visitorName,
  photoSrc,
  purpose,
  validFrom,
  validTo,
  approverName,
  onGrant,
  onFlagDiscrepancy,
  isGranting,
}: ValidResultProps) {
  return (
    <div className="result result--valid">
      <div className="result__band">
        <CircleCheck size={28} aria-hidden="true" />
        VALID PASS
      </div>
      <div className="result__body">
        <div className="valid">
          <div className="valid__identity">
            <Avatar src={photoSrc} alt={`ID photo of ${visitorName}`} name={visitorName} size="xl" />
          </div>
          <div className="valid__info">
            <h2 className="valid__name">{visitorName}</h2>
            <dl className="valid__details">
              <div>
                <dt>Purpose</dt>
                <dd>{purpose}</dd>
              </div>
              <div>
                <dt>Valid window</dt>
                <dd>
                  <TimeWindow from={validFrom} to={validTo} size="lg" />
                </dd>
              </div>
              <div>
                <dt>Approved by</dt>
                <dd>{approverName}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="valid__actions">
          <GrantEntryButton onGrant={onGrant} isLoading={isGranting} />
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onFlagDiscrepancy}
          >
            Face doesn&rsquo;t match — flag &amp; deny
          </button>
        </div>
      </div>
    </div>
  );
}
