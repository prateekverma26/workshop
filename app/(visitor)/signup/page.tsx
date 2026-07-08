"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { OnboardingStepper } from "../../components/onboarding/OnboardingStepper";
import { ProfileForm, type ProfileFormValues } from "../../components/visitor/ProfileForm";
import { OtpVerification } from "../../components/visitor/OtpVerification";
import { createProfile } from "@/lib/profileStore";
import { fileToDataUrl } from "@/lib/fileToDataUrl";

const STEPS = [
  { key: "identity", label: "Your identity" },
  { key: "verify", label: "Verify phone" },
];

const ID_TYPES = [
  { value: "aadhaar", label: "Aadhaar" },
  { value: "pan", label: "PAN" },
  { value: "passport", label: "Passport" },
  { value: "dl", label: "Driving Licence" },
];

export default function SignupPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"form" | "otp">("form");
  const [draft, setDraft] = useState<ProfileFormValues | null>(null);

  async function handleSubmit(values: ProfileFormValues) {
    setDraft(values);
    setPhase("otp");
  }

  async function handleVerify(code: string): Promise<boolean> {
    if (code !== "123456" || !draft) return false;
    const photo = draft.idPhoto ? await fileToDataUrl(draft.idPhoto) : undefined;
    createProfile({
      name: draft.name,
      phone: draft.phone,
      idType: ID_TYPES.find((t) => t.value === draft.idType)?.label ?? draft.idType,
      idTypeValue: draft.idType,
      idLast4: draft.idNumber.slice(-4),
      idPhotoDataUrl: photo,
    });
    router.push("/passes");
    return true;
  }

  return (
    <>
      <MobileHeader
        facilityName="Shastri Bhawan"
        onBack={() => (phase === "otp" ? setPhase("form") : router.push("/welcome"))}
      />
      <PageWrapper width="narrow">
        <div className="onboard">
          <OnboardingStepper steps={STEPS} currentIndex={phase === "form" ? 0 : 1} />

          {phase === "form" ? (
            <>
              <div className="onboard__intro">
                <h1>Create your profile</h1>
                <p className="onboard__lede">
                  Enter your details once. Next time you&rsquo;ll just log in with
                  your phone — no re-typing any of this.
                </p>
              </div>
              <ProfileForm idTypes={ID_TYPES} onSubmit={handleSubmit} />
            </>
          ) : (
            <>
              <div className="onboard__intro">
                <h1>Verify your phone</h1>
                <p className="onboard__lede">
                  Enter the code to confirm this number is yours. This is how
                  you&rsquo;ll sign in from now on.
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
