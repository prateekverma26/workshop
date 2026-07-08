"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { OnboardingStepper } from "../../components/onboarding/OnboardingStepper";
import { RequestForm, type RequestFormValues } from "../../components/visitor/RequestForm";
import { OtpVerification } from "../../components/visitor/OtpVerification";
import { createPendingPass } from "@/lib/passStore";

const STEPS = [
  { key: "details", label: "Your details" },
  { key: "verify", label: "Verify phone" },
  { key: "submit", label: "Submitted" },
];

const DEPARTMENTS = [
  { value: "grievances", label: "Public Grievances" },
  { value: "admin", label: "Administration" },
  { value: "it", label: "IT & Systems" },
  { value: "records", label: "Records & Archives" },
];

const ID_TYPES = [
  { value: "aadhaar", label: "Aadhaar" },
  { value: "pan", label: "PAN" },
  { value: "passport", label: "Passport" },
  { value: "dl", label: "Driving Licence" },
];

function labelFor(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

export default function RequestPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"form" | "otp">("form");
  const [draft, setDraft] = useState<RequestFormValues | null>(null);

  async function handleSubmit(values: RequestFormValues) {
    setDraft(values);
    setPhase("otp");
  }

  async function handleVerify(code: string): Promise<boolean> {
    // Demo OTP per al/knowledge/domain/entry-permit-rules.md.
    if (code !== "123456" || !draft) return false;
    const id = createPendingPass({
      visitorName: draft.name,
      phoneLast4: draft.phone.slice(-4),
      purpose: draft.purpose,
      hostDepartment: labelFor(DEPARTMENTS, draft.hostDepartment),
      facility: "Shastri Bhawan",
      gate: "Gate 1 — Main Entrance",
      validFrom: `${draft.date} ${draft.timeFrom}`,
      validTo: `${draft.date} ${draft.timeTo}`,
      idType: labelFor(ID_TYPES, draft.idType),
      idLast4: draft.idNumber.slice(-4),
    });
    router.push(`/status/${id}`);
    return true;
  }

  return (
    <>
      <MobileHeader
        title="Request a gate pass"
        onBack={() => (phase === "otp" ? setPhase("form") : router.push("/welcome"))}
      />
      <PageWrapper width="narrow">
        <div className="onboard">
          <OnboardingStepper steps={STEPS} currentIndex={phase === "form" ? 0 : 1} />

          {phase === "form" ? (
            <>
              <div className="onboard__intro">
                <h1>Your visit details</h1>
                <p className="onboard__lede">
                  Tell us who you are and why you&rsquo;re visiting. We verify
                  your phone next, then your host department reviews the request.
                </p>
              </div>
              <RequestForm
                departments={DEPARTMENTS}
                idTypes={ID_TYPES}
                minDate=""
                onSubmit={handleSubmit}
              />
            </>
          ) : (
            <>
              <div className="onboard__intro">
                <h1>Verify your phone</h1>
                <p className="onboard__lede">
                  Enter the code to confirm this number is yours. This proves you
                  control the phone — your identity is checked by your ID photo at
                  the gate.
                </p>
              </div>
              <OtpVerification
                phoneLast4={draft?.phone.slice(-4) ?? "0000"}
                onVerify={handleVerify}
                onResend={() => {}}
              />
            </>
          )}
        </div>
      </PageWrapper>
    </>
  );
}
