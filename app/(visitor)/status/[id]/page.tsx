"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import QRCode from "qrcode";
import { PageWrapper } from "../../../components/layout/PageWrapper";
import { MobileHeader } from "../../../components/layout/MobileHeader";
import { PassStatusBanner } from "../../../components/visitor/PassStatusBanner";
import { PassCard } from "../../../components/visitor/PassCard";
import { RejectionDetail } from "../../../components/visitor/RejectionDetail";
import { PassExpiredNotice } from "../../../components/visitor/PassExpiredNotice";
import { Spinner } from "../../../components/ui/Spinner";
import { ErrorState } from "../../../components/ui/ErrorState";
import { getPass } from "@/lib/passStore";

// Read-once external store: null on the server, actual pass on the client,
// with a stable snapshot identity (passStore caches by id) so there is no loop.
const subscribe = () => () => {};

export default function StatusPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const pass = useSyncExternalStore(
    subscribe,
    () => getPass(id),
    () => null,
  );
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    if (pass?.status === "APPROVED" && pass.qrToken) {
      QRCode.toDataURL(pass.qrToken, {
        margin: 1,
        width: 360,
        color: { dark: "#0b1a1c", light: "#ffffff" },
      })
        .then((url) => {
          if (active) setQr(url);
        })
        .catch(() => {});
    }
    return () => {
      active = false;
    };
  }, [pass]);

  return (
    <>
      <MobileHeader title="Your gate pass" onBack={() => router.push("/welcome")} />
      <PageWrapper width="narrow">
        <div className="onboard">
          {pass === null ? (
            <ErrorState
              title="Pass not found"
              message="We couldn't find this request. It may have expired from this session."
              action={
                <Link href="/request" className="btn btn--primary">
                  Start a new request
                </Link>
              }
            />
          ) : null}

          {pass?.status === "PENDING" ? (
            <>
              <div className="onboard__intro">
                <h1>Request submitted</h1>
                <p className="onboard__lede">
                  {pass.hostDepartment} will review your request. You&rsquo;ll be
                  notified as soon as there&rsquo;s a decision — you can leave this
                  page.
                </p>
              </div>
              <PassStatusBanner
                status="PENDING"
                message="Waiting for your host department to approve."
                meta={`Ref ${pass.referenceNumber} · usually within 2 working hours`}
              />
              <div className="demo-outcomes">
                <p className="demo-outcomes__label">Demo — preview an outcome</p>
                <div className="demo-outcomes__links">
                  <Link href="/status/demo-approved" className="btn btn--secondary btn--sm">
                    Approved
                  </Link>
                  <Link href="/status/demo-rejected" className="btn btn--secondary btn--sm">
                    Rejected
                  </Link>
                  <Link href="/status/demo-expired" className="btn btn--secondary btn--sm">
                    Expired
                  </Link>
                </div>
              </div>
            </>
          ) : null}

          {pass?.status === "APPROVED" ? (
            qr ? (
              <PassCard
                qrSrc={qr}
                visitorName={pass.visitorName}
                validFrom={pass.validFrom}
                validTo={pass.validTo}
                facility={pass.facility}
                gate={pass.gate}
                approverName={pass.approverName ?? "—"}
                referenceNumber={pass.referenceNumber}
                state="APPROVED"
              />
            ) : (
              <div className="onboard__section" aria-live="polite">
                <Spinner label="Preparing your pass" />
              </div>
            )
          ) : null}

          {pass?.status === "REJECTED" ? (
            <>
              <div className="onboard__intro">
                <h1>Request not approved</h1>
              </div>
              <RejectionDetail
                reason={pass.rejectionReason ?? "Your request could not be approved."}
                steps={
                  <p className="notice-panel__reason">
                    You can correct the details and submit a new request, or
                    contact your host in {pass.hostDepartment} directly.
                  </p>
                }
                actions={
                  <Link href="/request" className="btn btn--primary">
                    Re-apply
                  </Link>
                }
              />
            </>
          ) : null}

          {pass?.status === "EXPIRED" ? (
            <>
              <div className="onboard__intro">
                <h1>This pass has expired</h1>
              </div>
              <PassExpiredNotice
                expiryTime={pass.validTo}
                action={
                  <Link href="/request" className="btn btn--primary">
                    Request a new slot
                  </Link>
                }
              />
            </>
          ) : null}
        </div>
      </PageWrapper>
    </>
  );
}
