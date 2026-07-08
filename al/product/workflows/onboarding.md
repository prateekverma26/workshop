# Workflow: Onboarding (First-Run)

## Purpose

How each user type gets into the system the first time. The three roles onboard differently because their relationship to the system differs: visitors have no account and need a low-friction welcome; officers and guards have Admin-provisioned accounts and need their assignment confirmed plus a short activation primer.

This workflow does **not** create accounts, set roles, or define a staff authentication mechanism. Staff credentials are provisioned by the Facility Admin; the first-login credential step is an abstract slot the real auth system plugs into later.

---

## Actors

| Actor | Onboarding shape |
|---|---|
| Visitor | One-screen welcome: what the system is, what you'll need, the privacy promise → straight into the request form |
| Approving Officer | First login → confirm assigned department scope → optional delegation setup → queue primer |
| Gate Security | First login → confirm assigned gate → terminal-states primer → start shift |
| Facility Admin | Provisions officer/guard accounts (see facility-admin.md); not onboarded by this flow |

---

## Flow A: Visitor first run — create a profile once

Visitors create a **lightweight profile once**; on return they log in. Identity is captured a single time, then reused.

### Steps (first-time)

1. **Welcome** — visitor lands on the public portal. One screen states what the system does ("Request a gate pass before you arrive"), roughly how long profile setup takes (~2 minutes), and what they'll need:
   - A mobile phone that can receive the OTP
   - A government ID (Aadhaar / PAN / Passport / Driving Licence) to photograph
   The screen offers two paths: **Create your profile** (first time) and **Log in** (returning).
2. **Privacy promise** — the DPDP commitments in plain language: minimum data collected, no biometrics, only the last 4 digits of the ID retained, records deletable, auto-deleted after the retention period. This primes the consent checkbox on the profile form.
3. **Create profile** — visitor enters identity once: name, phone, government-ID type + number, ID photo, and ticks consent.
4. **Verify phone** — OTP (demo `123456`). On success the profile / visitor ID is created and the session is signed in.
5. **Land on home** — the visitor home (`/passes`): greeting, their (empty) pass list, and a "Request a pass" action → the slimmed request flow (`request-and-approval.md`).

### Steps (returning)

1. **Log in** — from Welcome, "Log in" → enter phone → OTP (`123456`).
2. **Session restored** — the saved profile loads; visitor lands on their home with identity already known. No re-entry.

### Screen states

| State | Trigger | Visitor sees | Actions |
|---|---|---|---|
| WELCOME | First arrival | Intro, requirements, privacy, two paths | "Create profile" / "Log in" |
| SIGNUP | Chose create | Identity form + consent | Submit → OTP |
| SIGNUP_OTP | Identity submitted | OTP entry (demo 123456) | Verify → profile created |
| LOGIN | Chose log in | Phone entry | Send code → OTP |
| LOGIN_OTP | Phone submitted | OTP entry | Verify → session restored |
| HOME | Authenticated | Greeting, pass list, request action | Request a pass |

### Edge cases

| Scenario | Handling |
|---|---|
| Visitor abandons before OTP | No profile created, nothing persisted |
| Log in with a phone that has no profile | "No profile for this number" → offered "Create one" |
| Returning visitor on a new device / cleared storage | Profile isn't found locally → they log in; in production the profile is server-side, in the demo they re-create |
| Visitor wants their data removed | Profile is deletable from home (right to erasure, DPDP) |
| Not signed in but navigates to request/home | Redirected to Welcome to log in or sign up first |

---

## Flow B: Approving Officer first run

Account already exists, created by the Facility Admin with a department scope.

### Steps

1. **First login** — officer signs in with Admin-issued credentials. *(Credential mechanics abstract — out of scope here.)*
2. **Confirm scope** — read-only display of what the Admin assigned: name, role, department/zone scope. The officer confirms it is correct. If wrong, the instruction is "contact your Facility Admin" — the officer can never edit their own scope.
3. **Delegation setup (skippable)** — offer to assign a backup officer now, with a one-line reason why (queue stalls during absence). Skipping is fine; the control lives in settings afterwards.
4. **Queue primer** — one screen of operating rules drawn from the role file: queue sorted by requested visit time; open a request to review the ID photo and purpose before deciding; routine decision in under 60 seconds; SLA for pending requests; no bulk approval exists by design.
5. **Done** — lands on their (empty) queue with its standard empty state.

### Screen states

| State | Sees | Actions |
|---|---|---|
| FIRST_LOGIN | Credential step (abstract) | Sign in |
| CONFIRM_SCOPE | Name, role, department scope (read-only) | Confirm / contact Admin |
| DELEGATION_SETUP | Delegate picker | Assign or Skip |
| QUEUE_PRIMER | Operating rules | Continue |
| DONE | Empty queue | — |

### Edge cases

| Scenario | Handling |
|---|---|
| Officer has no department scope assigned yet | CONFIRM_SCOPE blocks with "contact your Facility Admin"; cannot proceed to the queue |
| Officer skips delegation and later goes on leave | Standard SLA escalation applies (request-and-approval.md) |
| Onboarding interrupted mid-way | Resumes at the last incomplete step on next login; completed steps are not repeated |
| Returning user | Onboarding shows exactly once; a completed flag suppresses it afterwards |

---

## Flow C: Gate Security first run

Account already exists, scoped to one or more gates.

### Steps

1. **First login** — guard signs in on the gate terminal. *(Credential mechanics abstract.)* Individual login is mandatory — shared logins invalidate the audit trail.
2. **Confirm gate** — if assigned to one gate, confirm it; if assigned to several, pick the gate they are staffing now. Gate list comes from the Admin's assignment.
3. **Terminal primer** — the legend of the five verification states (VALID green / EXPIRED red / INVALID_TIME amber / ALREADY_USED red / SCAN_ERROR grey), each with its one-line meaning and available action. The guard acknowledges the legend before proceeding — instant colour recognition is an operational requirement (gate-security.md), so it is taught once, up front.
4. **Start shift** — records shift start time and lands on SCAN_READY (`gate-verification.md`).

### Screen states

| State | Sees | Actions |
|---|---|---|
| FIRST_LOGIN | Credential step (abstract) | Sign in |
| CONFIRM_GATE | Assigned gate(s) | Confirm / select gate |
| TERMINAL_PRIMER | Five-state legend | Acknowledge |
| SHIFT_START | Gate + start confirmation | Start shift → SCAN_READY |

### Edge cases

| Scenario | Handling |
|---|---|
| Guard assigned to multiple gates | CONFIRM_GATE presents a picker; the choice sets the terminal's gate for the shift |
| Guard assigned to no gate | Blocks with "contact your Facility Admin" |
| Terminal offline during first run | Onboarding requires connectivity; fall back to the paper procedure (manual-fallback.md) and onboard when restored |
| Guard rotates to a new facility | Runs onboarding once per facility assignment |

---

## Rules

- Onboarding never collects data the operational flows don't already collect; it is orientation and confirmation only.
- Staff can never edit their own scope, role, or gate assignment from onboarding — read-only, with "contact your Facility Admin" as the only remedy.
- Every step transition respects reduced motion.
- The primer content is drawn from the role files; if a role file changes, the primer changes with it.
