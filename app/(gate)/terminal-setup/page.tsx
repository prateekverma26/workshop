"use client";

import { useState } from "react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { TopNav } from "../../components/layout/TopNav";
import { OnboardingStepper } from "../../components/onboarding/OnboardingStepper";
import { TerminalLegend } from "../../components/onboarding/TerminalLegend";
import { ScanReadyScreen } from "../../components/gate/ScanReadyScreen";
import { Select } from "../../components/ui/Select";
import { Checkbox } from "../../components/ui/Checkbox";
import { Button } from "../../components/ui/Button";

const STEPS = [
  { key: "gate", label: "Confirm gate" },
  { key: "primer", label: "Know the screens" },
  { key: "shift", label: "Start shift" },
];

// Demo assignment — gates come from the Facility Admin's provisioning record.
const ASSIGNED_GATES = [
  { value: "gate-1", label: "Gate 1 — Main Entrance" },
  { value: "gate-3", label: "Gate 3 — Visitor Reception" },
];

export default function TerminalSetupPage() {
  const [step, setStep] = useState(0);
  const [gate, setGate] = useState("");
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  const [shiftStart, setShiftStart] = useState<string | null>(null);

  const gateLabel =
    ASSIGNED_GATES.find((g) => g.value === gate)?.label ?? "";

  if (shiftStart) {
    return (
      <div className="terminal">
        <TopNav facilityName="Shastri Bhawan" roleLabel="Gate Security" />
        <ScanReadyScreen gateName={gateLabel} shiftStart={shiftStart} />
      </div>
    );
  }

  return (
    <>
      <TopNav facilityName="Shastri Bhawan" roleLabel="Gate Security" />
      <PageWrapper width="narrow">
        <div className="onboard">
          <OnboardingStepper steps={STEPS} currentIndex={step} />

          {step === 0 ? (
            <>
              <div className="onboard__intro">
                <h1>Which gate are you staffing?</h1>
                <p className="onboard__lede">
                  You&rsquo;re assigned to {ASSIGNED_GATES.length} gates. Every
                  entry you log this shift records against the gate you pick.
                </p>
              </div>
              <Select
                label="Your gate for this shift"
                options={ASSIGNED_GATES}
                placeholder="Select a gate"
                value={gate}
                onChange={(e) => setGate(e.target.value)}
                isRequired
              />
              <div className="onboard__actions">
                <Button disabled={!gate} onClick={() => setStep(1)}>
                  Confirm gate
                </Button>
              </div>
              <p className="onboard__footnote">
                Not assigned to your gate? Contact your Facility Admin. Never
                share this terminal login — every guard signs in individually.
              </p>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <div className="onboard__intro">
                <h1>Five screens, five meanings</h1>
                <p className="onboard__lede">
                  After every scan the terminal shows exactly one of these. The
                  colour, icon, and label always agree — read any of them.
                </p>
              </div>
              <TerminalLegend />
              <Checkbox
                checked={hasAcknowledged}
                onChange={(e) => setHasAcknowledged(e.target.checked)}
                label="I know what each screen means and that a denial is never overridden without a supervisor."
              />
              <div className="onboard__actions">
                <Button disabled={!hasAcknowledged} onClick={() => setStep(2)}>
                  Continue
                </Button>
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <div className="onboard__intro">
                <h1>Ready at {gateLabel}</h1>
                <p className="onboard__lede">
                  Starting your shift records the time and opens the scanner.
                  Entries you grant are logged automatically — no paper register
                  unless the terminal tells you to fall back.
                </p>
              </div>
              <div className="onboard__actions">
                <Button
                  size="lg"
                  onClick={() =>
                    setShiftStart(
                      new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }),
                    )
                  }
                >
                  Start shift
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </PageWrapper>
    </>
  );
}
