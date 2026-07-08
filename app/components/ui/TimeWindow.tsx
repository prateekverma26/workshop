import "./ui.css";
import { ArrowRight } from "lucide-react";

interface TimeWindowProps {
  from: string;
  to: string;
  size?: "sm" | "lg";
  isExpired?: boolean;
  wrapOnMobile?: boolean;
}

/** Displays a valid_from → valid_until window with tabular figures. */
export function TimeWindow({
  from,
  to,
  size = "sm",
  isExpired = false,
  wrapOnMobile = false,
}: TimeWindowProps) {
  const classes = [
    "time-window",
    size === "lg" ? "time-window--lg" : "",
    isExpired ? "time-window--expired" : "",
    wrapOnMobile ? "time-window--wrap" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      <span>{from}</span>
      <ArrowRight size={size === "lg" ? 18 : 14} aria-hidden="true" />
      <span className="visually-hidden">to</span>
      <span>{to}</span>
    </span>
  );
}
