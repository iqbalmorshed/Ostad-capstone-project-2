import Image from 'next/image';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <section className="bg-primary px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 max-w-7xl mx-auto relative">
         <div className="absolute bottom-0 right-0 z-10">
        
        <div className="w-0 h-0 
                        border-l-200 border-l-transparent
                        border-b-100 border-b-white">
        </div>
      </div>
      <div className="absolute top-0 left-0 z-10">
        
        <div className="w-0 h-0 
                        border-r-200 border-r-transparent
                        border-t-100 border-t-white">
        </div>
      </div>
      <div className="mx-auto flex min-h-[40vh] flex-col lg:flex-row lg:items-stretch">
        {/* Left: Promo block – diagonal from top-right to bottom-left (wider at top) */}
        <div
          className="relative flex w-full flex-col justify-center px-8 py-14 lg:w-[55%] lg:py-20 lg:pl-20 lg:pr-8 xl:pl-28 xl:pr-12"
          style={{
            background: 'var(--color-primary)',
            // clipPath: 'polygon(0 0, 100% 0, 78% 100%, 0 100%)',
          }}
        >
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
            Start posting jobs today
          </h2>
          <p className="mt-4 text-lg text-white/90 lg:mt-5">
            Start posting jobs for only $10.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-flex w-fit items-center justify-center  bg-white px-8 py-3.5 text-base font-semibold shadow-sm transition hover:opacity-95 lg:mt-10"
            style={{ color: 'var(--color-primary)' }}
          >
            Sign Up For Free
          </Link>
        </div>

        {/* Right: Dashboard image – aligns with diagonal, on white */}
        <div className="relative flex flex-1 items-center lg:items-end justify-center lg:justify-end  lg:min-h-[40vh] z-50">
          <div className="relative w-full max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
            <Image
              src="/dashboard/dashboard.png"
              alt="QuickHire Dashboard"
              width={1000}
              height={700}
              className="w-full h-auto object-contain object-right lg:-mb-10 z-50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
