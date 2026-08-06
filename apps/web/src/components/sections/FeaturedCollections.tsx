import React from 'react';
import { Container } from '@/components/layout/Container';
import { Card, CardBody, Badge } from '@/components/ui';

const collections = [
  {
    id: 1,
    name: 'Classic Turds',
    emoji: '💜',
    floor: '0.88',
    volume: '12,420',
    description: 'The original Digital Turds that started it all.',
  },
  {
    id: 2,
    name: 'Golden Turds',
    emoji: '✨',
    floor: '1.88',
    volume: '8,231',
    description: 'Rare, limited edition Golden edition collectibles.',
    badge: 'Rare',
  },
  {
    id: 3,
    name: 'Flaming Turds',
    emoji: '🔥',
    floor: '3.00',
    volume: '5,991',
    description: 'Hot and spicy turds with fiery effects.',
    badge: 'Hot',
  },
  {
    id: 4,
    name: 'Nuclear Turds',
    emoji: '☢️',
    floor: '25.00',
    volume: '3,112',
    description: 'Ultra-rare nuclear-powered turds.',
    badge: 'Legendary',
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-5xl bg-bg-primary">
      <Container maxWidth="7xl">
        <div className="flex items-center justify-between mb-3xl">
          <div>
            <h2 className="text-h2 text-text-primary font-display font-bold mb-md">
              Featured Collections
            </h2>
            <p className="text-body-lg text-text-secondary">
              Curated Digital Turd NFTs to mail to your friends.
            </p>
          </div>
          <button className="text-purple-primary hover:text-purple-hover font-body font-500 transition-colors">
            View All →
          </button>
        </div>

        {/* Collections grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl">
          {collections.map((collection) => (
            <Card key={collection.id} hoverable>
              <CardBody>
                <div className="flex items-start justify-between mb-lg">
                  <div className="text-4xl">{collection.emoji}</div>
                  {collection.badge && (
                    <Badge variant="purple" size="sm">
                      {collection.badge}
                    </Badge>
                  )}
                </div>

                <h3 className="text-h4 text-text-primary font-display font-bold mb-sm">
                  {collection.name}
                </h3>
                <p className="text-body-sm text-text-secondary mb-xl">
                  {collection.description}
                </p>

                {/* Stats */}
                <div className="flex gap-xl pt-lg border-t border-border">
                  <div>
                    <p className="text-label text-text-tertiary mb-xs">Floor</p>
                    <p className="text-body font-500 text-text-primary font-mono">
                      {collection.floor} SHIT
                    </p>
                  </div>
                  <div>
                    <p className="text-label text-text-tertiary mb-xs">Volume</p>
                    <p className="text-body font-500 text-text-primary font-mono">
                      {collection.volume}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
