"use client";

import "./gate.css";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/Input";
import { Avatar } from "../ui/Avatar";
import { PartialId } from "../ui/PartialId";

export interface LookupResult {
  passId: string;
  visitorName: string;
  photoSrc?: string;
  idLast4: string;
  purpose: string;
}

interface ManualLookupProps {
  onSearch: (query: string) => Promise<LookupResult[]>;
  onSelect: (passId: string) => void;
}

export function ManualLookup({ onSearch, onSelect }: ManualLookupProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LookupResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setResults(await onSearch(query.trim()));
    setIsSearching(false);
  }

  return (
    <form className="manual-lookup" onSubmit={submit}>
      <Input
        label="Search by visitor name or last 4 of ID"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-busy={isSearching}
      />
      <div className="manual-lookup__results">
        {results.map((r) => (
          <button
            key={r.passId}
            type="button"
            className="manual-lookup__result"
            onClick={() => onSelect(r.passId)}
          >
            <Avatar src={r.photoSrc} alt={`ID photo of ${r.visitorName}`} name={r.visitorName} size="md" />
            <span>
              <strong>{r.visitorName}</strong>
              <br />
              <PartialId last4={r.idLast4} /> · {r.purpose}
            </span>
            <Search size={16} aria-hidden="true" />
          </button>
        ))}
      </div>
    </form>
  );
}
