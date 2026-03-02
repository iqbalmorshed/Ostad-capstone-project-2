'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '../button/button';
import Image from 'next/image';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <Image src="/icon.png" alt="QuickHire" width={36} height={36} />
      <span
        className="text-2xl font-bold"
        style={{
          fontFamily: 'var(--font-clash)',
          color: 'var(--color-nav-text)',
        }}
      >
        QuickHire
      </span>
    </Link>
  );
}

const navLinks = [
  { href: '/find-jobs', label: 'Find Jobs' },
  { href: '/companies', label: 'Browse Companies' },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-6 w-6 flex-col justify-center">
      <span
        className="block h-0.5 w-6 rounded-full transition-all duration-200"
        style={{
          backgroundColor: 'var(--color-nav-text)',
          transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none',
        }}
      />
      <span
        className="mt-1.5 block h-0.5 w-6 rounded-full transition-all duration-200"
        style={{
          backgroundColor: 'var(--color-nav-text)',
          opacity: open ? 0 : 1,
        }}
      />
      <span
        className="mt-1.5 block h-0.5 w-6 rounded-full transition-all duration-200"
        style={{
          backgroundColor: 'var(--color-nav-text)',
          transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
        }}
      />
    </span>
  );
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="absolute top-0 left-0 right-0 z-50 w-full px-6 py-4 md:px-10"
      style={{ background: 'transparent' }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden items-center gap-6 sm:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium transition hover:opacity-80"
                style={{ color: 'var(--color-nav-text)' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden items-center gap-4 sm:flex">
          <Link
            href="/login"
            className=" px-4 py-2 text-base font-medium transition hover:opacity-80"
            style={{
              color: 'var(--color-primary)',
              backgroundColor: 'transparent',
            }}
          >
            Login
          </Link>
          <span
            className="h-5 w-px shrink-0"
            style={{ backgroundColor: 'var(--color-nav-separator)' }}
          />
          <Link href="/signup">
            <Button text="Sign Up" variant="primary" size="medium" />
          </Link>
        </div>
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center sm:hidden"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </nav>
      {/* Mobile dropdown */}
      <div
        className="sm:hidden overflow-hidden transition-all duration-200 ease-out"
        style={{
          maxHeight: menuOpen ? '320px' : '0',
          opacity: menuOpen ? 1 : 0,
        }}
      >
        <div
          className="mt-4 flex flex-col gap-1  py-2 bg-gray-200"
          
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-3 text-sm font-medium transition hover:opacity-80"
              style={{ color: 'var(--color-nav-text)' }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <span
            className="my-1 mx-4 h-px shrink-0"
            style={{ backgroundColor: 'var(--color-nav-separator)' }}
          />
          <Link
            href="/login"
            className="mx-4 flex justify-center  py-3 text-base font-medium transition hover:opacity-80 bg-white"
            style={{
              color: 'var(--color-primary)',
              
            }}
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="mx-4 mt-1 flex justify-center  py-3 text-base font-medium text-white transition hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
