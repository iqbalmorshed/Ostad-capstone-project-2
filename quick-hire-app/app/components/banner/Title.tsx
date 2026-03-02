/* Title component for the banner */

import Image from 'next/image';

export default function Title() {
  return (
    <div className="z-20 px-2 sm:px-0">
      <h1
        className="text-start text-4xl font-extrabold leading-tight text-blue-950 sm:text-5xl md:text-6xl lg:text-7xl"
        style={{ fontFamily: 'var(--font-clash)' }}
      >
        Discover <br />
        more than <br />
        <span style={{ color: 'var(--color-accent-blue)' }}>5000+ Jobs</span>
      </h1>

      <div className="relative my-4 w-full max-w-[240px] sm:my-6 sm:max-w-[320px] lg:max-w-[450px]">
        <Image
          src="/line.png"
          alt=""
          width={450}
          height={30}
          className="h-auto w-full object-left object-contain"
        />
      </div>

      <p
        className="max-w-lg text-base font-medium leading-relaxed text-blue-950 opacity-70 sm:text-lg"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        Great platform for the job seeker that searching for new career heights
        and passionate about startups.
      </p>
    </div>
  );
}