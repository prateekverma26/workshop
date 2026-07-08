"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { ProfileSummary } from "../../components/visitor/ProfileSummary";
import { VisitForm, type VisitFormValues } from "../../components/visitor/VisitForm";
import { Spinner } from "../../components/ui/Spinner";
import {
  subscribeProfile,
  getCurrentProfile,
  getServerProfile,
} from "@/lib/profileStore";
import { createPendingPass } from "@/lib/passStore";

const DEPARTMENTS = [
  { value: "grievances", label: "Public Grievances" },
  { value: "admin", label: "Administration" },
  { value: "it", label: "IT & Systems" },
  { value: "records", label: "Records & Archives" },
];

function labelFor(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

export default function RequestPage() {
  const router = useRouter();
  const profile = useSyncExternalStore(
    subscribeProfile,
    getCurrentProfile,
    getServerProfile,
  );

  useEffect(() => {
    if (getCurrentProfile() === null) router.replace("/welcome");
  }, [router, profile]);

  if (!profile) {
    return (
      <>
        <MobileHeader facilityName="Shastri Bhawan" />
        <PageWrapper width="narrow">
          <div className="onboard" aria-live="polite">
            <Spinner label="Loading your profile" />
          </div>
        </PageWrapper>
      </>
    );
  }

  const activeProfile = profile;
  async function handleSubmit(visit: VisitFormValues) {
    const id = createPendingPass({
      ownerId: activeProfile.phone,
      visitorName: activeProfile.name,
      phoneLast4: activeProfile.phoneLast4,
      purpose: visit.purpose,
      hostDepartment: labelFor(DEPARTMENTS, visit.hostDepartment),
      facility: "Shastri Bhawan",
      gate: "Gate 1 — Main Entrance",
      validFrom: `${visit.date} ${visit.timeFrom}`,
      validTo: `${visit.date} ${visit.timeTo}`,
      idType: activeProfile.idType,
      idLast4: activeProfile.idLast4,
    });
    router.push(`/status/${id}`);
  }

  return (
    <>
      <MobileHeader facilityName="Shastri Bhawan" onBack={() => router.push("/passes")} />
      <PageWrapper width="narrow">
        <div className="onboard">
          <div className="onboard__intro">
            <h1>Request a gate pass</h1>
            <p className="onboard__lede">
              Your identity is loaded from your profile — just tell us about this
              visit.
            </p>
          </div>

          <ProfileSummary
            name={profile.name}
            phoneLast4={profile.phoneLast4}
            idType={profile.idType}
            idLast4={profile.idLast4}
            photoSrc={profile.idPhotoDataUrl}
          />

          <VisitForm departments={DEPARTMENTS} onSubmit={handleSubmit} />
        </div>
      </PageWrapper>
    </>
  );
}
