import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/collections' },
  { label: 'Mailbox', href: '/mailbox' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'DAO', href: '/dao' },
  { label: 'Docs', href: '/docs' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary border-b border-border">
      <div className="max-w-7xl mx-auto px-lg">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-md flex-shrink-0">
            <div className="w-2xl h-2xl bg-purple-primary rounded-sm flex items-center justify-center">
              <span className="text-white font-display text-sm font-bold">📬</span>
            </div>
            <span className="text-text-primary font-display font-bold text-lg hidden sm:inline">
              dshit.xyz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body text-text-secondary hover:text-text-primary transition-colors duration-quick"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-md">
            <Button variant="primary" size="sm">
              Connect Wallet
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-md text-text-primary hover:text-text-secondary transition-colors"
          >
            <svg
              className="w-lg h-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-lg border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-0 py-md text-body text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
