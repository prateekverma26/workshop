"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { ProfileSummary } from "../../components/visitor/ProfileSummary";
import { PassList } from "../../components/visitor/PassList";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import {
  subscribeProfile,
  getCurrentProfile,
  getServerProfile,
  clearSession,
} from "@/lib/profileStore";
import { listPasses } from "@/lib/passStore";

export default function PassesPage() {
  const router = useRouter();
  const profile = useSyncExternalStore(
    subscribeProfile,
    getCurrentProfile,
    getServerProfile,
  );

  // Read the real client session inside the effect (not the transient
  // hydration snapshot) so logged-in visitors are never wrongly redirected.
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

  const passes = listPasses(profile.phone).map((p) => ({
    id: p.id,
    referenceNumber: p.referenceNumber,
    purpose: p.purpose,
    date: p.validFrom,
    status: p.status,
  }));

  function logOut() {
    clearSession();
    router.replace("/welcome");
  }

  return (
    <>
      <MobileHeader
        facilityName="Shastri Bhawan"
        action={
          <Button variant="ghost" size="sm" onClick={logOut}>
            Log out
          </Button>
        }
      />
      <PageWrapper width="narrow">
        <div className="onboard">
          <div className="home-greeting">
            <h1>Welcome, {profile.name.split(" ")[0]}</h1>
            <p className="onboard__lede">
              Request a new pass or check one you&rsquo;ve already submitted.
            </p>
          </div>

          <ProfileSummary
            name={profile.name}
            phoneLast4={profile.phoneLast4}
            idType={profile.idType}
            idLast4={profile.idLast4}
            photoSrc={profile.idPhotoDataUrl}
          />

          <section className="onboard__section">
            <div className="home-section__head">
              <h2>Your passes</h2>
              <Link href="/request" className="btn btn--primary btn--sm">
                Request a pass
              </Link>
            </div>
            <PassList passes={passes} />
          </section>
        </div>
      </PageWrapper>
    </>
  );
}
