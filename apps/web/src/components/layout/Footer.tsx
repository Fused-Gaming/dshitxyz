import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border mt-5xl">
      <div className="max-w-7xl mx-auto px-lg py-4xl">
        {/* Footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2xl mb-3xl">
          {/* Brand */}
          <div>
            <h3 className="text-h4 text-text-primary font-display font-bold mb-lg">
              dshit.xyz
            </h3>
            <p className="text-body-sm text-text-tertiary">
              The world's first decentralized NFT postal service.
            </p>
            <div className="flex gap-md mt-lg">
              <a
                href="https://twitter.com"
                className="text-text-secondary hover:text-purple-primary transition-colors"
                aria-label="Twitter"
              >
                𝕏
              </a>
              <a
                href="https://discord.com"
                className="text-text-secondary hover:text-purple-primary transition-colors"
                aria-label="Discord"
              >
                ◇
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-body font-500 text-text-primary mb-lg">Product</h4>
            <ul className="space-y-sm">
              <li>
                <Link href="/collections" className="text-body-sm text-text-tertiary hover:text-text-primary transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/mailbox" className="text-body-sm text-text-tertiary hover:text-text-primary transition-colors">
                  Mailbox
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-body-sm text-text-tertiary hover:text-text-primary transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/fees" className="text-body-sm text-text-tertiary hover:text-text-primary transition-colors">
                  Fees
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-body font-500 text-text-primary mb-lg">Company</h4>
            <ul className="space-y-sm">
              <li>
                <Link href="/about" className="text-body-sm text-text-tertiary hover:text-text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-body-sm text-text-tertiary hover:text-text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-body-sm text-text-tertiary hover:text-text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-body-sm text-text-tertiary hover:text-text-primary transition-colors">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-body font-500 text-text-primary mb-lg">Legal</h4>
            <ul className="space-y-sm">
              <li>
                <Link href="/terms" className="text-body-sm text-text-tertiary hover:text-text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-body-sm text-text-tertiary hover:text-text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/dao" className="text-body-sm text-text-tertiary hover:text-text-primary transition-colors">
                  DAO Governance
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-body-sm text-text-tertiary hover:text-text-primary transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-2xl flex flex-col sm:flex-row items-center justify-between gap-lg">
          <p className="text-body-sm text-text-tertiary">
            © {currentYear} dshit.xyz. All rights reserved.
          </p>
          <p className="text-body-sm text-text-tertiary">
            Built on Monad • Always postal
          </p>
        </div>
      </div>
    </footer>
  );
}
