'use client';

import React, { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is a Digital Turd NFT?',
    answer:
      'A Digital Turd is a unique NFT that you can mint and send to any wallet address on Monad. Each turd is immutable, permanent, and hilarious.',
  },
  {
    question: 'How much does it cost to send?',
    answer:
      'All mailings cost exactly 1.00 $SHIT in fixed postage, regardless of which turd you send. No hidden fees, no surprises.',
  },
  {
    question: 'Can I send anonymously?',
    answer:
      'Yes! You can choose the "Anonymous Option" during checkout to hide your wallet address from the recipient.',
  },
  {
    question: 'What networks are supported?',
    answer:
      'Currently, dshit.xyz is built exclusively on Monad. We chose Monad for its speed, low costs, and growing ecosystem.',
  },
  {
    question: 'Are the NFTs actually minted on-chain?',
    answer:
      'Yes, every Digital Turd is minted as a real NFT on the Monad blockchain. You can verify ownership and transfer turds between wallets.',
  },
  {
    question: 'Can I get refunds?',
    answer:
      'No refunds on mailings. Once sent, a turd is immutable and permanent. This is the way.',
  },
  {
    question: 'What makes this different from other NFT platforms?',
    answer:
      'dshit.xyz is laser-focused on one thing: delivering NFTs. Fixed pricing, simple UX, on-chain delivery, and community-driven collection creation.',
  },
  {
    question: 'How do I create my own turd collection?',
    answer:
      'Check out our docs on creating collections. You can submit your designs, and if approved, they\'ll be minted and available for mailing.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-5xl bg-bg-secondary">
      <Container maxWidth="7xl">
        <div className="text-center mb-3xl">
          <h2 className="text-h2 text-text-primary font-display font-bold mb-lg">
            Frequently Asked Questions
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            Everything you need to know about mailing Digital Turds.
          </p>
        </div>

        {/* FAQ grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              hoverable
              className="cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-start justify-between gap-lg">
                <h3 className="text-h4 text-text-primary font-display font-bold">
                  {faq.question}
                </h3>
                <span className="text-text-secondary flex-shrink-0 text-lg">
                  {openIndex === index ? '−' : '+'}
                </span>
              </div>

              {openIndex === index && (
                <p className="text-body-sm text-text-secondary mt-lg pt-lg border-t border-border">
                  {faq.answer}
                </p>
              )}
            </Card>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="text-center mt-3xl">
          <p className="text-body-lg text-text-secondary mb-lg">Still have questions?</p>
          <a
            href="mailto:support@dshit.xyz"
            className="inline-block px-2xl py-lg bg-purple-primary hover:bg-purple-hover text-text-primary font-body font-500 rounded-sm transition-all duration-standard"
          >
            Contact Support
          </a>
        </div>
      </Container>
    </section>
  );
}
