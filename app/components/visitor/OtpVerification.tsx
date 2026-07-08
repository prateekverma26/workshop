"use client";

import "./visitor.css";
import { useState } from "react";
import { OtpInput } from "../ui/OtpInput";
import { CountdownTimer } from "../ui/CountdownTimer";
import { DemoNotice } from "../ui/DemoNotice";
import { Button } from "../ui/Button";
import { ErrorState } from "../ui/ErrorState";

interface OtpVerificationProps {
  /** Last 4 digits of the phone the code was sent to. */
  phoneLast4: string;
  onVerify: (code: string) => Promise<boolean>;
  onResend: () => void;
  resendSeconds?: number;
  maxAttempts?: number;
}

export function OtpVerification({
  phoneLast4,
  onVerify,
  onResend,
  resendSeconds = 45,
  maxAttempts = 3,
}: OtpVerificationProps) {
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "error" | "success">("idle");
  const [attempts, setAttempts] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [restartKey, setRestartKey] = useState(0);

  const isLockedOut = attempts >= maxAttempts;

  async function submit() {
    if (code.length !== 6 || isVerifying) return;
    setIsVerifying(true);
    const ok = await onVerify(code);
    setIsVerifying(false);
    if (ok) {
      setState("success");
    } else {
      setState("error");
      setAttempts((a) => a + 1);
    }
  }

  function resend() {
    onResend();
    setCode("");
    setState("idle");
    setRestartKey((k) => k + 1);
  }

  if (isLockedOut) {
    return (
      <ErrorState
        title="Too many attempts"
        message="You've entered an incorrect code too many times. Please contact facility support to continue."
      />
    );
  }

  return (
    <div className="otp-verify">
      <DemoNotice />
      <p className="otp-verify__sent">
        We sent a 6-digit code to your phone ending in{" "}
        <strong className="tabular-nums">{phoneLast4}</strong>
      </p>

      <OtpInput
        value={code}
        onChange={setCode}
        state={state}
        disabled={isVerifying}
      />

      {state === "error" ? (
        <p className="otp-verify__attempts" role="alert">
          Incorrect code. {maxAttempts - attempts} attempt
          {maxAttempts - attempts === 1 ? "" : "s"} remaining.
        </p>
      ) : null}

      <Button
        onClick={submit}
        isLoading={isVerifying}
        disabled={code.length !== 6}
        isBlock
      >
        Verify
      </Button>

      <CountdownTimer
        seconds={resendSeconds}
        restartKey={restartKey}
        onResend={resend}
      />
    </div>
  );
}
