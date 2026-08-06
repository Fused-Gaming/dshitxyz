import React from 'react';
import { Button, Badge } from '@/components/ui';
import { Container } from '@/components/layout/Container';

export function Hero() {
  return (
    <section className="pt-32 pb-5xl bg-bg-primary">
      <Container maxWidth="7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3xl items-center">
          {/* Left side - Content */}
          <div className="order-2 md:order-1">
            <Badge variant="purple" size="sm" className="mb-lg">
              🚀 Built on Monad
            </Badge>

            <h1 className="text-h1 text-text-primary font-display font-bold mb-xl leading-tight">
              You've Got
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-primary to-purple-light">
                Mail.
              </span>
            </h1>

            <p className="text-body-lg text-text-secondary mb-2xl max-w-md">
              The world's first decentralized postal service for blockchain wallets. Mail
              NFTs to any Monad address, forever.
            </p>

            {/* Trust row */}
            <div className="flex flex-col sm:flex-row gap-lg mb-2xl pb-2xl border-b border-border">
              <div>
                <p className="text-label text-text-tertiary mb-sm">Fixed Postage</p>
                <p className="text-body font-500 text-text-primary">1.00 $SHIT</p>
              </div>
              <div>
                <p className="text-label text-text-tertiary mb-sm">Always Immutable</p>
                <p className="text-body font-500 text-text-primary">On Chain Forever</p>
              </div>
              <div>
                <p className="text-label text-text-tertiary mb-sm">Anonymous Option</p>
                <p className="text-body font-500 text-text-primary">Stay Private</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-md">
              <Button variant="primary" size="lg">
                ✉️ Mail Some Shit
              </Button>
              <Button variant="secondary" size="lg">
                Browse Collections
              </Button>
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="order-1 md:order-2 flex items-center justify-center">
            <div className="relative w-full max-w-sm aspect-square">
              {/* Animated envelope visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-surface border border-border rounded-md shadow-level-4 flex items-center justify-center animate-envelope-assemble">
                  {/* Envelope contents - stylized 📬 emoji and swirl */}
                  <div className="text-center">
                    <div className="text-7xl mb-lg">📬</div>
                    <div className="flex justify-center">
                      <svg
                        className="w-24 h-24 text-purple-primary"
                        viewBox="0 0 100 100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M50 20 Q 65 40 50 60 Q 35 40 50 20 L 50 80" />
                        <path d="M40 45 Q 50 50 60 45" opacity="0.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-primary/20 to-purple-light/20 rounded-md blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
