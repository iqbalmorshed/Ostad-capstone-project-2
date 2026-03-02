'use client';

import { Input, Select } from '@/app/components/common';

interface JobFiltersProps {
  search: string;
  category: string;
  location: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}

const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories' },
  { value: 'Design', label: 'Design' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Business', label: 'Business' },
  { value: 'Human Resource', label: 'Human Resource' },
];

export default function JobFilters({
  search,
  category,
  location,
  onSearchChange,
  onCategoryChange,
  onLocationChange,
}: JobFiltersProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        />
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <Input
            type="text"
            placeholder="Location..."
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
}
