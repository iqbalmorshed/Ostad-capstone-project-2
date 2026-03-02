'use client';

import { Search as SearchIcon, MapPin, ChevronDown } from 'lucide-react';

export default function Search() {
  return (
    <div
      className="flex w-full flex-col overflow-hidden max-w-4xl mt-2.5 py-1 px-5 border border-gray-100 bg-white shadow-lg sm:flex-row sm:items-stretch"
      style={{
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}
    >
      {/* Job title or keyword */}
      <div
        className="flex flex-1 items-center gap-3 border-b px-3 py-4 sm:border-b-0 sm:border-r sm:py-4"
        style={{ borderColor: 'var(--color-nav-separator)' }}
      >
        <SearchIcon
          size={20}
          className="shrink-0"
          style={{ color: 'var(--color-nav-text)' }}
        />
        <input
          type="text"
          placeholder="Job title or keyword"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-70"
          style={{
            color: 'var(--color-nav-text)',
            fontFamily: 'var(--font-inter)',
          }}
        />
      </div>

      {/* Location */}
      <div
        className="flex flex-1 items-center gap-3 border-b px-3 py-4 sm:border-b-0 sm:border-r sm:py-4"
        style={{ borderColor: 'var(--color-nav-separator)' }}
      >
        <MapPin
          size={20}
          className="shrink-0"
          style={{ color: 'var(--color-nav-text)' }}
        />
        <input
          type="text"
          placeholder="Florence, Italy"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-70"
          style={{
            color: 'var(--color-nav-text)',
            fontFamily: 'var(--font-inter)',
          }}
        />
        <ChevronDown
          size={20}
          className="shrink-0"
          style={{ color: 'var(--color-nav-text)' }}
        />
      </div>

      {/* Search button */}
      <div className="shrink-0 p-2 sm:p-2.5">
        <button
          type="button"
          className="h-full w-full px-3 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:opacity-95 sm:px-8"
          style={{
            backgroundColor: 'var(--color-primary)',
            fontFamily: 'var(--font-inter)',
          }}
        >
          Search my job
        </button>
      </div>
    </div>
  );
}
