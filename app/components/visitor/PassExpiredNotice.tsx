import "./visitor.css";

interface PassExpiredNoticeProps {
  expiryTime: string;
  onRequestNew?: () => void;
  action?: React.ReactNode;
}

export function PassExpiredNotice({
  expiryTime,
  action,
}: PassExpiredNoticeProps) {
  return (
    <section className="notice-panel notice-panel--expired" aria-label="Pass expired">
      <p className="notice-panel__reason">
        This pass has expired. It was valid until {expiryTime}.
      </p>
      {action ? <div className="notice-panel__actions">{action}</div> : null}
    </section>
  );
}
