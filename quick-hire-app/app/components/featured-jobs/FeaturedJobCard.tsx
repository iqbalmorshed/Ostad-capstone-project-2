import Link from 'next/link';
import Image from 'next/image';
import type { Job } from '@/types';

interface FeaturedJobCardProps {
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
      return { bg: 'bg-[#EB85331A]', text: 'text-[#FFB836]' };
    case 'design':
      return { bg: 'bg-[#56CDAD1A]', text: 'text-[#56CDAD]' };
    case 'business':
      return { bg: 'bg-[#4640DE1A]', text: 'text-[#4640DE]' };
    case 'technology':
      return { bg: 'bg-[#FF65501A]', text: 'text-[#FF6550]' };
    case 'finance':
      return { bg: 'bg-[#26A4FF1A]', text: 'text-[#26A4FF]' };
    case 'engineering':
      return { bg: 'bg-[#7B61FF1A]', text: 'text-[#7B61FF]' };
    case 'sales':
      return { bg: 'bg-[#F94D6A1A]', text: 'text-[#F94D6A]' };
    case 'human resource':
      return { bg: 'bg-[#00B0741A]', text: 'text-[#00B074]' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-600' };
  }
}

export default function FeaturedJobCard({ job }: FeaturedJobCardProps) {
  const tags = job.tags?.length ? job.tags : [job.category];

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="block rounded-none border border-[#D6DDEB] bg-white p-6 transition-all hover:border-[#4640DE] hover:shadow-md group"
    >
      <div className="mb-6 flex items-start justify-between">
        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
          {job.companyLogo ? (
            <Image
              src={job.companyLogo}
              alt={job.company}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
              <span className="text-sm font-bold text-[#25324B]">
                {getCompanyInitials(job.company)}
              </span>
            </div>
          )}
        </div>
        <span className="rounded-none border border-[#4640DE] px-3 py-1 font-epilogue text-[14px] font-semibold text-[#4640DE]">
          {job.type ?? 'Full-time'}
        </span>
      </div>

      <div className="mb-2">
        <h3 className="font-epilogue mb-1 text-[18px] font-semibold leading-[120%] text-[#25324B] transition-colors group-hover:text-[#4640DE]">
          {job.title}
        </h3>
        <p className="font-epilogue text-[16px] leading-[160%] text-[#7C8493]">
          {job.company} <span className="mx-1">•</span> {job.location}
        </p>
      </div>

      <p className="font-epilogue mb-6 line-clamp-2 text-[16px] leading-[160%] text-[#7C8493]">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.slice(0, 3).map((tag) => {
          const styles = getTagStyles(tag);
          return (
            <span
              key={tag}
              className={`font-epilogue rounded-full px-4 py-1.5 text-[14px] font-semibold ${styles.bg} ${styles.text}`}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </Link>
  );
}
