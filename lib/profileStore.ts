/**
 * Client-side visitor profile store.
 *
 * A visitor profile is created once and reused across visits. It persists in
 * localStorage (so "log in next time" works); the signed-in session lives in
 * sessionStorage (closing the tab logs out, the profile remains). Per
 * al/knowledge/domain/entry-permit-rules.md a profile holds ONLY name, phone,
 * ID type, the last 4 digits of the ID, and the ID photo — never a full ID
 * number, never biometrics.
 */

export interface VisitorProfile {
  /** Full phone — the account key. */
  phone: string;
  phoneLast4: string;
  name: string;
  idType: string; // display label, e.g. "Aadhaar"
  idTypeValue: string; // e.g. "aadhaar"
  idLast4: string;
  idPhotoDataUrl?: string;
  createdAt: string;
}

export type NewProfileInput = Omit<VisitorProfile, "phoneLast4" | "createdAt">;

const PROFILES_KEY = "gatepass.visitor.profiles";
const SESSION_KEY = "gatepass.visitor.session";

const listeners = new Set<() => void>();
let snapshotPhone: string | null | undefined; // undefined = not yet computed
let snapshot: VisitorProfile | null = null;

function emit() {
  listeners.forEach((l) => l());
}

function invalidate() {
  snapshotPhone = undefined;
  emit();
}

function readProfiles(): Record<string, VisitorProfile> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(PROFILES_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeProfiles(data: Record<string, VisitorProfile>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILES_KEY, JSON.stringify(data));
}

function readSessionPhone(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(SESSION_KEY);
}

export function getProfileByPhone(phone: string): VisitorProfile | null {
  return readProfiles()[phone] ?? null;
}

/** Create (or overwrite) a profile and sign the visitor in. Call from an event. */
export function createProfile(input: NewProfileInput): VisitorProfile {
  const profile: VisitorProfile = {
    ...input,
    phoneLast4: input.phone.slice(-4),
    createdAt: new Date().toISOString(),
  };
  const all = readProfiles();
  all[profile.phone] = profile;
  writeProfiles(all);
  setSession(profile.phone);
  return profile;
}

export function setSession(phone: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, phone);
  invalidate();
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
  invalidate();
}

export function deleteProfile(phone: string): void {
  const all = readProfiles();
  delete all[phone];
  writeProfiles(all);
  clearSession();
}

/** Stable subscribe for useSyncExternalStore. */
export function subscribeProfile(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

/** Stable snapshot of the signed-in profile (same ref until it changes). */
export function getCurrentProfile(): VisitorProfile | null {
  const phone = readSessionPhone();
  if (snapshotPhone === phone) return snapshot;
  snapshotPhone = phone;
  snapshot = phone ? (readProfiles()[phone] ?? null) : null;
  return snapshot;
}

export function getServerProfile(): null {
  return null;
}
