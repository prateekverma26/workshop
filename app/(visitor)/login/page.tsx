"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { OtpVerification } from "../../components/visitor/OtpVerification";
import { getProfileByPhone, setSession } from "@/lib/profileStore";

export default function LoginPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [noProfile, setNoProfile] = useState(false);

  function submitPhone(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);
    setNoProfile(false);
    if (!/^\d{10}$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!getProfileByPhone(phone)) {
      setNoProfile(true);
      return;
    }
    setPhase("otp");
  }

  async function handleVerify(code: string): Promise<boolean> {
    if (code !== "123456") return false;
    setSession(phone);
    router.push("/passes");
    return true;
  }

  return (
    <>
      <MobileHeader
        facilityName="Shastri Bhawan"
        onBack={() => (phase === "otp" ? setPhase("phone") : router.push("/welcome"))}
      />
      <PageWrapper width="narrow">
        <div className="onboard">
          {phase === "phone" ? (
            <>
              <div className="onboard__intro">
                <h1>Log in</h1>
                <p className="onboard__lede">
                  Enter the mobile number on your profile. We&rsquo;ll send a
                  one-time code to verify it&rsquo;s you.
                </p>
              </div>
              <form className="request-form" onSubmit={submitPhone} noValidate>
                <Input
                  label="Mobile number"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={error}
                  isRequired
                  autoComplete="tel"
                />
                {noProfile ? (
                  <p className="request-form__error-summary" role="alert">
                    No profile found for this number.{" "}
                    <Link href="/signup">Create one instead</Link>.
                  </p>
                ) : null}
                <Button type="submit" isBlock>
                  Send code
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="onboard__intro">
                <h1>Enter your code</h1>
              </div>
              <OtpVerification
                phoneLast4={phone.slice(-4)}
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
