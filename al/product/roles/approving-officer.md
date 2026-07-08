# Role: Approving Officer

## Who They Are

An Approving Officer is a designated internal staff member authorised to approve or reject visitor pass requests for a specific department or facility zone. They are the primary human checkpoint in the request-and-approval workflow.

Typical profiles:
- Department heads or section officers who receive visitors on behalf of their team
- Administrative assistants delegated approval authority by a senior officer
- Front office staff at facilities with high visitor volume (e.g. public grievance counters)

Approving Officers are **internal users with a persistent account**. They have a defined scope: they can only approve passes for visits addressed to their department or zone. They cannot approve passes for other departments unless explicitly delegated.

**Context at the desk:** Officers process requests between other primary duties. Their queue must be scannable at a glance — they should not need to open each request to triage it. Most approvals are routine; the interface should make routine fast and exceptions obvious.

---

## What They Need to See

| Screen / State | Information Required |
|---|---|
| Pending queue | List of pending requests sorted by requested visit time; visitor name, purpose summary, date/time, time since submission |
| Request detail | Visitor name, phone (partial), purpose description, host/department, requested time window, government ID photo, ID type and number (last 4 digits only) |
| Approval action | Set or confirm valid time window (default: requested window); optional note to visitor |
| Rejection action | Required reason field (dropdown + freetext); this reason is shown to the visitor |
| Approved requests | Log of own approvals with entry/exit status |
| Audit view | Any request they have acted on, with full action history and timestamps |

---

## What They Need to Do

1. **Monitor the pending queue** — review incoming requests for their department in the order they arrive
2. **Evaluate each request** — verify that the stated purpose is legitimate, the time window is appropriate, and the ID photo looks genuine
3. **Approve or reject** — set a valid time window for approved passes; provide a clear reason for rejections
4. **Notify the visitor** — the system handles this automatically on approval or rejection; the officer does not manually message visitors
5. **Delegate when unavailable** — assign a backup officer before going on leave or becoming unavailable, so the queue does not stall
6. **Review their approval history** — respond to audit queries about past approvals with a verifiable trail

---

## What They Must Never Do

- Approve a request without reading the stated purpose and checking the ID photo
- Approve requests outside their authorised department or zone
- Bulk-approve without individual review (no "select all and approve")
- Share their login credentials with anyone else — delegation must be done through the system's delegate feature
- Delete or edit a request record after acting on it
- Approve a request for an already-expired time slot

---

## What Success Looks Like

- All pending requests in the officer's queue are reviewed within the facility's SLA (e.g. 2 hours of submission during working hours)
- Zero approved passes result in unauthorised or inappropriate access
- Officers can process a routine approval in under **60 seconds** after opening a request
- Rejected visitors receive a reason clear enough to act on without needing to call the officer
- The officer's approval history is always accurate and queryable for compliance audits
- No stalled queues during the officer's absence — delegation is in place before any absence
