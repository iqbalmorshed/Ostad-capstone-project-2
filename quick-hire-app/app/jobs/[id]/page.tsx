'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { jobService } from '@/services';
import type { Job } from '@/types';
import { ApplicationForm } from '@/app/components/jobs';
import { Loader } from '@/app/components';

export default function JobDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    jobService
      .getOne(id)
      .then((res) => {
        if (!cancelled && res.success && res.data) setJob(res.data);
        else if (!cancelled) setError('Job not found');
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load job');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <p className="text-gray-600">{error ?? 'Job not found'}</p>
        <Link
          href="/jobs"
          className="mt-4 inline-block text-indigo-600 hover:underline"
        >
          Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/jobs"
        className="mb-6 inline-flex items-center text-sm text-indigo-600 hover:underline"
      >
        ← Back to jobs
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              {job.title}
            </h1>
            <p className="mb-4 text-gray-600">
              {job.company} • {job.location}
            </p>
            <div className="prose max-w-none text-gray-700">
              <p className="whitespace-pre-wrap">{job.description}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <ApplicationForm jobId={job._id} jobTitle={job.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
