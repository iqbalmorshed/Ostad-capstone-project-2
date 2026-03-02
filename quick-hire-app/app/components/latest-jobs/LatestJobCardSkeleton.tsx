export default function LatestJobCardSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-6 border border-[#D6DDEB] bg-white p-6">
      <div className="h-[46px] w-[46px] shrink-0 rounded-full bg-[#D6DDEB]" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-5 w-2/3 rounded bg-[#D6DDEB]" />
        <div className="h-4 w-1/2 rounded bg-[#D6DDEB]" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-7 w-20 rounded-full bg-[#D6DDEB]" />
        <div className="h-6 w-px bg-[#D6DDEB]" />
        <div className="h-7 w-16 rounded-full bg-[#D6DDEB]" />
        <div className="h-7 w-20 rounded-full bg-[#D6DDEB]" />
      </div>
    </div>
  );
}
