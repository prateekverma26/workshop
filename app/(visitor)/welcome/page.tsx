import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone, CreditCard, ClipboardList } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { RequirementList } from "../../components/onboarding/RequirementList";
import { PrivacyPromise } from "../../components/onboarding/PrivacyPromise";

export const metadata: Metadata = {
  title: "Request a Gate Pass",
  description: "Request your visitor gate pass online before you arrive.",
};

const REQUIREMENTS = [
  {
    key: "phone",
    icon: Smartphone,
    title: "A mobile phone",
    detail: "We send a one-time code to verify your number.",
  },
  {
    key: "id",
    icon: CreditCard,
    title: "A government ID",
    detail: "Aadhaar, PAN, Passport, or Driving Licence — you'll photograph it.",
  },
  {
    key: "purpose",
    icon: ClipboardList,
    title: "Your purpose and host",
    detail: "Who you're visiting and why, so the right officer can approve it.",
  },
];

const PRIVACY_ITEMS = [
  "We collect only what gate entry requires — nothing more.",
  "No biometrics. A person compares your ID photo at the gate; no machine does.",
  "Only the last 4 digits of your ID number are kept.",
  "Your record is deleted automatically after the retention period.",
];

export default function WelcomePage() {
  return (
    <>
      <MobileHeader title="Gate Pass" />
      <PageWrapper width="narrow">
        <div className="onboard">
          <div className="onboard__intro">
            <h1>Request your gate pass before you arrive</h1>
            <p className="onboard__lede">
              Apply from your phone, get approved by your host department, and
              show one QR code at the gate. It takes about two minutes.
            </p>
          </div>

          <section className="onboard__section" aria-label="What you'll need">
            <h2>You&rsquo;ll need three things</h2>
            <RequirementList items={REQUIREMENTS} />
          </section>

          <PrivacyPromise items={PRIVACY_ITEMS} />

          <div className="onboard__actions">
            <Link href="/request" className="btn btn--primary btn--lg">
              Start your request
            </Link>
          </div>
          <p className="onboard__footnote">
            Visited before? Your details will be pre-filled once your phone
            number is verified.
          </p>
        </div>
      </PageWrapper>
    </>
  );
}
