import "./ui.css";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string;
  /** Required — this is an ID photo used for human verification. */
  alt: string;
  name?: string;
  size?: AvatarSize;
}

function initials(name?: string): string {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({ src, alt, name, size = "md" }: AvatarProps) {
  if (!src) {
    return (
      <span
        className={`avatar avatar--${size} avatar__fallback`}
        role="img"
        aria-label={alt}
      >
        <span aria-hidden="true">{initials(name)}</span>
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={`avatar avatar--${size}`} src={src} alt={alt} />
  );
}
