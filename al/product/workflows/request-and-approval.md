# Workflow: Request and Approval

## Actors

| Actor | Role in this flow |
|---|---|
| Visitor | Initiates the request; provides identity and purpose |
| System | Validates input, sends OTP, routes request, generates pass |
| Approving Officer | Reviews the request and approves or rejects |

---

## Steps

### 1. Visitor opens the request form
The visitor navigates to the visitor pass portal (web or app). If they have a prior profile, personal fields are pre-filled. The form collects:
- Full name
- Mobile number (used for OTP)
- Purpose of visit (freetext, 10–200 chars)
- Host department (dropdown from facility config)
- Requested visit date and time window (date picker + time range)
- Government ID type (Aadhaar / PAN / Passport / Driving Licence)
- Government ID number
- Government ID photo (upload or camera capture)

**Screen state: DRAFT**

---

### 2. OTP verification
On form submission, the system sends a 6-digit OTP to the visitor's mobile number.
- Demo system OTP: **123456** (hardcoded for development; no real SMS sent)
- The visitor enters the OTP on the next screen
- The system confirms the OTP → identity is linked to the phone number

**Screen state: OTP\_PENDING**

On success → proceed to Step 3.
On failure → show error; allow resend (max 3 attempts within 10 minutes, then 30-minute lockout).

---

### 3. Request submitted
The system creates a pass request record with status PENDING. The Approving Officer for the selected host department is notified (in-app + email, if configured).

The visitor sees a confirmation screen showing:
- Request reference number
- Current status: PENDING
- Expected resolution time (facility SLA, e.g. "within 2 working hours")

**Screen state: PENDING**

---

### 4. Approving Officer reviews
The officer opens the request from their queue. They see:
- Visitor name, phone (last 4 digits visible), purpose description
- Requested visit date and time window
- Government ID photo (displayed for visual inspection)
- ID type and number (last 4 digits only)

The officer takes one of two actions:

#### 4a. Approve
- Confirms or adjusts the valid time window (default: requested window)
- Optionally adds a note to the visitor
- Taps "Approve" → system generates pass

#### 4b. Reject
- Selects a rejection reason from a dropdown (e.g. "Purpose unclear", "Outside working hours", "Host unavailable", "Other")
- Optionally adds freetext context
- Taps "Reject" → visitor is notified with the reason

---

### 5. Visitor notified

**On approval:** Visitor receives notification. Pass screen shows:
- QR code (large, high-contrast, single-use)
- Visitor name
- Valid time window
- Facility name and gate
- Approving officer name
- Reference number

**Screen state: APPROVED**

**On rejection:** Visitor receives notification with reason and next steps.

**Screen state: REJECTED**

---

### 6. Pass expiry
If the pass is not used before the valid window closes, the system automatically transitions it to EXPIRED. The visitor can re-request for a new slot.

**Screen state: EXPIRED**

---

## Screen States

| State | Trigger | Visitor sees | Actions available |
|---|---|---|---|
| DRAFT | Form opened | Request form | Fill and submit |
| OTP\_PENDING | Form submitted | OTP entry screen | Enter OTP, resend |
| PENDING | OTP verified | Reference number, status | None (waiting) |
| APPROVED | Officer approves | QR code, pass details | Show at gate |
| REJECTED | Officer rejects | Reason, next steps | Re-apply, contact host |
| EXPIRED | Valid window passed | Expiry notice | Re-request new slot |

---

## Edge Cases

| Scenario | Handling |
|---|---|
| OTP not received | Resend option; max 3 attempts; after 3 failures show "contact support" |
| Visitor submits duplicate request (same day, same facility) | System detects duplicate → shows existing PENDING or APPROVED pass instead of creating a new one |
| Date in the past submitted | Form validation blocks submission; date picker enforces future-only selection |
| Officer queue SLA breached (no action within defined hours) | System escalates to backup officer if one is assigned; else flags request as SLA\_BREACHED and alerts Facility Admin |
| Officer rejects with insufficient reason | "Other" reason requires minimum 20 characters of freetext |
| Visitor changes their mind after submitting | Visitor can cancel a PENDING request; cannot cancel an APPROVED pass (must contact facility) |
| Valid time window set in the past by officer | System validation prevents officer from setting an end time before the current time |
