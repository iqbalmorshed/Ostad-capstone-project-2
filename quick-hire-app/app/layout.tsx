import type { Metadata } from 'next';
import { Epilogue, Inter } from 'next/font/google';
import { Nav, Footer } from './components';
import './globals.css';

const epilogue = Epilogue({
  variable: '--font-epilogue-loaded',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter-loaded',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quick Hire App',
  description: 'Quick Hire App',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${epilogue.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-gray-50 antialiased">
        <Nav />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
