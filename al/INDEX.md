# AL/ — Agent Context Layer

**Read this file first.** This folder contains the authoritative product and technical context for the gate pass authentication system. Every agent working on this codebase must load the relevant files here before writing code, designing screens, or making decisions.

---

## What This System Is

A digital gate pass authentication platform for government facilities. Visitors request time-boxed, single-use passes online; Approving Officers review and authorise them; Gate Security verifies them at entry points. It replaces paper-based gate registers with an auditable, privacy-compliant digital trail.

---

## File Map

### Product — Roles
One file per user type. Defines who they are, what they see, what they must do, what they must never do, and what success looks like.

| File | Role |
|---|---|
| [product/roles/visitor.md](product/roles/visitor.md) | Member of public requesting a pass |
| [product/roles/approving-officer.md](product/roles/approving-officer.md) | Internal staff who approve/reject requests |
| [product/roles/gate-security.md](product/roles/gate-security.md) | Frontline guards who verify passes at entry |
| [product/roles/facility-admin.md](product/roles/facility-admin.md) | System admin: config, users, audit, compliance |

**Read before:** building any screen, component, or flow for a specific role.

---

### Product — Jobs to Be Done
One file per role. Five JTBD statements each, in strict format: "When [situation], I want to [motivation], so I can [expected outcome]."

| File | Role |
|---|---|
| [product/jobs/visitor-jobs.md](product/jobs/visitor-jobs.md) | Visitor JTBD |
| [product/jobs/approving-officer-jobs.md](product/jobs/approving-officer-jobs.md) | Approving Officer JTBD |
| [product/jobs/gate-security-jobs.md](product/jobs/gate-security-jobs.md) | Gate Security JTBD |
| [product/jobs/facility-admin-jobs.md](product/jobs/facility-admin-jobs.md) | Facility Admin JTBD |

**Read before:** shaping a new feature, writing UX copy, or deciding what a screen's primary action should be.

---

### Product — Workflows
One file per key flow. Defines actors, step-by-step sequence, all screen states, and edge cases.

| File | Flow |
|---|---|
| [product/workflows/request-and-approval.md](product/workflows/request-and-approval.md) | Visitor submits → Officer reviews → Pass generated |
| [product/workflows/gate-verification.md](product/workflows/gate-verification.md) | Visitor presents QR → Guard verifies → Entry logged |
| [product/workflows/manual-fallback.md](product/workflows/manual-fallback.md) | System offline or QR failure → Paper fallback procedure |
| [product/workflows/onboarding.md](product/workflows/onboarding.md) | First-run flows: visitor welcome, officer scope confirm, guard gate setup |

**Read before:** building any multi-step flow, implementing pass status logic, or handling edge cases at the gate.

---

### Knowledge — Domain Rules
Foundational constraints that govern the entire system. Non-negotiable. Cannot be overridden by configuration or user roles.

| File | Contents |
|---|---|
| [knowledge/domain/entry-permit-rules.md](knowledge/domain/entry-permit-rules.md) | Single-visit time-boxed pass · OTP (demo: 123456) · Simulated ID verification · Privacy/DPDP rules |

**Read before:** writing any logic that touches pass status, QR codes, OTP verification, identity data, storage, or retention.

---

### Knowledge — Tech Conventions
Agreed conventions for every line of code in this project.

| File | Contents |
|---|---|
| [knowledge/tech/conventions.md](knowledge/tech/conventions.md) | Next.js App Router · TypeScript · Custom CSS only · DESIGN.md tokens · Mobile-first breakpoints · File structure · Component rules |

**Read before:** writing any component, page, stylesheet, or utility function.

---

## Three Hard Constraints

Every agent must know these before doing anything:

1. **No real biometric or citizen data, ever.** No facial recognition, no fingerprint, no full Aadhaar numbers, no UIDAI API calls. The system stores only: name, partial ID (last 4 digits), purpose, host, and a government ID photo for visual human verification only. Violating this is a DPDP Act 2023 compliance breach.

2. **OTP in demo mode is 123456.** Do not change this value. Do not remove the demo-mode notice from the UI. Do not call a real SMS API in demo mode.

3. **Styling comes from DESIGN.md tokens only.** No Tailwind, no hardcoded colours or sizes, no inline styles. Every visual value is a CSS custom property defined in DESIGN.md and imported via `app/globals.css`.

---

## Recommended Reading Order for Agents

For a new task, load in this order:

1. This file (`al/INDEX.md`) — orientation
2. `al/knowledge/tech/conventions.md` — how code is written
3. `al/knowledge/domain/entry-permit-rules.md` — what the system must never do
4. The role file for the user type being built
5. The workflow file for the flow being built
6. `PRODUCT.md` (project root) — strategic context and design principles
7. `DESIGN.md` (project root) — visual tokens and component patterns
