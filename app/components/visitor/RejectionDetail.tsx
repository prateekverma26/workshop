import "./visitor.css";

interface RejectionDetailProps {
  reason: string;
  steps: React.ReactNode;
  actions?: React.ReactNode;
}

export function RejectionDetail({ reason, steps, actions }: RejectionDetailProps) {
  return (
    <section className="notice-panel notice-panel--rejected" aria-label="Request rejected">
      <p className="notice-panel__reason">{reason}</p>
      <div className="notice-panel__steps">{steps}</div>
      {actions ? <div className="notice-panel__actions">{actions}</div> : null}
    </section>
  );
}
