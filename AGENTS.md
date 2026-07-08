<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Agent Instructions — Gate Pass Authentication System

## Gates

Every screen build or change — new or existing — must pass through these gates **in order**. Do not move to the next gate until the user has explicitly approved the current one.

**Gates are never optional and never skippable — not for small changes, not for "obvious" screens, not under time pressure.** If you are uncertain whether the required context or a component already exists, that uncertainty is itself the signal to run Gate 1. Do not assume. Do not infer from memory. Read the files. If anything is missing, propose it in the chat and build only after the user approves.

### Gate 1 — Context setup

Read the following files before doing anything else:

- `al/INDEX.md`
- `PRODUCT.md` — product vision: who this is for, why it exists, design principles
- `DESIGN.md` — design vision: color tokens, typography, spacing, component patterns
- `al/product/roles/<role>.md` — who the user of this screen is
- `al/product/jobs/<role>-jobs.md` — what they are trying to get done
- `al/product/workflows/<flow>.md` — the step sequence, states, and edge cases

If any of these files are missing or do not cover the screen being built: draft the missing content, show it in the chat, and **wait for approval before continuing**.

**STOP. Show the user which files were read and confirm context is complete. Wait for approval.**

---

### Gate 2 — Design system

Review what the screen needs: colors, spacing tokens, type sizes, and components.

If anything required is **not already defined in `DESIGN.md`**: do not invent it inline. Propose the exact addition to `DESIGN.md` — show the diff in the chat — and **wait for approval**. Only after the token or component is approved and added to `DESIGN.md` may it be used in code.

**STOP. Show the user any proposed DESIGN.md additions (or confirm nothing new is needed). Wait for approval.**

---

### Gate 3 — Screen execution

Build the screen using only `DESIGN.md` tokens and the `al/` context established in Gates 1 and 2. When the implementation is complete, show the result and a summary of what was built.

**STOP. Show the user the finished screen. Wait for review before calling it done.**

---

## Before designing or building any screen

Load these files in order before writing a single line of code or proposing any UI:

1. `PRODUCT.md` — strategic register, users, brand personality, design principles
2. `DESIGN.md` — color tokens, typography scale, spacing, component patterns, motion
3. `al/INDEX.md` — map of all context files; contains the 3 hard constraints

Then load the files specific to the screen being built:

4. `al/product/roles/<role>.md` — who the user is, what they see, what they must never see
5. `al/product/jobs/<role>-jobs.md` — the jobs they are trying to get done on this screen
6. `al/product/workflows/<flow>.md` — the step sequence, screen states, and edge cases

**If any relevant context file is missing from `al/`:** write it first, show it to the user, and wait for explicit approval before proceeding to design or code.

---

## Always

- Use CSS custom properties from `DESIGN.md` for every visual value — color, spacing, type size, duration. Never hardcode a hex, pixel value, or raw OKLCH literal in a component file.
- Default to server components. Add `"use client"` only when `useState`, `useEffect`, browser APIs, or interactive event handlers are required.
- Write TypeScript. Every component prop is explicitly typed with an interface in the same file.
- Handle every screen state defined in the relevant workflow file — including error, empty, loading, and edge-case states. A screen that only handles the happy path is incomplete.
- Keep the visitor QR pass screen legible on a 375 px viewport in bright light. It is the highest-stakes screen in the product.
- Show the gate terminal's VALID / EXPIRED / ALREADY_USED / INVALID_TIME / SCAN_ERROR states in visually unambiguous colors with text labels — color alone is never the only signal.
- Include `aria-label` or visible text on every interactive element. Status badges must carry both color and text.
- Show `focus-visible` outlines using `--color-primary` on all focusable elements.
- For the OTP screen, display the last 4 digits of the phone number the OTP was sent to.
- Mark every `MANUAL_ENTRY` event distinctly in any audit or log view.

## Never

- Store, display, request, or transmit biometric data of any kind — no facial recognition scores, fingerprint data, iris scans, or voice prints.
- Store or display a full government ID number. Only the last 4 digits may appear anywhere in the UI or database.
- Call any external identity or citizen database API (no UIDAI, no DigiLocker data pull, no Aadhaar verification endpoint).
- Change the demo OTP value from `123456` or remove the demo-mode notice from the OTP screen.
- Use Tailwind, inline styles, or hardcoded design values. All styling flows from `DESIGN.md` tokens via `app/globals.css`.
- Implement a "select all and approve" or bulk-approve action for the Approving Officer — every request requires individual review.
- Allow a gate terminal to grant entry on an EXPIRED, ALREADY_USED, or REJECTED pass under any circumstance, including offline or fallback mode.
- Delete or mutate audit log entries. Audit records are append-only and immutable.
- Let a user act outside their role scope — an Approving Officer cannot see other departments' queues; Gate Security cannot access pass request data; visitors cannot see other visitors' records.
- Use `border-left` or `border-right` greater than 1 px as a colored accent. No gradient text. No glassmorphism. No eyebrow labels on every section.

