# Domain Knowledge: Entry Permit Rules

This file defines the four core rules governing every gate pass in this system. All code, UI, and agent behaviour must respect these rules. They are not configurable by individual users — they are foundational constraints.

---

## Rule 1: Single-Visit, Time-Boxed Pass

Every gate pass issued by this system is:

- **Single-visit:** The QR code may be used for entry exactly once. After a successful scan and entry grant, the pass transitions to USED and the QR code is permanently invalidated. Attempting to scan a USED QR returns an ALREADY\_USED state at the terminal — no second entry is possible on the same pass, even within the valid time window.

- **Time-boxed:** Every pass has an explicit `valid_from` and `valid_until` timestamp set by the Approving Officer at the time of approval. The system enforces this window at the gate terminal — no entry is possible before `valid_from` or after `valid_until`, regardless of whether the QR has been used.

**Implications for UI:**
- The approved pass screen must display the valid window prominently alongside the QR code
- The gate terminal must show the time window on the VALID screen so the guard can communicate it to the visitor
- The system must evaluate both the window and the USED flag on every scan — they are independent checks

**Implications for data:**
- Pass records must store: `status` (PENDING / APPROVED / USED / EXPIRED / REJECTED), `valid_from`, `valid_until`, `entry_logged_at`, `entry_gate_id`, `entry_guard_id`
- Status transitions are one-directional and immutable once reached (USED cannot revert to APPROVED)

---

## Rule 2: OTP Login (Demo: 123456)

Visitor identity is verified at request time via a one-time password (OTP) sent to the visitor's registered mobile number.

**Demo system behaviour:**
- The OTP for all users in the development/demo environment is **123456**
- No real SMS is sent in the demo environment
- The OTP input field accepts any value but only **123456** succeeds in demo mode
- This must be clearly indicated in the UI during demo mode (e.g. a small notice: "Demo mode — OTP is 123456")

**Production behaviour (future):**
- A real 6-digit OTP is generated and sent via SMS to the visitor's phone
- OTP is valid for 10 minutes
- Maximum 3 attempts before a 30-minute lockout
- OTP is single-use: once verified, it cannot be re-entered

**What OTP verification proves:**
- The visitor controls the phone number they provided
- It does not prove the visitor's legal identity — that is handled by the government ID photo (Rule 3)

**UI requirements:**
- Show the last 4 digits of the phone number the OTP was sent to (e.g. "OTP sent to ×××××× 4821")
- Provide a resend option with a countdown timer (e.g. "Resend in 45s")
- Show attempt count if retries are made

---

## Rule 3: Simulated Identity from Government ID Photo

The system uses a government-issued ID photo for visual identity verification at the gate. This is a **human visual check**, not a biometric system.

**What the system does:**
- Accepts an uploaded photo or camera capture of the visitor's government-issued ID document (Aadhaar card, PAN card, Passport, Driving Licence)
- Stores the photo against the pass record for the duration of the retention period
- Displays the photo on the gate terminal's VALID screen so the guard can visually compare it to the visitor's face
- Displays the ID type and the last 4 digits of the ID number (all other digits are masked: `×××× ×××× 4821`)

**What the system does not do:**
- Extract any biometric data from the photo (no facial recognition, no fingerprint, no iris scan)
- Verify the authenticity of the ID document (no API call to Aadhaar, UIDAI, or any government database)
- Store the full ID number in any form after the initial submission (only the last 4 digits are retained)
- Process the photo through any ML model for identity scoring

**Simulated identity in demo mode:**
- The uploaded photo is accepted as-is with no validation
- A placeholder "ID verified" status is shown after upload
- In a real deployment, a document liveness check (confirming it is a physical card, not a screenshot) would be added as a pre-processing step — but this is out of scope for the current build

**UI requirements:**
- The upload field must accept JPEG and PNG; max 5MB
- Show a preview of the uploaded photo before submission
- Display a confirmation that the photo has been received, not that it has been "verified" — the word "verified" is reserved for OTP confirmation
- On the gate terminal, display the photo at full-width so it is clearly visible at arm's length

---

## Rule 4: Privacy — Never Real Biometric or Citizen Data

This rule is absolute and non-negotiable. It governs every layer of the system.

**The constraint:**
The system must never collect, store, process, or transmit:
- Biometric data of any kind: fingerprints, facial recognition scores or embeddings, iris scan data, voice prints
- Real Aadhaar numbers (only the last 4 digits of any ID may be retained after submission)
- Real-time data from government citizen databases (no UIDAI API, no DigiLocker data pull, no DIGI-YATRA biometric pipeline)
- Location data beyond the facility name and gate number

**Model: DigiYatra / DPDP Act 2023**
This system follows the privacy model established by India's Digital Personal Data Protection Act 2023 and the principles demonstrated by DigiYatra's consent-based, data-minimisation approach:

| Principle | Application in this system |
|---|---|
| **Purpose limitation** | Data collected only for the specific visit being requested. Not used for profiling, analytics beyond facility capacity planning, or any secondary purpose. |
| **Data minimisation** | Minimum fields required for access control: name, phone (for OTP), purpose, host, ID photo, last 4 digits of ID number. |
| **Consent** | By submitting a pass request, the visitor consents to their data being held for the duration of their visit plus the retention period. Consent is explicit — a checkbox on the request form. |
| **Right to erasure** | A visitor may request deletion of their data by contacting the Facility Admin. Admin can trigger deletion of a specific visitor's records from the data retention screen. |
| **Retention limit** | Pass records and associated photos are automatically deleted after **30 days** (configurable per facility, minimum 7 days, maximum 90 days). Audit log entries are retained for **1 year** (immutable; cannot be shortened). |
| **No data sharing** | Visitor data is never shared with third parties. Integration with external government APIs is out of scope for this system. |
| **Security** | All data at rest is encrypted. QR codes use signed tokens that cannot be forged or decoded to reveal visitor data. |

**Visitor profiles (created once, reused across visits):**
A visitor profile persists identity so it isn't re-entered each visit. It holds **only**: name, phone number (the account key), government-ID type, the **last 4 digits** of the ID number, and the ID photo — never a full ID number, never biometrics. A profile is created with explicit consent, is **deletable by the visitor at any time** (right to erasure), and is subject to the same retention limits as any other record. A profile grants **no access on its own** — every pass is still individually reviewed. Phone verification (OTP) happens once at signup and again at each login, never per pass.

**Developer note:**
If any feature request would require storing a full ID number, biometric data, or calling an external citizen identity API — that feature must not be implemented without a formal privacy review and explicit Facility Admin consent configuration. The default is always data minimisation.
