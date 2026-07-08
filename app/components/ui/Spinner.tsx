import "./ui.css";
import { LoaderCircle } from "lucide-react";

interface SpinnerProps {
  size?: number;
  label?: string;
}

export function Spinner({ size = 20, label }: SpinnerProps) {
  return (
    <span className="spinner" role="status">
      <LoaderCircle size={size} strokeWidth={2} aria-hidden="true" />
      {label ? <span className="visually-hidden">{label}</span> : null}
    </span>
  );
}
