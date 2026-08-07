import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Marketplace | Dshit.xyz',
  description: 'Browse and collect postal service NFTs',
};

interface NFTCard {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  creator: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  sold: boolean;
}

const mockNFTs: NFTCard[] = [
  {
    id: '1',
    title: 'Vintage Mailbox #001',
    description: 'Classic red mailbox from the early postal era',
    image: '/nft/mailbox-001.jpg',
    price: 2.5,
    creator: 'PostalMaster',
    rarity: 'rare',
    sold: false,
  },
  {
    id: '2',
    title: 'Golden Envelope Series',
    description: 'Rare golden envelope with special delivery marks',
    image: '/nft/envelope-gold-001.jpg',
    price: 5.0,
    creator: 'EnvelopeArtist',
    rarity: 'epic',
    sold: true,
  },
  {
    id: '3',
    title: 'Stamp Collection Alpha',
    description: 'Set of vintage international stamps',
    image: '/nft/stamps-alpha.jpg',
    price: 1.75,
    creator: 'StampCollector',
    rarity: 'uncommon',
    sold: false,
  },
  {
    id: '4',
    title: 'Postmark History',
    description: 'Historical postmark from 1892',
    image: '/nft/postmark-1892.jpg',
    price: 3.2,
    creator: 'HistorianBot',
    rarity: 'rare',
    sold: false,
  },
];

const rarityColors: Record<NFTCard['rarity'], string> = {
  common: 'bg-slate-600',
  uncommon: 'bg-green-600',
  rare: 'bg-blue-600',
  epic: 'bg-purple-600',
  legendary: 'bg-yellow-600',
};

export default function MarketplacePage() {
  return (
    <Container>
      <div className="py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
            Postal Service Collection
          </h1>
          <p className="text-lg text-gray-400">
            Discover and collect unique NFTs from the digital postal ecosystem
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors">
            All Items
          </button>
          <button className="px-4 py-2 rounded-lg bg-slate-700 text-gray-300 font-medium hover:bg-slate-600 transition-colors">
            On Sale
          </button>
          <button className="px-4 py-2 rounded-lg bg-slate-700 text-gray-300 font-medium hover:bg-slate-600 transition-colors">
            Rare
          </button>
          <button className="px-4 py-2 rounded-lg bg-slate-700 text-gray-300 font-medium hover:bg-slate-600 transition-colors">
            Recently Added
          </button>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockNFTs.map((nft) => (
            <div
              key={nft.id}
              className="group rounded-xl overflow-hidden bg-slate-800 hover:bg-slate-700 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-purple-500/20"
              role="link"
              tabIndex={0}
              aria-label={`NFT: ${nft.title}`}
            >
              {/* Image Container */}
              <div className="relative h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  {/* Placeholder for NFT image */}
                  <div className="text-center">
                    <div className="text-3xl mb-2">🖼️</div>
                    <span className="text-sm">{nft.title}</span>
                  </div>
                </div>

                {/* Rarity Badge */}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${rarityColors[nft.rarity]} uppercase`}>
                  {nft.rarity}
                </div>

                {/* Sold Overlay */}
                {nft.sold && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">SOLD</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
                  {nft.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                  {nft.description}
                </p>

                {/* Creator */}
                <div className="text-xs text-gray-500 mb-3">
                  by <span className="text-gray-300">{nft.creator}</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                  <div>
                    <div className="text-xs text-gray-500">Price</div>
                    <div className="text-lg font-bold text-white">
                      {nft.price} ETH
                    </div>
                  </div>
                  <button
                    disabled={nft.sold}
                    className="px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle purchase
                    }}
                  >
                    {nft.sold ? 'Sold' : 'Buy'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-600 transition-colors">
            Load More Items
          </button>
        </div>
      </div>
    </Container>
  );
}
