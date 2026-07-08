import "./onboarding.css";
import { Check } from "lucide-react";
import { Fragment } from "react";

export interface StepperStep {
  key: string;
  label: string;
}

interface OnboardingStepperProps {
  steps: StepperStep[];
  currentIndex: number;
}

/** Progress display for multi-step first-run flows. Not navigation. */
export function OnboardingStepper({ steps, currentIndex }: OnboardingStepperProps) {
  return (
    <ol className="stepper" aria-label="Setup progress">
      {steps.map((step, i) => {
        const isDone = i < currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <Fragment key={step.key}>
            {i > 0 ? (
              <li
                aria-hidden="true"
                className={`stepper__connector ${
                  i <= currentIndex ? "stepper__connector--done" : ""
                }`}
              />
            ) : null}
            <li
              className={`stepper__step ${
                isDone ? "stepper__step--done" : ""
              } ${isCurrent ? "stepper__step--current" : ""}`}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span className="stepper__dot" aria-hidden="true">
                {isDone ? <Check size={13} strokeWidth={3} /> : i + 1}
              </span>
              <span className="stepper__label">{step.label}</span>
            </li>
          </Fragment>
        );
      })}
    </ol>
  );
}
