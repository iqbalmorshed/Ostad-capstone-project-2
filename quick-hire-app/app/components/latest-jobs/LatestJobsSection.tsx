'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LatestJobCard from './LatestJobCard';
import LatestJobCardSkeleton from './LatestJobCardSkeleton';
import { jobService } from '@/services';
import type { Job } from '@/types';

export default function LatestJobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    jobService
      .getLatest()
      .then((response) => {
        if (response.success && response.data) {
          setJobs(response.data);
        } else {
          setError('Failed to load latest jobs');
        }
      })
      .catch(() => {
        setError('Failed to load latest jobs');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/3 opacity-5">
        <svg
          width="430"
          height="916"
          viewBox="0 0 430 916"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M430 0H0V916H430V0Z" fill="url(#paint0_linear)" />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="215"
              y1="0"
              x2="215"
              y2="916"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4640DE" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-12 lg:px-20">
        <div className="mb-12 flex items-end justify-between">
          <h2
            className="font-clash text-[48px] font-semibold leading-[110%] tracking-[0%] text-[#25324B]"
            style={{ fontFamily: 'var(--font-clash)' }}
          >
            Latest <span className="text-[#26A4FF]">jobs open</span>
          </h2>
          <Link
            href="/jobs"
            className="font-epilogue mb-2 flex items-center gap-2 text-[16px] font-semibold leading-[160%] text-[#4640DE] transition-opacity hover:opacity-80"
            style={{ fontFamily: 'var(--font-epilogue)' }}
          >
            Show all jobs
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.172 11L10.808 5.63605L12.222 4.22183L20 12L12.222 19.7782L10.808 18.364L16.172 13H4V11H16.172Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, i) => <LatestJobCardSkeleton key={i} />)
            : error
              ? (
                <div className="col-span-full flex flex-col items-center justify-center gap-3 py-12">
                  <p className="text-[#7C8493]">{error}</p>
                  <button
                    type="button"
                    onClick={load}
                    className="rounded-lg bg-[#4640DE] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                  >
                    Try again
                  </button>
                </div>
                )
              : jobs.length === 0
                ? (
                  <div className="col-span-full py-12 text-center text-[#7C8493]">
                    No latest jobs right now.
                  </div>
                  )
                : jobs.map((job) => (
                    <LatestJobCard key={job._id} job={job} />
                  ))}
        </div>
      </div>
    </section>
  );
}
