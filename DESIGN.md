# Design System

## Palette

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `oklch(1.000 0.000 0)` | Page background — pure white |
| `--color-surface` | `oklch(0.976 0.004 192)` | Cards, panels, sidebar — barely-tinted |
| `--color-surface-raised` | `oklch(0.960 0.006 192)` | Elevated surfaces, modals |
| `--color-ink` | `oklch(0.14 0.008 200)` | Body text — near-black, faint cool tint |
| `--color-muted` | `oklch(0.48 0.004 200)` | Secondary text, placeholders, captions |
| `--color-primary` | `oklch(0.45 0.12 192)` | Brand teal — buttons, links, active nav, key UI |
| `--color-primary-hover` | `oklch(0.38 0.12 192)` | Primary hover state |
| `--color-primary-subtle` | `oklch(0.94 0.04 192)` | Teal tint bg — selected rows, active chips |
| `--color-accent` | `oklch(0.65 0.18 52)` | Warm amber — pending badges, warnings, highlights |
| `--color-accent-subtle` | `oklch(0.95 0.06 52)` | Amber tint bg — pending row highlights |
| `--color-success` | `oklch(0.48 0.14 158)` | Approved / granted status |
| `--color-success-subtle` | `oklch(0.94 0.05 158)` | Approved bg tint |
| `--color-danger` | `oklch(0.50 0.18 22)` | Denied / error status |
| `--color-danger-subtle` | `oklch(0.96 0.04 22)` | Denied bg tint |
| `--color-border` | `oklch(0.88 0.006 192)` | Default dividers, input borders |
| `--color-border-strong` | `oklch(0.72 0.01 192)` | Emphasized borders, focus ring base |

**Text on primary/accent fills:** Use white (`oklch(1.000 0.000 0)`) — both are saturated mid-luminance (L 0.42–0.78), per Helmholtz-Kohlrausch convention. Text on accent/success/danger subtle tints: use `--color-ink`.

**Color strategy:** Restrained. Primary teal carries brand identity at ≤10% surface coverage; amber accent is semantic only (pending/warning states). Everything else is neutral.

---

## Typography

**Display / Headings:** [IBM Plex Serif](https://fonts.google.com/specimen/IBM+Plex+Serif) — institutional weight, civic authority without stiffness. Used for page titles, section headings, empty states.

**UI / Body:** [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) — pairs on a contrast axis with the serif. Clean at 12–16px in data-dense views. Government-grade readability.

Both fonts are IBM Plex family — intentional cohesion with contrast axis (serif ↔ sans), not two sans-serifs competing.

### Scale

| Token | Size | Weight | Leading | Usage |
|---|---|---|---|---|
| `--text-display` | `clamp(2rem, 5vw, 4rem)` | 600 | 1.1 | Hero, welcome screen headings |
| `--text-h1` | `clamp(1.5rem, 3vw, 2.5rem)` | 600 | 1.2 | Page titles |
| `--text-h2` | `clamp(1.25rem, 2.5vw, 1.875rem)` | 600 | 1.25 | Section titles |
| `--text-h3` | `1.25rem` | 600 | 1.3 | Card/panel titles |
| `--text-body-lg` | `1.0625rem` | 400 | 1.6 | Prose, instructions |
| `--text-body` | `0.9375rem` | 400 | 1.5 | UI body, form labels |
| `--text-sm` | `0.8125rem` | 400 | 1.4 | Table data, captions |
| `--text-xs` | `0.6875rem` | 500 | 1.3 | Timestamps, metadata, badges |

- `text-wrap: balance` on h1–h3
- `text-wrap: pretty` on paragraphs ≥ 3 lines
- Body line length: cap at 70ch
- Letter spacing on display: `-0.02em`

---

## Spacing Scale

Base unit: `4px` (0.25rem). Scale: 1-2-3-4-6-8-12-16-24-32-48-64-96.

```
--space-1:  0.25rem   4px
--space-2:  0.5rem    8px
--space-3:  0.75rem   12px
--space-4:  1rem      16px
--space-6:  1.5rem    24px
--space-8:  2rem      32px
--space-12: 3rem      48px
--space-16: 4rem      64px
--space-24: 6rem      96px
```

---

## Radius, Elevation & Z-index Tokens

**Radius:**
```
--radius-sm:   4px    /* badges, checkboxes, small chips */
--radius-md:   6px    /* buttons, inputs, selects */
--radius-lg:   10px   /* cards, modals, dropzones */
--radius-full: 999px  /* pills, status badges, avatars-circular */
```

**Elevation:**
```
--shadow-sm: 0 1px 2px oklch(0.14 0.008 200 / 0.06);   /* rows, subtle lift */
--shadow-md: 0 4px 12px oklch(0.14 0.008 200 / 0.10);  /* dropdowns, toasts, popovers */
--shadow-lg: 0 12px 32px oklch(0.14 0.008 200 / 0.14); /* modals, bottom sheets */
```

**Z-index scale** (semantic — never arbitrary values):
```
--z-dropdown:       10
--z-sticky:         20
--z-modal-backdrop: 30
--z-modal:          40
--z-toast:          50
--z-tooltip:        60
```

---

## Layout

- **Content max-width:** 1200px centered (dashboard), 720px (forms and visitor flows)
- **Sidebar width:** 240px collapsed → 64px icon-only
- **Top nav height:** 56px
- **Grid:** CSS Grid for 2D layouts; Flexbox for 1D rows/columns
- **Responsive breakpoints:** sm 640px, md 768px, lg 1024px, xl 1280px
- **Z-index scale:** see Radius, Elevation & Z-index Tokens above

---

## Components

Every component below specifies its **appearance**, its **interaction states** (hover / focus / active / disabled / error / loading, where applicable), and its **responsive** behaviour. All values reference tokens from the Palette, Spacing, Typography, and Motion sections. Never hardcode a raw value in a component file.

**Shared radius scale** (referenced throughout): `--radius-sm: 4px`, `--radius-md: 6px`, `--radius-lg: 10px`, `--radius-full: 999px`. **Shared elevation:** `--shadow-sm: 0 1px 2px oklch(0.14 0.008 200 / 0.06)`, `--shadow-md: 0 4px 12px oklch(0.14 0.008 200 / 0.10)`, `--shadow-lg: 0 12px 32px oklch(0.14 0.008 200 / 0.14)`.

**Universal focus rule:** every interactive element shows `outline: 2px solid var(--color-primary); outline-offset: 2px` on `:focus-visible` — never removed, never replaced by color alone.

**Universal reduced-motion rule:** every state transition below collapses to an instant change or `opacity`-only crossfade under `@media (prefers-reduced-motion: reduce)`.

---

### ui/ — Primitives

#### Button
Variants: `primary`, `secondary`, `danger`, `ghost`.

| State | Primary | Secondary | Danger | Ghost |
|---|---|---|---|---|
| Default | bg `--color-primary`, white text | bg transparent, `1px solid --color-border`, `--color-ink` text | bg `--color-danger`, white text | bg transparent, `--color-primary` text |
| Hover | bg `--color-primary-hover` | bg `--color-surface`, border `--color-border-strong` | bg `oklch(0.42 0.18 22)` | bg `--color-primary-subtle` |
| Active | bg `--color-primary-hover`, `translateY(1px)` | bg `--color-surface-raised` | darken + `translateY(1px)` | bg `--color-primary-subtle` |
| Focus | universal focus ring | universal focus ring | universal focus ring | universal focus ring |
| Disabled | `opacity: 0.45`, `cursor: not-allowed`, no hover | same | same | same |
| Loading | inline `Spinner` replaces label, width preserved, `aria-busy="true"` | same | same | same |

- Shape: `--radius-md`, padding `--space-3 --space-6` (default), transition `background var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out)`.
- Sizes: `sm` (padding `--space-2 --space-4`, `--text-sm`), `md` (default), `lg` (padding `--space-4 --space-8`, `--text-body-lg`).
- **Responsive:** min touch target `44×44px` on coarse pointers (`@media (pointer: coarse)`); full-width (`width: 100%`) below `sm` when used as a form's primary action.

#### Input / Text Field
- Default: bg `--color-bg`, `1px solid --color-border`, `--radius-md`, padding `--space-3`, `--text-body`. Label above in `--text-sm --color-muted`; hint below in `--text-xs --color-muted`.
- Hover: border `--color-border-strong`.
- Focus: border `--color-primary` + universal focus ring.
- Error: border `--color-danger`, bg `--color-danger-subtle`, message below in `--text-xs` at `--color-danger`, `aria-invalid="true"`.
- Disabled: bg `--color-surface`, `--color-muted` text, `cursor: not-allowed`.
- Placeholder: `--color-muted` at ≥4.5:1 — never the only label.
- **Responsive:** `width: 100%` of its field container at every breakpoint; `font-size: 16px` minimum on mobile to prevent iOS zoom.

#### Textarea
- Inherits Input styling. `min-height: calc(var(--space-16) + var(--space-4))`, `resize: vertical`.
- Live character counter bottom-right in `--text-xs --color-muted`; turns `--color-danger` when over limit (purpose: 10–200 chars).
- **Responsive:** full-width; counter stays inside padding on mobile.

#### Select
- Matches Input dimensions; trailing chevron icon (`--color-muted`, 16px).
- Hover/focus/error/disabled: identical to Input.
- Open menu: rendered via native `<dialog>`, popover API, or `position: fixed` portal — never `position: absolute` inside an overflow container. Menu bg `--color-bg`, `--shadow-md`, `--radius-md`, z-index `dropdown`.
- Option hover: bg `--color-surface`; selected option: bg `--color-primary-subtle`, checkmark icon.
- **Responsive:** below `sm`, menu expands to full viewport width anchored to the field.

#### DatePicker
- Trigger styled as Input with a calendar icon.
- Past dates: `--color-muted`, `pointer-events: none` (future-only enforced).
- Selected day: bg `--color-primary`, white text; today: ring in `--color-primary`; hover day: bg `--color-primary-subtle`.
- **Responsive:** popover calendar below `md`; inline full-width month grid on mobile.

#### TimeRangePicker
- Two stacked or inline time fields (start → end) sharing Input styling, joined by an arrow glyph.
- Invalid range (end ≤ start): both borders `--color-danger` + message.
- **Responsive:** side-by-side ≥ `sm`, stacked below `sm`.

#### OtpInput
- Six segmented boxes, each `--space-12` wide, `1px solid --color-border`, `--radius-md`, `--text-h3` centered.
- Filled box: border `--color-border-strong`. Active box: border `--color-primary` + focus ring. Auto-advances on entry, backspace moves left.
- Error (wrong OTP): all boxes border `--color-danger`, brief shake (transform, reduced-motion → static), attempt count shown below in `--text-xs --color-danger`.
- Success: boxes border `--color-success`.
- **Responsive:** box size shrinks to `--space-8` with `--space-2` gaps below `sm` so all six fit on a 375px viewport without wrapping.

#### FileUpload (ID photo)
- Default: dashed `2px --color-border` dropzone, `--radius-lg`, upload icon + "JPEG/PNG, max 5MB" hint in `--text-sm --color-muted`.
- Hover / drag-over: border `--color-primary`, bg `--color-primary-subtle`.
- After selection: replaces dropzone with image `Avatar` preview + filename + remove button; shows **"Photo received"** (never "verified").
- Error (wrong type/size): border `--color-danger`, bg `--color-danger-subtle`, message.
- **Responsive:** dropzone height `--space-24` on desktop, `--space-16` on mobile; camera-capture affordance surfaced first on coarse pointers.

#### StatusBadge
Semantic only — color **and** text label always paired. States:

| Status | Bg | Text | Dot |
|---|---|---|---|
| PENDING | `--color-accent-subtle` | `oklch(0.35 0.12 52)` | `--color-accent` |
| APPROVED | `--color-success-subtle` | `oklch(0.30 0.10 158)` | `--color-success` |
| REJECTED | `--color-danger-subtle` | `oklch(0.32 0.14 22)` | `--color-danger` |
| EXPIRED | `--color-surface-raised` | `--color-muted` | `--color-muted` |
| USED | `--color-surface-raised` | `--color-ink` | `--color-border-strong` |
| MANUAL_ENTRY | `--color-accent-subtle` | `oklch(0.35 0.12 52)`, prefixed with a flag icon | `--color-accent` |

- Shape: `--radius-full`, padding `--space-1 --space-3`, `--text-xs` 500, leading status dot (6px). Non-interactive (no hover).
- **Responsive:** icon-only collapse is **forbidden** — the text label must survive at every width; wrap the row instead.

#### Checkbox (consent)
- Default: `18px` box, `1px solid --color-border-strong`, `--radius-sm`.
- Hover: border `--color-primary`. Checked: bg `--color-primary`, white check icon. Focus: ring. Disabled: `opacity: 0.45`.
- Error (required consent unticked on submit): border `--color-danger` + message.
- **Responsive:** `44px` touch target via padding on coarse pointers; label wraps beside box, never truncates.

#### Modal
- Native `<dialog>`; backdrop `oklch(0.14 0.008 200 / 0.45)` at z-index `modal-backdrop`; panel bg `--color-bg`, `--radius-lg`, `--shadow-lg`, z-index `modal`, `max-width: 480px`.
- Enter: `translateY(8px)→0` + `opacity 0→1` at `--duration-slow var(--ease-out)`. Exit: reverse. Reduced-motion: opacity only.
- Focus trapped; `Esc` and backdrop-click close (destructive variants require explicit button).
- **Responsive:** below `sm`, panel becomes a bottom sheet — full width, `--radius-lg` top corners only, slides up from bottom.

#### Toast
- bg `--color-surface-raised`, `--radius-md`, `--shadow-md`, leading status icon, z-index `toast`. Variants: success / error / info tint the icon (`--color-success` / `--color-danger` / `--color-primary`).
- Enter: `translateX(100%)→0` at `250ms var(--ease-out)`; auto-dismiss after 5s with a hover-to-pause progress rule. Reduced-motion: fade.
- **Responsive:** top-right stack on desktop; below `sm`, slides down from top edge, full width minus `--space-4` gutters.

#### Spinner
- Circular, `currentColor`, 1.5px stroke, sizes 16/20/24px. Continuous rotation. Reduced-motion: replaced by a static "Loading…" text or pulsing opacity.

#### EmptyState
- Centered: Lucide icon (32px `--color-muted`), heading in `--text-h3` (IBM Plex Serif), one line of `--text-body --color-muted`, optional primary Button.
- Used for: empty queue, no search results, no history. **Responsive:** vertical padding `--space-24` desktop → `--space-12` mobile.

#### ErrorState
- Same layout as EmptyState with a danger-tinted icon; includes a retry Button. Used for failed fetch, system error, offline. **Responsive:** identical scaling.

#### Avatar (ID photo)
- Rounded-rect (`--radius-md`) image with `1px solid --color-border`; sizes: `sm` 32px, `md` 48px, `lg` 96px, `xl` full-width (gate terminal). Mandatory `alt`. Fallback: initials on `--color-surface-raised`.
- **Responsive:** on the gate `ValidResult`, renders `xl` at up to `min(72vw, 420px)` so the guard sees the face at arm's length.

#### CountdownTimer
- Inline `--text-sm --color-muted`: "Resend in 45s" → live countdown → active "Resend" link (`--color-primary`) at zero.
- Must **pause/rebase on tab-hidden** (visibility API) so it never shows a stale value — no gating of content behind it.

#### PartialId
- Renders masked ID: `×××× ×××× 4821` in `--text-sm`, tabular numerals. **Never** renders or accepts a full number. Non-interactive.

#### TimeWindow
- Compact `valid_from → valid_until` in `--text-sm`, tabular numerals, arrow glyph between. On gate terminal renders at `--text-h3`. Expired window: struck-through in `--color-muted`.
- **Responsive:** wraps to two lines (from / to) below `sm`.

#### DemoNotice
- Persistent inline banner on the OTP screen: bg `--color-accent-subtle`, `--color` `oklch(0.35 0.12 52)`, `--radius-md`, padding `--space-2 --space-3`, `--text-xs`, info icon. Text: "Demo mode — OTP is 123456". **Never removed.**

---

### layout/ — Shell

#### PageWrapper
- Centered container: `max-width: 720px` (forms / visitor), `1200px` (dashboards); horizontal padding `--space-6` desktop, `--space-4` mobile. **Responsive:** fluid width between breakpoints, never edge-to-edge text.

#### TopNav
- Height `56px`, bg `--color-bg`, bottom `1px solid --color-border`, z-index `sticky`. Left: facility name (`--text-body` 600). Right: role label chip, user name, sign-out Button (ghost).
- **Responsive:** below `md`, collapses secondary items into a menu button; facility name truncates with ellipsis before wrapping.

#### Sidebar
- Width `240px` → `64px` icon-only collapse; bg `--color-surface`, right `1px solid --color-border`. Nav item hover: bg `--color-primary-subtle`; active: bg `--color-primary-subtle`, `--color-primary` text + 2px left indicator (indicator only — not a decorative side-stripe on content). Collapse transition: `width 200ms var(--ease-out)`.
- **Responsive:** below `lg`, becomes an off-canvas drawer over a `modal-backdrop`; hidden by default, opened via TopNav menu button.

#### MobileHeader
- Compact `56px` bar for visitor flows: back affordance, screen title (`--text-body` 600, centered), optional action. No sidebar. Only rendered below `md`.

#### RoleShell
- Composition wrapper: picks TopNav+Sidebar (officer, desktop) or MobileHeader+PageWrapper (visitor, mobile) based on role and viewport. Owns the authenticated layout grid.
- **Responsive:** grid `[sidebar] [content]` ≥ `lg` → single column with drawer below.

---

### visitor/ — Visitor flows (mobile-primary)

Every component here is designed 375px-first and must stay legible in bright light (high-contrast text, no light-gray body).

#### RequestForm
- Vertical stack of `ui/` fields: name (Input), phone (Input), purpose (Textarea), host department (Select), date (DatePicker), time window (TimeRangePicker), ID type (Select), ID number (Input), ID photo (FileUpload), consent (Checkbox), submit (Button, full-width).
- States: per-field validation on blur; form-level error summary above submit; submit shows loading; success routes to OTP.
- **Responsive:** single column ≤ `sm`; two-column pairing (name/phone, date/time) ≥ `md`.

#### OtpVerification
- DemoNotice (top) + "OTP sent to ×××××× 4821" line + OtpInput + attempt count + CountdownTimer/resend.
- States: idle, verifying (loading), error (wrong OTP → OtpInput error), locked-out (after 3 fails → ErrorState with "contact support"), success.
- **Responsive:** centered column, `max-width: 360px`; all six OTP boxes fit 375px.

#### PassStatusBanner
- Full-width status block driven by StatusBadge state (PENDING / APPROVED / REJECTED / EXPIRED) with contextual message + primary next-action Button.
- PENDING: accent-subtle bg, "within 2 working hours". APPROVED: success-subtle. REJECTED/EXPIRED: danger/neutral.
- **Responsive:** stacks message over action below `sm`.

#### PassCard — highest-stakes screen
- Large high-contrast QR (min `240px`, scales to `min(80vw, 320px)`), quiet-zone padding on `--color-bg`. Below: visitor name (`--text-h2`), TimeWindow (`--text-h3`), facility + gate, approving officer, reference number (PartialId style tabular).
- States: APPROVED (full render), EXPIRED (QR dimmed + PassExpiredNotice overlay), USED (QR replaced by "Entry recorded" confirmation).
- **Responsive:** QR never smaller than `240px`; card is `max-width: 420px` centered; forces `prefers-color-scheme` override off for the QR area (always light) so scanners read it.

#### RejectionDetail
- danger-subtle panel: reason heading (plain language) + specific next steps as an action list (re-apply Button, contact host, contact support). **Responsive:** full-width, buttons stack below `sm`.

#### PassExpiredNotice
- neutral panel: expiry time, "This pass has expired", primary "Request new slot" Button. **Responsive:** as above.

---

### gate/ — Gate Security terminal (tablet-primary, 768–1024px landscape)

Each result is a **full-screen** state. Instant color recognition is a hard requirement — color is backed by a large text label and icon every time.

#### ScanReadyScreen
- Large centered scan area (camera viewport or QR field), gate name (`--text-h2`), guard shift-start time. bg `--color-bg`. **Responsive:** scan area `min(60vh, 480px)`.

#### ValidResult — **green**
- Full-bleed bg `--color-success-subtle`, top band `--color-success`. `xl` Avatar (face at arm's length), visitor name (`--text-display` clamped), purpose, TimeWindow (`--text-h3`), approving officer. Single oversized `GrantEntryButton`.
- **Responsive:** photo left / details right ≥ `md`; stacked with photo on top below `md`.

#### ExpiredResult / AlreadyUsedResult — **red**
- Full-bleed bg `--color-danger-subtle`, top band `--color-danger`, large ✕ icon + "PASS EXPIRED" / "ALREADY ENTERED" (`--text-display`). Expired: expiry time. AlreadyUsed: prior entry timestamp + gate. **No entry action.** Escalate link (ghost).

#### InvalidTimeResult — **amber**
- Full-bleed bg `--color-accent-subtle`, top band `--color-accent`, clock icon + "OUTSIDE VALID WINDOW", TimeWindow shown large. No entry action; "Call supervisor" escalate link.

#### ScanErrorResult — **grey/neutral**
- bg `--color-surface`, "QR UNREADABLE — USE MANUAL LOOKUP", embedded ManualLookup search field.

#### ManualLookup
- Large Input (search by name or partial ID) + results list; each result opens the same detail layout as ValidResult. **Responsive:** results grid ≥ `md`, list below.

#### GrantEntryButton
- Oversized primary Button (`lg`+, min height `--space-16`), full-width within the valid panel. One tap → loading → success confirmation → returns to ScanReady. Only rendered inside ValidResult.

#### FlagDiscrepancyAction
- Secondary/danger Button within ValidResult for face-mismatch: opens a confirm Modal, logs and denies. Reduced prominence vs Grant Entry.

#### ShiftSummary
- Panel: entry/exit counts, exception list (StatusBadge MANUAL_ENTRY / overrides / failed scans). **Responsive:** stat row wraps; list scrolls.

#### FallbackModeBanner
- Persistent full-width amber bar (bg `--color-accent-subtle`, `--color-accent` text) pinned above the terminal when in manual fallback mode; never auto-dismisses.

---

### officer/ — Approving Officer (desktop-primary, functional on tablet)

#### RequestQueue / RequestQueueRow (Data Table)
- Table: bg `--color-bg`; header bg `--color-surface`, `--text-xs` 600 `--color-muted`; row separators `1px solid oklch(0.93 0.003 192)`; **no zebra striping**.
- Row hover: bg `--color-surface`. Selected/open row: bg `--color-primary-subtle`. SLA-breached row: leading `--color-danger` dot + StatusBadge (never a colored side-stripe).
- Columns: visitor name, purpose summary (truncates with tooltip), date/time, time-since-submission, StatusBadge. **No bulk-select column** — individual review only.
- **Responsive:** ≥ `lg` full table; `md` collapses low-priority columns; below `md` each row becomes a stacked card (name + purpose + time + badge) — still one-tap to open, no bulk actions.

#### RequestDetail
- Two-region layout: left = `lg` Avatar (ID photo) + PartialId + ID type; right = visitor name, partial phone, purpose (full), host department, requested TimeWindow. Followed by ApprovalPanel / RejectionPanel tabs.
- **Responsive:** side-by-side ≥ `md`; photo stacks above details below `md`.

#### ApprovalPanel
- TimeRangePicker prefilled to the requested window (adjustable), optional note Textarea, "Approve" primary Button.
- States: default, validating (window not in past), submitting (loading), success. **Responsive:** full-width controls below `sm`.

#### RejectionPanel
- Reason Select (Purpose unclear / Outside working hours / Host unavailable / Other) + freetext Textarea (**required min 20 chars when "Other"**, enforced with counter), "Reject" danger Button.
- **Responsive:** as ApprovalPanel.

#### DelegationControl
- Current delegate display + assign/remove (Select of eligible officers + confirm). Empty: "No delegate assigned" EmptyState inline. **Responsive:** stacks below `sm`.

#### ApprovalHistoryList (Data Table)
- Same table rules as RequestQueue: visitor name, decision (StatusBadge), timestamp, entry/exit status. Read-only. **Responsive:** card-collapse below `md`.

---

### onboarding/ — First-run flows

Serves `al/product/workflows/onboarding.md`. Orientation surfaces: quiet, instructional, no data entry beyond what the operational flows already own.

#### OnboardingStepper
- Ordered list of labelled steps. Completed: `--color-primary` dot with white check; current: `--color-primary` ring + label in `--color-ink` 500, `aria-current="step"`; upcoming: `--color-border-strong` dot, `--color-muted` label. Connectors: 1px `--color-border` (completed segments `--color-primary`).
- Non-interactive (progress display, not navigation). Transition on state change: `background/border-color var(--duration-base) var(--ease-out)`.
- **Responsive:** horizontal row; below `sm` only the current step's label renders, others are dots with `visually-hidden` labels.

#### RequirementList
- "What you'll need" checklist: each row = leading Lucide icon (20px, `--color-primary`) in a `--color-primary-subtle` `--radius-md` tile + title (`--text-body` 500) + one-line detail (`--text-sm --color-muted`). Rows separated by `--space-4` gaps, no borders — a list, not a card grid. Non-interactive.
- **Responsive:** single column at every width; rows wrap text, never truncate.

#### PrivacyPromise
- Panel on `--color-surface`, `--radius-lg`, padding `--space-6`. Header row: `ShieldCheck` icon (20px `--color-success`) + title (`--text-h3` serif). Body: promise items as a plain list, `--text-body`, each with a leading `Check` (14px `--color-success`).
- Reads as institutional commitment, not marketing. Non-interactive.
- **Responsive:** full width of the narrow (720px) content column.

#### TerminalLegend
- The five verification states as a legend grid. Each entry: colour swatch band (bg `--color-success` / `--color-danger` / `--color-accent` / `--color-border-strong` matching the gate result screens) with white state icon + state name in `--text-sm` 600 caps, then one-line meaning (`--text-sm --color-ink`) and available action (`--text-xs --color-muted`) on `--color-bg` below.
- Colour is never alone: every entry pairs swatch + icon + text, mirroring the real terminal screens 1:1 (same tokens as `gate/` results).
- **Responsive:** `repeat(auto-fit, minmax(200px, 1fr))` grid — 1 column on phones, 2–3 on the tablet terminal.

---

## Motion

**Energy level:** Controlled. Functional transitions only. No decorative animation.

```css
/* Tokens */
--duration-fast:   100ms;
--duration-base:   180ms;
--duration-slow:   300ms;
--ease-out:        cubic-bezier(0.16, 1, 0.3, 1);  /* ease-out-expo */
```

**Usage:**
- Button hover / focus: `background 100ms var(--ease-out)`
- Status badge change: `opacity 180ms var(--ease-out)` (no layout animation)
- Modal enter: `transform: translateY(8px) → 0, opacity 0 → 1` at `300ms var(--ease-out)`
- Sidebar collapse: `width 200ms var(--ease-out)`
- Toast enter: `transform: translateX(100%) → 0` at `250ms var(--ease-out)`

**Reduced motion:** Every animated element must have a `@media (prefers-reduced-motion: reduce)` rule — either `transition: none` or `opacity` crossfade only.

---

## Iconography

- Library: **[`lucide-react`](https://lucide.dev/)** — installed as a project dependency (`lucide-react ^1.23.0`). Import icons individually for tree-shaking: `import { QrCode, Check } from "lucide-react"`.
- Size: 16px inline, 20px standalone, 24px nav/hero. Pass via the `size` prop.
- Stroke: `currentColor` (Lucide's default) — inherits text color, no hardcoded fills. Stroke width `1.5` for hero/standalone, default `2` inline.
- Accessibility: decorative icons get `aria-hidden="true"`; standalone meaningful icons get an `aria-label`. Never use an icon without a visible or labelled text equivalent in form fields or primary actions.
- Icon roles in this system: `QrCode` (scan/pass), `Check`/`CheckCircle2` (approved), `XCircle` (rejected/denied), `Clock` (pending/time window), `AlertTriangle` (invalid-time/warning), `Flag` (manual-entry/discrepancy), `Upload`/`Camera` (ID photo), `ChevronDown` (select), `Search` (lookup), `ShieldCheck` (verified/security).

---

## Dark Mode

Planned as a future enhancement. Current scope: light mode only. All tokens are defined for light mode. When dark mode is added, redefine the palette under `@media (prefers-color-scheme: dark)`:
- bg → `oklch(0.10 0.006 200)`
- surface → `oklch(0.14 0.008 200)`
- ink → `oklch(0.95 0.004 192)`
- primary → `oklch(0.60 0.12 192)` (brightened for dark bg)
