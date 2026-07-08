import Link from "next/link";
import { QrCode, Inbox, ScanLine, ChevronRight } from "lucide-react";
import { PageWrapper } from "./components/layout/PageWrapper";
import { TopNav } from "./components/layout/TopNav";

const ROLES = [
  {
    href: "/welcome",
    icon: QrCode,
    title: "Visitor",
    desc: "Request a gate pass before you arrive",
  },
  {
    href: "/onboarding",
    icon: Inbox,
    title: "Approving Officer",
    desc: "Review and decide visitor requests for your department",
  },
  {
    href: "/terminal-setup",
    icon: ScanLine,
    title: "Gate Security",
    desc: "Verify passes and log entries at your gate",
  },
];

export default function Home() {
  return (
    <>
      <TopNav facilityName="Shastri Bhawan" roleLabel="Demo" />
      <PageWrapper width="narrow">
        <div className="onboard">
          <div className="onboard__intro">
            <h1>Gate Pass Authentication</h1>
            <p className="onboard__lede">
              Digital gate passes for government facilities — requested online,
              approved by the host department, verified at the gate. Choose a
              role to begin.
            </p>
          </div>
          <nav className="launcher" aria-label="Choose your role">
            {ROLES.map((role) => {
              const Icon = role.icon;
              return (
                <Link key={role.href} href={role.href} className="launcher__row">
                  <span className="launcher__icon">
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="launcher__text">
                    <span className="launcher__title">{role.title}</span>
                    <br />
                    <span className="launcher__desc">{role.desc}</span>
                  </span>
                  <ChevronRight className="launcher__chevron" size={18} aria-hidden="true" />
                </Link>
              );
            })}
          </nav>
        </div>
      </PageWrapper>
    </>
  );
}
