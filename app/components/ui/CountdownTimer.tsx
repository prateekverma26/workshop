"use client";

import "./ui.css";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  /** Seconds to count down from when (re)started. */
  seconds: number;
  /** Bump this to restart the countdown (e.g. after a resend). */
  restartKey: number;
  onResend?: () => void;
}

/**
 * Remounts the inner timer whenever restartKey changes, so the countdown
 * resets cleanly without any setState-in-effect or impure render calls.
 */
export function CountdownTimer({ restartKey, ...rest }: CountdownTimerProps) {
  return <CountdownInner key={restartKey} {...rest} />;
}

function CountdownInner({
  seconds,
  onResend,
}: Omit<CountdownTimerProps, "restartKey">) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    // Absolute deadline so a backgrounded tab never shows a stale value.
    const deadline = Date.now() + seconds * 1000;
    const compute = () =>
      setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));

    const interval = window.setInterval(compute, 500);
    const onVisible = () => {
      if (!document.hidden) compute();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [seconds]);

  if (remaining > 0) {
    return (
      <span className="countdown" aria-live="polite">
        Resend in {remaining}s
      </span>
    );
  }

  return (
    <button type="button" className="countdown__resend" onClick={onResend}>
      Resend code
    </button>
  );
}
