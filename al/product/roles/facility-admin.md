# Role: Facility Admin

## Who They Are

The Facility Admin is the system administrator for a given facility or set of facilities. They configure the platform, manage user accounts, define access rules, and are the primary point of accountability for compliance and audit.

Typical profiles:
- IT officers responsible for the gate pass system at a government building or campus
- Security managers overseeing gate operations across multiple entry points
- Compliance officers who need verifiable audit trails for inspections or RTI queries

Facility Admins are **privileged internal users** with full read access to all records within their facility scope. They can configure the system and manage user roles but **cannot override approval decisions** retroactively and **cannot access real biometric data** (because none is stored).

**Context at the desk:** Admins work primarily on desktop. Their tasks are less frequent but higher-stakes than other roles — configuration errors affect all users, and audit gaps have compliance consequences. The interface should make dangerous actions (bulk delete, role removal) require deliberate confirmation and create audit events of their own.

---

## What They Need to See

| Screen / State | Information Required |
|---|---|
| System overview | Total passes today (pending / approved / denied / expired); active gates; any system alerts or outage flags |
| User management | List of all Approving Officers and Gate Security accounts for their facility; role, department scope, last active, active/inactive status |
| Pass rules config | Current rules: valid window defaults, advance booking window, ID types accepted, single-visit enforcement toggle |
| Audit log | Filterable log of all system events: pass requests, approvals, rejections, gate entries, manual fallbacks, role changes; exportable as CSV |
| Incident flags | Entries flagged as MANUAL\_ENTRY, override attempts, repeated failed scans |
| Data retention | Current retention policy (default 30 days); schedule of upcoming auto-deletions |

---

## What They Need to Do

1. **Manage user accounts** — create, deactivate, and update role assignments for Approving Officers and Gate Security staff; set department scopes
2. **Configure pass rules** — set the valid window defaults, advance booking window, acceptable ID types, and facility-specific policies
3. **Monitor system health** — check for gate outages, fallback events, or unusual patterns (e.g. spike in ALREADY\_USED denials)
4. **Export audit logs** — pull filtered logs for compliance reviews, RTI responses, or internal investigations; logs are immutable
5. **Manage data retention** — review and adjust retention policy; confirm scheduled data deletions are correct before they execute
6. **Respond to incidents** — investigate flagged incidents, escalate to national IT support if needed, and record their resolution in the system

---

## What They Must Never Do

- Delete or edit audit log entries — logs are append-only and immutable
- Store, request, or attempt to extract real biometric data (fingerprints, facial recognition scores, iris data) — the system does not support this and any workaround is a DPDP compliance violation
- Grant a user role beyond the principle of least privilege — an Approving Officer should not have Admin rights unless formally designated
- Bypass the approval workflow for specific visitors (no "VIP override" that skips officer review)
- Share Admin credentials — each Admin has their own account; shared credentials invalidate the audit trail
- Delete a user account without first verifying they have no pending approvals in their queue

---

## What Success Looks Like

- Any compliance audit can be satisfied by exporting a log — no manual record retrieval required
- User onboarding (adding a new officer or guard) takes under **5 minutes**
- System configuration changes take effect immediately with no redeployment
- All MANUAL\_ENTRY and override events are reviewed within 24 hours
- Data retention runs automatically with no manual intervention; Admin gets a notification before any deletion run executes
- The facility has zero compliance incidents related to data privacy, audit gaps, or unauthorised configuration changes
