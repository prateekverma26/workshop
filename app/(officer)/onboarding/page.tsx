"use client";

import { useState } from "react";
import { Inbox } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { TopNav } from "../../components/layout/TopNav";
import { OnboardingStepper } from "../../components/onboarding/OnboardingStepper";
import { DelegationControl } from "../../components/officer/DelegationControl";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";

const STEPS = [
  { key: "scope", label: "Confirm scope" },
  { key: "delegate", label: "Delegation" },
  { key: "primer", label: "How your queue works" },
];

// Demo assignment — in production this comes from the Facility Admin's
// provisioning record and is read-only to the officer.
const ASSIGNMENT = {
  name: "R. Sharma",
  role: "Approving Officer",
  department: "Public Grievances",
  zone: "Main Building, Zone B",
};

const ELIGIBLE_OFFICERS = [
  { value: "off-2", label: "A. Menon — Public Grievances" },
  { value: "off-3", label: "S. Iyer — Public Grievances" },
];

const PRIMER = [
  "Your queue is sorted by requested visit time — oldest need first.",
  "Open a request and check the ID photo and stated purpose before deciding. Every request is reviewed individually; bulk approval does not exist.",
  "Approve with a confirmed time window, or reject with a reason the visitor can act on.",
  "Pending requests carry a 2-hour SLA during working hours. If you're away with no delegate, they escalate to your Facility Admin.",
];

export default function OfficerOnboardingPage() {
  const [step, setStep] = useState(0);
  const [delegate, setDelegate] = useState<{ name: string; scope: string } | undefined>();
  const isDone = step >= STEPS.length;

  return (
    <>
      <TopNav
        facilityName="Shastri Bhawan"
        roleLabel="Approving Officer"
        userName={ASSIGNMENT.name}
      />
      <PageWrapper width="narrow">
        <div className="onboard">
          {!isDone ? <OnboardingStepper steps={STEPS} currentIndex={step} /> : null}

          {step === 0 ? (
            <>
              <div className="onboard__intro">
                <h1>Confirm your assignment</h1>
                <p className="onboard__lede">
                  Your Facility Admin set this up. Check it&rsquo;s right — you
                  can only approve requests within this scope.
                </p>
              </div>
              <dl className="scope-card">
                <div>
                  <dt>Name</dt>
                  <dd>{ASSIGNMENT.name}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{ASSIGNMENT.role}</dd>
                </div>
                <div>
                  <dt>Department</dt>
                  <dd>{ASSIGNMENT.department}</dd>
                </div>
                <div>
                  <dt>Zone</dt>
                  <dd>{ASSIGNMENT.zone}</dd>
                </div>
              </dl>
              <div className="onboard__actions">
                <Button onClick={() => setStep(1)}>This is correct</Button>
              </div>
              <p className="onboard__footnote">
                Wrong department or zone? Contact your Facility Admin — scope
                can&rsquo;t be changed from here.
              </p>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <div className="onboard__intro">
                <h1>Cover your absences</h1>
                <p className="onboard__lede">
                  Assign a backup officer so your queue never stalls while
                  you&rsquo;re on leave. You can also do this later in settings.
                </p>
              </div>
              <DelegationControl
                currentDelegate={delegate}
                eligibleOfficers={ELIGIBLE_OFFICERS}
                onAssign={(id) => {
                  const officer = ELIGIBLE_OFFICERS.find((o) => o.value === id);
                  if (officer) {
                    setDelegate({
                      name: officer.label.split(" — ")[0],
                      scope: ASSIGNMENT.department,
                    });
                  }
                }}
                onRemove={() => setDelegate(undefined)}
              />
              <div className="onboard__actions">
                <Button onClick={() => setStep(2)}>
                  {delegate ? "Continue" : "Skip for now"}
                </Button>
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <div className="onboard__intro">
                <h1>How a request moves</h1>
                <p className="onboard__lede">
                  Four things to know before your first approval.
                </p>
              </div>
              <ol className="primer-list">
                {PRIMER.map((rule, i) => (
                  <li key={rule} className="primer-list__item">
                    <span className="primer-list__num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ol>
              <div className="onboard__actions">
                <Button onClick={() => setStep(3)}>Go to my queue</Button>
              </div>
            </>
          ) : null}

          {isDone ? (
            <EmptyState
              icon={Inbox}
              title="No pending requests"
              message="You're set up. New visitor requests for Public Grievances will appear here."
            />
          ) : null}
        </div>
      </PageWrapper>
    </>
  );
}
