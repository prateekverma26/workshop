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
The visitor is **already signed in** (profile created or logged in via `onboarding.md`), so identity — name, phone, government-ID type + last 4, ID photo — is loaded from their profile and shown read-only. The request form therefore collects **only the visit-specific fields**:
- Purpose of visit (freetext, 10–200 chars)
- Host department (dropdown from facility config)
- Requested visit date and time window (date picker + time range)

Identity is **not** re-entered, and there is **no per-request OTP** — phone verification happens once at signup/login, not on every pass.

**Screen state: DRAFT**

---

### 2. Request submitted
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
| DRAFT | Signed-in visitor opens form | Visit-detail form + read-only identity | Fill and submit |
| PENDING | Request submitted | Reference number, status | None (waiting) |
| APPROVED | Officer approves | QR code, pass details | Show at gate |
| REJECTED | Officer rejects | Reason, next steps | Re-apply, contact host |
| EXPIRED | Valid window passed | Expiry notice | Re-request new slot |

(Phone verification is handled once at signup/login — see `onboarding.md` — not per request.)

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
