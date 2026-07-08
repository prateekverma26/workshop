import "./officer.css";
import { Avatar } from "../ui/Avatar";
import { PartialId } from "../ui/PartialId";
import { TimeWindow } from "../ui/TimeWindow";

interface RequestDetailProps {
  visitorName: string;
  photoSrc?: string;
  phoneLast4: string;
  purpose: string;
  hostDepartment: string;
  requestedFrom: string;
  requestedTo: string;
  idType: string;
  idLast4: string;
  children?: React.ReactNode;
}

export function RequestDetail({
  visitorName,
  photoSrc,
  phoneLast4,
  purpose,
  hostDepartment,
  requestedFrom,
  requestedTo,
  idType,
  idLast4,
  children,
}: RequestDetailProps) {
  return (
    <section className="request-detail" aria-label={`Request from ${visitorName}`}>
      <div className="request-detail__header">
        <div className="request-detail__identity">
          <Avatar
            src={photoSrc}
            alt={`ID photo of ${visitorName}`}
            name={visitorName}
            size="lg"
          />
          <div>
            <h2>{visitorName}</h2>
            <p className="data-table__muted">
              <PartialId last4={idLast4} idType={idType} />
            </p>
          </div>
        </div>
        <dl className="request-detail__facts">
          <div>
            <dt>Phone</dt>
            <dd className="tabular-nums">×××××× {phoneLast4}</dd>
          </div>
          <div>
            <dt>Host department</dt>
            <dd>{hostDepartment}</dd>
          </div>
          <div>
            <dt>Requested window</dt>
            <dd>
              <TimeWindow from={requestedFrom} to={requestedTo} />
            </dd>
          </div>
          <div>
            <dt>Purpose</dt>
            <dd>{purpose}</dd>
          </div>
        </dl>
      </div>
      {children}
    </section>
  );
}
