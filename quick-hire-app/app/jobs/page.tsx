'use client';

import { useEffect, useState, useCallback, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { JobCard, JobFilters } from '@/app/components/jobs';
import { jobService } from '@/services';
import type { Job } from '@/types';
import { Loader } from '@/app/components';

const SEARCH_DEBOUNCE_MS = 500;

function JobsContent() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [category, setCategory] = useState(
    searchParams.get('category') ?? '',
  );
  const [location, setLocation] = useState(searchParams.get('location') ?? '');
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
  });
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [debouncedCategory, setDebouncedCategory] = useState(category);
  const [debouncedLocation, setDebouncedLocation] = useState(location);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevFiltersRef = useRef({
    search: debouncedSearch,
    category: debouncedCategory,
    location: debouncedLocation,
  });
  const lastRequestRef = useRef<{
    search: string;
    category: string;
    location: string;
    page: number;
  } | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setDebouncedCategory(category);
      setDebouncedLocation(location);
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, category, location]);

  useEffect(() => {
    const filtersChanged =
      prevFiltersRef.current.search !== debouncedSearch ||
      prevFiltersRef.current.category !== debouncedCategory ||
      prevFiltersRef.current.location !== debouncedLocation;
    if (filtersChanged) {
      prevFiltersRef.current = {
        search: debouncedSearch,
        category: debouncedCategory,
        location: debouncedLocation,
      };
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
    const pageToFetch = filtersChanged ? 1 : pagination.page;

    const last = lastRequestRef.current;
    const sameRequest =
      last !== null &&
      last.search === debouncedSearch &&
      last.category === debouncedCategory &&
      last.location === debouncedLocation &&
      last.page === pageToFetch;
    if (sameRequest) return;
    lastRequestRef.current = {
      search: debouncedSearch,
      category: debouncedCategory,
      location: debouncedLocation,
      page: pageToFetch,
    };

    let cancelled = false;
    setLoading(true);
    jobService
      .getAll({
        search: debouncedSearch || undefined,
        category: debouncedCategory || undefined,
        location: debouncedLocation || undefined,
        page: pageToFetch,
        limit: 12,
      })
      .then((response) => {
        if (cancelled) return;
        if (response.success && response.data) {
          setJobs(response.data.jobs);
          setPagination({
            total: response.data.pagination.total,
            page: response.data.pagination.page,
            pages: response.data.pagination.pages,
          });
        }
      })
      .catch((err) => {
        if (!cancelled) console.error('Failed to fetch jobs:', err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, debouncedCategory, debouncedLocation, pagination.page]);

  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Find your <span className="text-indigo-600">dream job</span>
        </h1>
        <p className="text-gray-600">{pagination.total} jobs available</p>
      </div>

      <JobFilters
        search={search}
        category={category}
        location={location}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onLocationChange={setLocation}
      />

      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-lg border border-gray-200 bg-white p-6"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="h-14 w-14 rounded-lg bg-gray-200" />
                  <div className="h-6 w-20 rounded-full bg-gray-200" />
                </div>
                <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
                <div className="mb-4 h-4 w-1/2 rounded bg-gray-200" />
                <div className="mb-4 h-16 rounded bg-gray-200" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 rounded-full bg-gray-200" />
                  <div className="h-6 w-16 rounded-full bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
            {pagination.pages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from(
                  { length: pagination.pages },
                  (_, i) => i + 1,
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                      pagination.page === page
                        ? 'bg-indigo-600 text-white'
                        : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white py-12 text-center">
            <svg
              className="mx-auto mb-4 h-16 w-16 text-gray-300"
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
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No jobs found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function JobsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="flex w-full items-center justify-center py-12">
                <Loader />
              </div>
            }
          >
            <JobsContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
