import Link from 'next/link';
import Image from 'next/image';
import type { Job } from '@/types';

interface LatestJobCardProps {
  job: Job;
}

function getCompanyInitials(company: string) {
  return company
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function getTagStyles(tag: string) {
  const lowerTag = tag.toLowerCase();
  switch (lowerTag) {
    case 'marketing':
      return {
        bg: 'bg-[#FFB8361A]',
        text: 'text-[#FFB836]',
        border: 'border-[#FFB836]',
      };
    case 'design':
    case 'business':
      return {
        bg: 'bg-[#4640DE1A]',
        text: 'text-[#4640DE]',
        border: 'border-[#4640DE]',
      };
    case 'technology':
      return {
        bg: 'bg-[#FF65501A]',
        text: 'text-[#FF6550]',
        border: 'border-[#FF6550]',
      };
    default:
      return {
        bg: 'bg-[#56CDAD1A]',
        text: 'text-[#56CDAD]',
        border: 'border-[#56CDAD]',
      };
  }
}

export default function LatestJobCard({ job }: LatestJobCardProps) {
  const tags = job.tags?.length ? job.tags : [job.category];

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="flex items-center gap-6 border border-[#D6DDEB] bg-white p-6 transition-all hover:border-[#4640DE] hover:shadow-lg group"
    >
      <div className="relative h-[46px] w-[46px] shrink-0 overflow-hidden">
        {job.companyLogo ? (
          <Image
            src={job.companyLogo}
            alt={job.company}
            width={46}
            height={46}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <span className="text-sm font-bold text-[#25324B]">
              {getCompanyInitials(job.company)}
            </span>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-epilogue mb-1 truncate text-[20px] font-semibold leading-[120%] text-[#25324B] transition-colors group-hover:text-[#4640DE]">
          {job.title}
        </h3>
        <p className="font-epilogue text-[16px] leading-[160%] text-[#7C8493]">
          {job.company} <span className="mx-1">•</span> {job.location}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-epilogue rounded-full bg-[#56CDAD1A] px-4 py-1 text-[14px] font-semibold text-[#56CDAD]">
          {job.type ?? 'Full-time'}
        </span>
        <div className="mx-2 hidden h-6 w-px bg-[#D6DDEB] sm:block" />
        {tags.slice(0, 2).map((tag) => {
          const styles = getTagStyles(tag);
          return (
            <span
              key={tag}
              className={`font-epilogue rounded-full border px-4 py-1 text-[14px] font-semibold ${styles.border} ${styles.text}`}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </Link>
  );
}
