# Role: Visitor

## Who They Are

A Visitor is any person who does not hold a permanent access credential for the facility. This includes:

- Members of the public attending a scheduled meeting, interview, or service appointment
- Employees of external organisations visiting for official business
- Delivery personnel, vendors, and contractors with pre-arranged access
- Repeat visitors (e.g. regular consultants) who may have a known profile in the system

Visitors are **not** internal staff. They hold a **lightweight self-service profile**, created once on first use: name, phone number, and government-ID details, with the phone verified by OTP and explicit consent captured. The profile is theirs to delete at any time. On return visits they log in with their phone + OTP — they do **not** re-enter their identity. A profile is an identity convenience only; it grants no standing access, and **every pass is still reviewed individually** by the host officer.

**Context at the gate:** Visitors are often stressed, unfamiliar with the facility, and time-pressured. They may be navigating the app on a mobile device with poor signal, in bright sunlight, or in a noisy environment. Every screen they see must be legible, obvious, and forgiving.

---

## What They Need to See

| Screen / State | Information Required |
|---|---|
| Request form | Fields for: name, phone number, purpose of visit, host department, date and time of visit, government ID number, ID photo upload |
| OTP entry | Clear prompt showing the phone number the OTP was sent to; resend option |
| Pass status | Current status (Pending / Approved / Rejected) with expected resolution time |
| Approved pass | QR code (large, high-contrast), valid time window, facility name, host name, approver name |
| Rejected pass | Rejection reason in plain language; what to do next (contact host, re-apply, etc.) |
| Expired pass | Clear expiry notice; option to re-request for a new time slot |

---

## What They Need to Do

1. **Create a profile once** — first-time visitors enter name, phone, government-ID details, and an ID photo, verify the phone by OTP, and consent to the data policy. This is done a single time.
2. **Log in on return** — enter phone + OTP; the saved profile loads, no identity re-entry.
3. **Request a pass** — from their profile, fill only the visit-specific details: purpose, host department, date, and time window.
4. **Track their pass status** — check whether the request is pending, approved, or rejected.
5. **Present their pass at the gate** — show the QR code on their phone screen to the security terminal.
6. **Comply with the time window** — arrive and complete entry within the approved time slot.

---

## What They Must Never Do

- Share or transfer their QR code to another person — passes are non-transferable and tied to the visitor's identity
- Submit false information on the request form — name, purpose, or ID details must be accurate
- Attempt entry outside the approved time window
- Upload a fake, altered, or third-party government ID photo
- Attempt to rescan a QR code after a successful entry (single-use enforcement)

---

## What Success Looks Like

- A first-time visitor can submit a pass request in under **2 minutes** without assistance
- The visitor receives their pass (or rejection) before they leave for the facility
- At the gate, the QR scan and entry takes under **30 seconds** with no confusion
- If something goes wrong (OTP not received, request rejected), the visitor knows exactly what to do next without calling anyone
- The visitor leaves with their personal data protected — no unnecessary data collected, no biometric retained
