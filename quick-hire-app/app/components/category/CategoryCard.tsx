import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  count: number;
  icon: React.ReactNode;
  isActive?: boolean;
}

export default function CategoryCard({
  name,
  count,
  icon,
  isActive = false,
}: CategoryCardProps) {
  return (
    <Link
      href={`/jobs?category=${encodeURIComponent(name)}`}
      className={` border p-6 transition-all hover:shadow-lg ${
        isActive
          ? 'border-indigo-600 bg-indigo-600 text-white'
          : 'border-gray-200 bg-white hover:border-indigo-300'
      }`}
    >
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${
          isActive ? 'bg-white/20' : 'bg-indigo-50'
        }`}
      >
        <span className={isActive ? 'text-white' : 'text-indigo-600'}>
          {icon}
        </span>
      </div>
      <h3
        className={`mb-2 font-semibold ${
          isActive ? 'text-white' : 'text-gray-900'
        }`}
      >
        {name}
      </h3>
      <div className="flex items-center justify-between">
        <span
          className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-500'}`}
        >
          {count} jobs available
        </span>
        <svg
          className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}
