# Workflow: Manual Fallback

## Purpose

The manual fallback procedure ensures that facility access control continues operating when the digital system is unavailable or when a visitor cannot use the standard digital flow. It is a controlled degraded mode — not an informal workaround.

---

## Trigger Conditions

Fallback is activated when any of the following occur:

| Trigger | Who activates | Threshold |
|---|---|---|
| Gate terminal offline / cannot connect to system | Gate Security | Immediately on confirmed outage |
| QR scanner hardware failure at a gate | Gate Security | Immediately; other gates continue normally |
| Visitor has no smartphone and no digital pass | Gate Security | Per visitor; digital flow inapplicable |
| OTP cannot be received and visitor is at the gate | Gate Security + Approving Officer | After visitor has waited and confirmed OTP failure |
| System-wide outage | Facility Admin | System-wide fallback declared; all gates switch |

---

## Actors

| Actor | Role in this flow |
|---|---|
| Visitor | Provides identity information verbally and via physical ID |
| Gate Security | Executes the fallback; completes the paper register |
| Approving Officer | Verbally confirms the visitor's authorisation |
| Facility Admin | Oversees system-wide fallback; manages restoration |

---

## Steps

### 1. Guard confirms fallback mode
The guard checks that the outage is real (not a transient scan error — see gate-verification.md SCAN\_ERROR). After confirming, the guard activates fallback mode on the terminal (if available) or switches to the paper register.

Guard informs the visitor: *"Our system is temporarily unavailable. We will verify you manually — please have your government ID ready."*

---

### 2. Guard contacts the Approving Officer
The guard calls or messages the Approving Officer for the visitor's stated host department. The guard states:
- Visitor's name and ID number (as provided by the visitor)
- Stated purpose of visit
- Current date and time

The officer verbally confirms: "Yes, I am expecting this visitor" or "I have no record of this visit — deny entry."

If the officer is unreachable, the guard escalates to the next available senior officer or duty supervisor.

---

### 3. Guard issues a physical fallback pass
On verbal confirmation from the officer, the guard completes a pre-printed fallback pass form:

| Field | Value |
|---|---|
| Visitor name | As stated and matched to physical ID |
| ID type and number (last 4 digits only) | e.g. Aadhaar ×××× ×××× 4821 |
| Purpose of visit | As stated by visitor |
| Host department and officer name | As verbally confirmed |
| Valid from | Current time |
| Valid until | Maximum 2 hours from issue time; or end of working hours, whichever is sooner |
| Gate number | Guard's assigned gate |
| Guard name and signature | Required |
| Officer name (verbal confirmation) | Required |

The guard retains the original; the visitor is given a carbon copy or photograph.

---

### 4. Guard logs entry in paper register
The guard records the entry in the physical gate register:

- Date and time of entry
- Visitor name
- Fallback pass number (sequential, pre-printed on form)
- ID type (not full number)
- Host department
- Guard name

This register is kept in a locked cabinet at the gate station.

---

### 5. System restoration and digitisation
When the system comes back online, the Facility Admin or Guard digitises all fallback entries:

- Each MANUAL\_ENTRY is entered into the system with:
  - Timestamp (from paper register, not current time)
  - Visitor name
  - Guard name
  - Officer who confirmed
  - Fallback reason (from a dropdown: SYSTEM\_OFFLINE, SCANNER\_FAILURE, NO\_SMARTPHONE, OTP\_FAILURE)
- All MANUAL\_ENTRY events are flagged in the audit log and visible to Facility Admin

Digitisation must be completed within **24 hours** of system restoration.

---

## Rules and Constraints

| Rule | Detail |
|---|---|
| Fallback passes are single-visit only | No re-entry on the same fallback pass |
| Maximum valid window | 2 hours from issue, or end of working hours |
| Officer confirmation is mandatory | No fallback pass may be issued without verbal confirmation from an Approving Officer or supervisor — no exceptions |
| Escalation if officer unreachable | After 2 attempts, escalate to the duty supervisor; log the escalation on the paper register |
| System-wide fallback threshold | If system has been offline for more than 2 hours, Facility Admin must be notified and must decide whether to continue fallback operations or suspend non-essential access |
| Paper register is the canonical record during outage | Digital logs are not created in real time during fallback; the paper register is the legal record |

---

## Privacy Constraints During Fallback

- Collect **minimum data only** — name, partial ID number (last 4 digits), purpose, host. Full ID number must not be written on any paper form.
- Paper registers are stored in a **locked cabinet** — access limited to the guard on duty and Facility Admin
- Registers are **digitised and shredded** after 30 days (same retention policy as digital records)
- No photos of physical ID are taken or stored during fallback
- Fallback data is subject to the same DPDP Act 2023 constraints as digital data — see `al/knowledge/domain/entry-permit-rules.md`

---

## Audit Representation

All fallback entries appear in the digital audit log after digitisation with:
- Flag: `MANUAL_ENTRY: true`
- Fallback reason
- Digitised by (staff member who entered the record)
- Digitised at (timestamp of digitisation)
- Original entry time (from paper register)

Auditors can filter the audit log by `MANUAL_ENTRY` to review all fallback events separately from normal digital flow.
