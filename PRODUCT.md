# Product

## Register

product

## Users

**Visitors / Applicants** — members of the public requesting gate passes before or on arrival. Mobile-first; unfamiliar with the system; need a fast, low-friction self-service flow. High stress at the gate if something goes wrong. On first use they create a lightweight **visitor profile** once (name + phone + government ID, phone-verified by OTP, consent-based and deletable); on return they simply log in with their phone and OTP, and their identity is reused so only the visit-specific details are entered each time. Every pass is still reviewed individually by the host officer.

**Security Staff / Gate Operators** — frontline staff verifying, approving, and issuing passes at the gate terminal. Desktop or tablet; repeat users who need speed; need at-a-glance scan of visitor queues and instant status actions.

## Product Purpose

A digital gate pass authentication platform that replaces paper-based gate registers. Visitors request passes online; security staff verify identity, approve, and issue digitally. The system creates an auditable, time-stamped record of every entry and exit.

## Brand Personality

Authoritative, precise, trustworthy. Closest reference: DigiLocker / Aadhaar — Indian e-governance at its best: institutional confidence, clear hierarchy, civic dignity. Three words: **Secure. Clear. Dignified.**

## Anti-references

- NIC-era government portals: no table-heavy layouts, no garish tricolor decoration, no Times New Roman, no cluttered multi-column forms, no blinking banners or marquee text.
- Candy-colored consumer apps: no playful palettes, bubbly UI, or emoji-heavy design.
- Generic SaaS navy-and-white dashboards: avoid the "Stripe clone" aesthetic that signals startup, not institution.

## Design Principles

1. **Role clarity first.** Each screen unambiguously serves one user type — visitor or staff. No mixed-purpose interfaces that leave users unsure of what to do.
2. **Trust through restraint.** Institutional authority comes from precision, whitespace, and consistent hierarchy — not decoration, gradients, or visual noise.
3. **Speed at the gate.** Staff workflows must complete primary actions (verify, approve, deny) in 1–2 interactions. Gate latency has direct operational cost.
4. **Legibility at a glance.** Visitor queues and pass lists must be scannable under real-world gate conditions: bright sun, busy background, time pressure.
5. **Civic dignity.** This system represents an institution. Every screen should feel like something a government ministry would be proud to show — modern, accessible, and correct.

## Accessibility & Inclusion

- WCAG 2.1 AA minimum; aim for AAA on critical flows (identity verification, status display).
- High-contrast text on all data-dense views — many gate environments have challenging ambient light.
- Reduced-motion support required.
- Forms must be screen-reader accessible with proper ARIA labels.
- Support for Hindi / regional languages as a future consideration — avoid fixed-width text containers that would break on transliteration.
