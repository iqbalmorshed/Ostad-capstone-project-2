/* Companies component */

import Image from 'next/image';

const companies = [
  { name: 'Vodafone', logo: '/companies/vodafone.png' },
  { name: 'Intel', logo: '/companies/intel.png' },
  { name: 'AMD', logo: '/companies/amd.png' },
  { name: 'Tesla', logo: '/companies/tesla.png' },
  { name: 'Talkit', logo: '/companies/talkit.png' },
];

export default function Companies() {
    return (
        <div className="max-w-7xl mx-auto py-10 z-20 overflow-hidden">
            <p className="mb-4 text-md font-semibold text-gray-500 opacity-65">
              Companies we helped grow
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] space-x-16">
              {companies.map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={380}
                    height={240}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
        </div>
    );
}