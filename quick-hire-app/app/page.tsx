import {
  BackGround,
  Title,
  Search,
  Loader,
  Companies,
  CategoriesSection,
  FeaturedJobsSection,
  LatestJobsSection,
  Dashboard,
} from './components';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <div className="">
      <BackGround />
      <div className="relative z-20 mx-auto mt-20 max-w-7xl overflow-hidden px-6 lg:mt-50">
        <Title />
        <Search />
        <p className="mt-1.5 text-sm font-semibold text-gray-500 opacity-65">
          Popular : UI Designer, UX Researcher, Android, Admin, Developer.
        </p>
      </div>
      <Suspense fallback={<Loader />}>
        <div className="relative z-20 mt-20 overflow-hidden bg-white px-6 lg:mt-50">
          <Companies />
        </div>
        <section className="bg-white">
          <Dashboard />
        </section>
        <section className="bg-white">
          <Suspense fallback={<Loader />}>
            <CategoriesSection />
          </Suspense>
        </section>
        <section className="bg-white">
          <Suspense fallback={<Loader />}>
            <FeaturedJobsSection />
          </Suspense>
        </section>
        <section className="bg-white">
          <Suspense fallback={<Loader />}>
            <LatestJobsSection />
          </Suspense>
        </section>
       
      </Suspense>
    </div>
  );
}   
