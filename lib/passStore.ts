/**
 * Client-side pass store for the visitor demo.
 *
 * There is no backend yet, so created passes live in sessionStorage and a
 * handful of seeded passes cover the terminal states for review. Per
 * al/knowledge/domain/entry-permit-rules.md the store only ever holds the
 * last 4 digits of any ID — never a full number.
 */

export type VisitorPassStatus = "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED";

export interface VisitorPass {
  id: string;
  referenceNumber: string;
  visitorName: string;
  phoneLast4: string;
  purpose: string;
  hostDepartment: string;
  facility: string;
  gate: string;
  validFrom: string;
  validTo: string;
  idType: string;
  idLast4: string;
  status: VisitorPassStatus;
  approverName?: string;
  rejectionReason?: string;
  /** Opaque signed token the QR encodes. Carries no visitor data. */
  qrToken: string;
}

const STORAGE_KEY = "gatepass.visitor.passes";

/** Stable-identity cache so useSyncExternalStore snapshots don't churn. */
const cache = new Map<string, VisitorPass>();

const SEEDED: Record<string, VisitorPass> = {
  "demo-approved": {
    id: "demo-approved",
    referenceNumber: "GP-2026-0142",
    visitorName: "Anita Rao",
    phoneLast4: "3210",
    purpose: "Meeting with the grievance officer regarding application 4821.",
    hostDepartment: "Public Grievances",
    facility: "Shastri Bhawan",
    gate: "Gate 1 — Main Entrance",
    validFrom: "08 Jul 2026, 09:30",
    validTo: "08 Jul 2026, 11:00",
    idType: "Aadhaar",
    idLast4: "4821",
    status: "APPROVED",
    approverName: "R. Sharma",
    qrToken: "GP1|demo-approved|GP-2026-0142",
  },
  "demo-rejected": {
    id: "demo-rejected",
    referenceNumber: "GP-2026-0143",
    visitorName: "Anita Rao",
    phoneLast4: "3210",
    purpose: "Visit.",
    hostDepartment: "Public Grievances",
    facility: "Shastri Bhawan",
    gate: "Gate 1 — Main Entrance",
    validFrom: "08 Jul 2026, 09:30",
    validTo: "08 Jul 2026, 11:00",
    idType: "Aadhaar",
    idLast4: "4821",
    status: "REJECTED",
    rejectionReason:
      "Purpose unclear. Please re-apply stating the name of the officer you are meeting and the application reference.",
    qrToken: "",
  },
  "demo-expired": {
    id: "demo-expired",
    referenceNumber: "GP-2026-0121",
    visitorName: "Anita Rao",
    phoneLast4: "3210",
    purpose: "Document submission at the records counter.",
    hostDepartment: "Administration",
    facility: "Shastri Bhawan",
    gate: "Gate 3 — Visitor Reception",
    validFrom: "06 Jul 2026, 14:00",
    validTo: "06 Jul 2026, 15:30",
    idType: "PAN",
    idLast4: "9F21",
    status: "EXPIRED",
    approverName: "R. Sharma",
    qrToken: "GP1|demo-expired|GP-2026-0121",
  },
};

function readStore(): Record<string, VisitorPass> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeStore(data: Record<string, VisitorPass>): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getPass(id: string): VisitorPass | null {
  if (cache.has(id)) return cache.get(id) ?? null;
  const found = readStore()[id] ?? SEEDED[id] ?? null;
  if (found) cache.set(id, found);
  return found;
}

export type NewPassInput = Omit<
  VisitorPass,
  "id" | "referenceNumber" | "status" | "qrToken"
>;

/** Creates a PENDING pass, persists it, and returns its id. Call from an event. */
export function createPendingPass(input: NewPassInput): string {
  const store = readStore();
  const seq = Object.keys(store).length + 1;
  const id = `req-${String(seq).padStart(3, "0")}-${input.phoneLast4}`;
  const referenceNumber = `GP-2026-${String(1000 + seq).slice(-4)}`;
  const pass: VisitorPass = {
    ...input,
    id,
    referenceNumber,
    status: "PENDING",
    qrToken: `GP1|${id}|${referenceNumber}`,
  };
  store[id] = pass;
  writeStore(store);
  cache.set(id, pass);
  return id;
}
