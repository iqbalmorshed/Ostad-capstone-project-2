'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const aboutLinks = [
  { href: '/companies', label: 'Companies' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/terms', label: 'Terms' },
  { href: '/advice', label: 'Advice' },
  { href: '/privacy', label: 'Privacy Policy' },
];

const resourceLinks = [
  { href: '/help', label: 'Help Docs' },
  { href: '/guide', label: 'Guide' },
  { href: '/updates', label: 'Updates' },
  { href: '/contact', label: 'Contact Us' },
];

const socialLinks = [
  {
    href: 'https://facebook.com',
    label: 'Facebook',
    icon: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    icon: (
      <path d="M2 6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6zm4-2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6zm6 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3-3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    ),
  },
  {
    href: 'https://dribbble.com',
    label: 'Dribbble',
    icon: (
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 2a8 8 0 0 1 6.5 3.28l-2.9 1.3A12 12 0 0 0 12 6a11.7 11.7 0 0 0-2 .17l-.35-2.94A8 8 0 0 1 12 4zm-1 3.6l1.4.6a6 6 0 0 1 3.62 3.62l.6 1.4-1.37.5a6 6 0 0 1-3.5 3.5L8 17l-.6-1.4a6 6 0 0 1 0-5.2L8 8.6l3-1z" />
    ),
  },
  {
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    icon: (
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2V9zm2-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM22 9h-4v3.5a2.5 2.5 0 0 0-5 0V9h-4v12h4v-3.5a2.5 2.5 0 0 1 5 0V21h4V9z" />
    ),
  },
  {
    href: 'https://twitter.com',
    label: 'Twitter',
    icon: (
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 2.1-.1 3.6-.1 3.6-.1z" />
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Placeholder: could send to API
      setEmail('');
    }
  };

  return (
    <footer className="mt-auto bg-[#1e293b] text-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* QuickHire branding */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f172a]">
                <Image
                  src="/icon.png"
                  alt="QuickHire"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </span>
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: 'var(--font-clash)' }}
              >
                QuickHire
              </span>
            </Link>
            <p className="mt-4 max-w-[280px] text-sm leading-relaxed text-gray-400">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              About
            </h3>
            <ul className="mt-4 space-y-3">
              {aboutLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {resourceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get job notifications */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Get job notifications
            </h3>
            <p className="mt-4 text-sm text-gray-400">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="mt-4 flex flex-wrap gap-2 sm:flex-nowrap"
            >
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-1 rounded-lg border-0 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-600/70 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              2021 @ QuickHire. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f172a] text-white transition hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
