import React from 'react';
import { Container } from '@/components/layout/Container';
import { Stepper } from '@/components/ui';

const steps = [
  {
    label: 'Choose',
    description: 'Pick the perfect Digital Turd NFT from our collections.',
  },
  {
    label: 'Recipient',
    description: 'Enter the wallet address of your lucky recipient.',
  },
  {
    label: 'Delivery',
    description: 'Choose delivery type and pay fixed postage.',
  },
  {
    label: 'Review',
    description: 'Review your order and confirm before sending.',
  },
  {
    label: 'Pay',
    description: 'Approve the transaction in your wallet.',
  },
  {
    label: 'Mint',
    description: 'We mint your Turd NFT to their wallet.',
  },
  {
    label: 'Deliver',
    description: "It's delivered to their wallet on-chain.",
  },
  {
    label: 'Receipt',
    description: 'You get a proof of delivery receipt.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-5xl bg-bg-secondary">
      <Container maxWidth="7xl">
        <div className="text-center mb-3xl">
          <h2 className="text-h2 text-text-primary font-display font-bold mb-lg">
            How It Works
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            8 simple steps to send the perfect Digital Turd to anyone on Monad. It's fast,
            immutable, and hilarious.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2xl">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step number and content */}
              <div className="flex flex-col">
                <div
                  className="w-3xl h-3xl rounded-full bg-purple-primary text-text-primary font-display font-bold text-lg flex items-center justify-center mb-lg"
                  style={{ fontSize: '18px' }}
                >
                  {index + 1}
                </div>
                <h3 className="text-h4 text-text-primary font-display font-bold mb-sm">
                  {step.label}
                </h3>
                <p className="text-body-sm text-text-secondary">{step.description}</p>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-2xl -right-2xl w-2xl h-px bg-border" />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-3xl">
          <p className="text-body-lg text-text-secondary mb-lg">
            Ready to become a digital mail carrier?
          </p>
          <button className="px-2xl py-lg bg-purple-primary hover:bg-purple-hover text-text-primary font-body font-500 rounded-sm transition-all duration-standard">
            Start Mailing →
          </button>
        </div>
      </Container>
    </section>
  );
}
