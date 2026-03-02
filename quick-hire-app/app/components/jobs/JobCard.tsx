import Link from 'next/link';
import Image from 'next/image';
import type { Job } from '@/types';
import { Tag } from '@/app/components/common';

interface JobCardProps {
  job: Job;
}

function getCompanyInitials(company: string): string {
  return company
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function getTagVariant(tag: string): 'primary' | 'secondary' | 'outline' {
  if (tag.toLowerCase() === 'marketing') return 'secondary';
  if (tag.toLowerCase() === 'design') return 'primary';
  return 'outline';
}

export default function JobCard({ job }: JobCardProps) {
  const tags = job.tags?.length ? job.tags : [job.category];

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="block rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-indigo-300 hover:shadow-lg"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          {job.companyLogo ? (
            <Image
              src={
                job.companyLogo.startsWith('/')
                  ? job.companyLogo
                  : job.companyLogo
              }
              alt={job.company}
              fill
              className="object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-sm font-bold text-gray-600">
              {getCompanyInitials(job.company)}
            </span>
          )}
        </div>
        <span className="rounded-full border border-indigo-200 px-3 py-1 text-xs font-medium text-indigo-600">
          {job.type || 'Full-time'}
        </span>
      </div>
      <h3 className="mb-1 text-lg font-semibold text-gray-900">{job.title}</h3>
      <p className="mb-3 text-sm text-gray-500">
        {job.company} • {job.location}
      </p>
      <p className="mb-4 line-clamp-2 text-sm text-gray-600">
        {job.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.slice(0, 3).map((tag) => (
          <Tag key={tag} text={tag} variant={getTagVariant(tag)} />
        ))}
      </div>
    </Link>
  );
}
