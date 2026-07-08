import "./gate.css";
import { Button } from "../ui/Button";

interface GrantEntryButtonProps {
  onGrant: () => void;
  isLoading?: boolean;
}

export function GrantEntryButton({ onGrant, isLoading }: GrantEntryButtonProps) {
  return (
    <Button
      className="grant-entry"
      size="lg"
      onClick={onGrant}
      isLoading={isLoading}
    >
      Grant Entry
    </Button>
  );
}
