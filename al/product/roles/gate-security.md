# Role: Gate Security

## Who They Are

Gate Security personnel are the frontline staff stationed at physical entry points who verify visitor passes and control access. They are the last human checkpoint before a visitor enters the facility.

Typical profiles:
- Security guards deployed at the main entrance, reception barriers, or zonal checkpoints
- Duty officers supervising multiple gates during high-volume periods
- Temporary or contract security staff who may rotate between facilities

Gate Security are **internal users with a persistent account** scoped to one or more gates. Their interface is purpose-built for speed and clarity — they make quick decisions under pressure, often while managing a physical queue.

**Context at the gate:** The guard's terminal may be a tablet or touch screen at a standing workstation. Lighting conditions vary (bright outdoor sun, dimly lit reception). The interface must work with gloves on, at arm's length, and with a visitor standing across a counter. Every state must be instantly distinguishable — a green screen from a red screen in under a second.

---

## What They Need to See

| Screen / State | Information Required |
|---|---|
| Scan ready | Large scan area / QR input field; shift start time; gate name |
| Pass valid (VALID) | Visitor name and photo (large), purpose, valid time window, approving officer name; single prominent "Grant Entry" button |
| Expired pass (EXPIRED) | Clear red state: "Pass Expired" + expiry time; no entry action available |
| Wrong time (INVALID\_TIME) | Amber state: "Outside valid window" + window start/end; option to note and escalate |
| Already used (ALREADY\_USED) | Red state: "Already entered" + timestamp of prior entry; no entry action |
| Scan failure (SCAN\_ERROR) | "QR unreadable — use manual lookup" with lookup-by-ID-number option |
| Manual lookup | Search by visitor name or partial ID number; results show same detail view as a valid scan |
| Shift summary | Entries and exits processed this shift; any flags or exceptions |

---

## What They Need to Do

1. **Scan the visitor's QR code** — use the terminal to read the pass; the system immediately displays the verification result
2. **Visually confirm identity** — compare the visitor's face against the ID photo shown on screen
3. **Grant or deny entry** — tap "Grant Entry" for a valid pass; explain the denial reason (from the screen) for invalid passes
4. **Handle exceptions** — use manual lookup or the fallback procedure when the system or QR cannot be read
5. **Log entry and exit** — grant-entry action auto-logs; exit logging (if enabled at the facility) requires a second scan or manual tap on exit
6. **Escalate incidents** — alert the Duty Officer or Facility Admin for any attempted unauthorised entry, suspicious documents, or system outages exceeding the fallback threshold

---

## What They Must Never Do

- Allow a visitor to enter without a confirmed-valid pass — no verbal approval overrides a system denial without supervisor escalation
- Override a ALREADY\_USED or EXPIRED state without supervisor authorisation recorded in the system
- Process a manual fallback without completing the paper register entry
- Share their terminal login with another guard — each guard logs in individually for audit trail integrity
- Leave the gate terminal unattended and unlocked
- Attempt to look up visitor data beyond what is needed to verify the specific pass in front of them

---

## What Success Looks Like

- Each QR verification takes under **30 seconds** from scan to entry decision
- Zero unauthorised entries during the guard's shift
- Every entry and exit is logged with the guard's ID and timestamp — no manual register gaps
- Exception situations (scan failure, override, manual fallback) are all recorded with a reason
- The guard never needs to guess what to do — every terminal state tells them exactly what action is available
- Shift handover is accurate: the incoming guard can see exactly what happened in the previous shift
