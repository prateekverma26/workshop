# Tech Conventions

This file defines the agreed conventions for every piece of code written in this project. Agents generating components, pages, or styles must read this file before writing any code.

---

## Framework and Runtime

| Concern | Decision |
|---|---|
| Framework | Next.js 16, App Router only — no Pages Router |
| Language | TypeScript throughout — no `.js` or `.jsx` files in `app/` or `components/` |
| React version | React 19 — use server components by default; add `"use client"` only when interaction or browser APIs are required |
| Package manager | npm |
| Node target | Match the `.nvmrc` or `engines` field in `package.json`; do not assume a specific version |

---

## Styling

**Custom CSS only.** No Tailwind, no CSS Modules (unless pre-existing), no CSS-in-JS, no inline styles.

All visual decisions come from **DESIGN.md**. When writing styles:

1. Define tokens as CSS custom properties on `:root` in a global stylesheet (e.g. `app/globals.css`)
2. Reference tokens by name everywhere — never hardcode a hex, RGB, or raw OKLCH value in a component file
3. Token names must exactly match those in DESIGN.md (e.g. `--color-primary`, `--space-4`, `--text-body`)
4. If a token does not exist in DESIGN.md and you need one, add it to DESIGN.md first, then reference it

**Token categories in DESIGN.md:**
- `--color-*` — palette: bg, surface, ink, muted, primary, accent, success, danger, border
- `--space-*` — spacing scale: 1, 2, 3, 4, 6, 8, 12, 16, 24
- `--text-*` — type scale: display, h1, h2, h3, body-lg, body, sm, xs
- `--duration-*` — motion: fast, base, slow
- `--ease-*` — easing: ease-out

**No class naming convention is enforced** (no BEM, no utility classes). Use descriptive element/attribute selectors and scoped class names where needed. Keep selectors flat — avoid nesting beyond 2 levels.

---

## File Structure

```
my-app/
├── app/                    ← Route screens (Next.js App Router)
│   ├── layout.tsx          ← Root layout: fonts, global CSS import, metadata
│   ├── page.tsx            ← Home / entry point
│   ├── (visitor)/          ← Visitor-facing routes
│   │   ├── request/        ← Pass request form
│   │   ├── status/[id]/    ← Pass status and QR view
│   │   └── ...
│   ├── (officer)/          ← Approving Officer routes
│   │   ├── queue/          ← Pending requests list
│   │   ├── review/[id]/    ← Request detail + approve/reject
│   │   └── ...
│   ├── (gate)/             ← Gate Security terminal routes
│   │   ├── scan/           ← QR scan + verification result
│   │   └── ...
│   └── (admin)/            ← Facility Admin routes
│       ├── users/          ← User management
│       ├── audit/          ← Audit log
│       └── ...
├── components/             ← Shared UI components
│   ├── ui/                 ← Primitives: Button, Input, Badge, etc.
│   ├── layout/             ← Shell: Sidebar, TopNav, PageWrapper
│   └── [feature]/          ← Feature-specific: PassCard, ScanResult, etc.
├── lib/                    ← Utilities, helpers, API clients, types
├── public/                 ← Static assets only
├── al/                     ← Context layer (this folder — not shipped to users)
├── PRODUCT.md
└── DESIGN.md
```

**Route grouping:** Use Next.js route groups `(group)/` to separate role-specific areas without affecting the URL structure. Each role's routes are self-contained within their group.

---

## Mobile-First Breakpoints

All layouts are coded mobile-first. Breakpoints match the DESIGN.md scale:

```css
/* Base styles: mobile (< 640px) */

@media (min-width: 640px)  { /* sm — larger phones, small tablets */ }
@media (min-width: 768px)  { /* md — tablets */ }
@media (min-width: 1024px) { /* lg — laptops, desktop browsers */ }
@media (min-width: 1280px) { /* xl — wide desktop */ }
```

**Priority order for each role's interface:**
- **Visitor flows** — mobile-first and mobile-primary; the QR pass screen must be perfect on a 375px viewport
- **Gate Security terminal** — tablet-primary (landscape, 768–1024px); must be usable with one hand
- **Approving Officer queue** — desktop-primary (1024px+) but must be functional on tablet
- **Facility Admin** — desktop-only is acceptable; not designed for mobile use

---

## Component Conventions

### Naming
- Components are PascalCase: `PassCard.tsx`, `ScanResult.tsx`, `StatusBadge.tsx`
- Files live in `components/` with a subdirectory that matches their scope (`ui/`, `layout/`, or a feature name)
- No barrel `index.ts` files — import directly from the component file path

### Props
- All props are explicitly typed with a TypeScript interface defined in the same file
- Use destructuring in the function signature
- Boolean props use `is` or `has` prefix: `isLoading`, `hasError`
- Event handlers use `on` prefix: `onApprove`, `onScanComplete`

### Server vs Client
- Default to server components (no directive needed)
- Add `"use client"` only when: using `useState`, `useEffect`, browser APIs, or event handlers that cannot be server actions
- Keep client components as leaf nodes — push state down, not up

### Accessibility
- Every interactive element has a visible label or `aria-label`
- Color alone is never the only differentiator — status badges have both color and text
- Focus rings are visible: use `outline: 2px solid var(--color-primary)` on `:focus-visible`
- All images have `alt` text; decorative images use `alt=""`

---

## Hard Rules for Code Agents

1. **Read DESIGN.md before writing any CSS.** Do not invent token names; use only what is defined there.
2. **Read the relevant role file in `al/product/roles/`** before building a screen for that role. The role file defines what must be visible and what must never be shown.
3. **Read the relevant workflow file in `al/product/workflows/`** before building a flow. The workflow file defines screen states, steps, and edge cases — all of which must be handled.
4. **Read `al/knowledge/domain/entry-permit-rules.md`** before writing any logic that touches pass status, QR codes, OTP, ID data, or data storage. The domain rules are non-negotiable constraints.
5. **No full ID numbers in UI or storage.** Only last 4 digits. Always.
6. **OTP demo value is 123456.** Do not hardcode any other value; do not remove the demo notice from the UI.
7. **No biometric APIs, no external identity APIs.** If a feature seems to require one, stop and flag it.
