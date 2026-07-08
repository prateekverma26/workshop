import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone, CreditCard } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { RequirementList } from "../../components/onboarding/RequirementList";
import { PrivacyPromise } from "../../components/onboarding/PrivacyPromise";

export const metadata: Metadata = {
  title: "Gate Pass — Welcome",
  description: "Create a visitor profile once, then request gate passes any time.",
};

const REQUIREMENTS = [
  {
    key: "phone",
    icon: Smartphone,
    title: "A mobile phone",
    detail: "You'll sign in with it — we send a one-time code to verify.",
  },
  {
    key: "id",
    icon: CreditCard,
    title: "A government ID",
    detail: "Aadhaar, PAN, Passport, or Driving Licence — you'll photograph it once.",
  },
];

const PRIVACY_ITEMS = [
  "We collect only what gate entry requires — nothing more.",
  "No biometrics. A person compares your ID photo at the gate; no machine does.",
  "Only the last 4 digits of your ID number are kept.",
  "Your profile is yours to delete at any time.",
];

export default function WelcomePage() {
  return (
    <>
      <MobileHeader facilityName="Shastri Bhawan" />
      <PageWrapper width="narrow">
        <div className="onboard">
          <div className="onboard__intro">
            <h1>Set up once, then request passes any time</h1>
            <p className="onboard__lede">
              Create a visitor profile with your identity once. After that you
              just log in with your phone and request a pass in seconds — no
              re-entering your details.
            </p>
          </div>

          <section className="onboard__section" aria-label="What you'll need">
            <h2>You&rsquo;ll need two things</h2>
            <RequirementList items={REQUIREMENTS} />
          </section>

          <PrivacyPromise items={PRIVACY_ITEMS} />

          <div className="auth-choice">
            <Link href="/signup" className="btn btn--primary btn--lg">
              Create your profile
            </Link>
            <Link href="/login" className="btn btn--secondary btn--lg">
              I already have a profile — log in
            </Link>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
