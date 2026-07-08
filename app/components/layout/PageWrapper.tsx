import "./layout.css";

interface PageWrapperProps {
  /** narrow (720px, forms/visitor) or wide (1200px, dashboards). */
  width?: "narrow" | "wide";
  children: React.ReactNode;
}

export function PageWrapper({ width = "wide", children }: PageWrapperProps) {
  return <main className={`page page--${width}`}>{children}</main>;
}
