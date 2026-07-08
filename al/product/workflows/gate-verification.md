# Workflow: Gate Verification

## Actors

| Actor | Role in this flow |
|---|---|
| Visitor | Presents the QR code at the gate |
| Gate Security | Scans the QR, confirms identity, grants or denies entry |
| System | Validates the pass, checks all constraints, logs the event |

---

## Steps

### 1. Guard prepares the terminal
The guard is logged in to their assigned gate terminal. The terminal shows the SCAN\_READY state: a large scan area, the gate name, and the guard's shift start time.

**Terminal state: SCAN\_READY**

---

### 2. Visitor presents QR code
The visitor opens their pass on their phone and holds the QR code up to the terminal camera or scanner.

---

### 3. System validates the pass
On a successful scan, the system checks all of the following in sequence:

1. **QR authenticity** — is this a valid system-issued QR? (signed token check)
2. **Pass status** — is the status APPROVED?
3. **Time window** — is the current time within the valid window?
4. **Single-use check** — has this QR already been used for an entry?

All checks must pass for a VALID result.

---

### 4. Guard sees the result

#### VALID
- Green screen
- Visitor photo (full width, clearly visible)
- Visitor name, purpose, valid time window, approving officer name
- Single prominent "Grant Entry" button

#### EXPIRED
- Red screen
- "Pass Expired" message
- Pass expiry time shown
- No entry action available

#### INVALID\_TIME
- Amber screen
- "Outside valid window" message
- Valid window start and end times shown
- No entry action available; option to call supervisor

#### ALREADY\_USED
- Red screen
- "Already entered" message
- Timestamp and gate name of prior entry shown
- No entry action available; option to escalate

#### SCAN\_ERROR
- Neutral screen (grey)
- "QR unreadable — use manual lookup"
- Search field for lookup by name or partial ID number

---

### 5. Guard confirms identity (VALID only)
The guard compares the visitor's face against the photo displayed on screen. This is a visual human check — no biometric processing occurs.

If the face does not match, the guard denies entry and records the reason using the "Flag discrepancy" action (logs: guard ID, timestamp, "face mismatch").

---

### 6. Guard grants entry
Guard taps "Grant Entry". The system:
- Logs the entry event: visitor ID, pass ID, gate ID, guard ID, timestamp
- Transitions the pass to USED (single-visit enforcement)
- Shows a brief confirmation on screen before returning to SCAN\_READY

No manual register entry required.

---

### 7. Exit logging (if enabled)
If the facility has exit tracking enabled, a second scan or manual tap is required when the visitor leaves. Exit event is logged: same fields as entry plus exit timestamp and duration.

---

## Terminal States

| State | Colour | Visitor details shown | Entry action |
|---|---|---|---|
| SCAN\_READY | White / neutral | None | None |
| VALID | Green | Photo, name, purpose, window, approver | "Grant Entry" button |
| EXPIRED | Red | Name, expiry time | None |
| INVALID\_TIME | Amber | Name, valid window | None; escalate option |
| ALREADY\_USED | Red | Name, prior entry time + gate | None; escalate option |
| SCAN\_ERROR | Grey | None | Manual lookup search field |

---

## Edge Cases

| Scenario | Handling |
|---|---|
| Visitor's phone battery dead | Guard uses manual lookup (SCAN\_ERROR path) — search by name or ID number |
| QR code on cracked / low-brightness screen | Reduce brightness threshold on scanner; if still unreadable, use manual lookup |
| Multiple valid passes for the same visitor on the same day | Manual lookup returns all; guard selects the correct one based on purpose and time window |
| Visitor arrives outside valid window by a few minutes | INVALID\_TIME state; guard cannot override without supervisor authorisation logged in the system |
| System offline at the gate terminal | Terminal switches to manual fallback mode — see `manual-fallback.md` |
| Guard suspects pass is genuine but photo does not match | Guard denies entry, flags discrepancy, and escalates to supervisor; entry is never granted on a face mismatch |
| Same QR code presented twice at the same gate | ALREADY\_USED on second scan; entry denied; system logs the duplicate attempt with guard ID |
| Visitor claims their pass was approved but terminal shows PENDING | Officer may not have reviewed yet; visitor is directed to wait or contact their host; no entry without APPROVED status |
