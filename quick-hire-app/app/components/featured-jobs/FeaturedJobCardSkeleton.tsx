export default function FeaturedJobCardSkeleton() {
  return (
    <div className="animate-pulse rounded-none border border-[#D6DDEB] bg-white p-6">
      <div className="mb-6 flex items-start justify-between">
        <div className="h-12 w-12 rounded-full bg-[#D6DDEB]" />
        <div className="h-6 w-16 rounded-none bg-[#D6DDEB]" />
      </div>
      <div className="mb-2 h-5 w-3/4 rounded bg-[#D6DDEB]" />
      <div className="mb-4 h-4 w-1/2 rounded bg-[#D6DDEB]" />
      <div className="mb-6 h-12 w-full rounded bg-[#D6DDEB]" />
      <div className="flex gap-2">
        <div className="h-7 w-20 rounded-full bg-[#D6DDEB]" />
        <div className="h-7 w-16 rounded-full bg-[#D6DDEB]" />
        <div className="h-7 w-24 rounded-full bg-[#D6DDEB]" />
      </div>
    </div>
  );
}
