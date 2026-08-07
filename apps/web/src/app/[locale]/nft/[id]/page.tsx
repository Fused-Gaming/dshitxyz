import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'NFT Details | Dshit.xyz',
  description: 'View detailed NFT information and purchase options',
};

interface NFTDetailProps {
  params: {
    id: string;
    locale: string;
  };
}

export default function NFTDetailPage({ params }: NFTDetailProps) {
  // Mock data - in production, fetch from API
  const nft = {
    id: params.id,
    title: 'Vintage Mailbox #001',
    description: 'A pristine vintage mailbox from the early days of the postal service. This NFT represents a historically significant piece of mail delivery infrastructure.',
    longDescription: `This exclusive NFT captures the essence of postal history. The Vintage Mailbox #001 is one of the first collectibles in the Dshit.xyz postal service collection, featuring:

• Authentically scanned from original 1970s mailbox
• Blockchain verified provenance
• Limited edition (1 of 100)
• Part of the Historical Collection series
• High-resolution 4K imagery
• Transferable and tradeable

The postal service was the backbone of communication for centuries. This NFT celebrates that legacy in the digital age.`,
    image: '🖼️',
    price: 2.5,
    creator: 'PostalMaster',
    owner: 'Collector_0x123',
    rarity: 'rare',
    edition: '1 of 100',
    created: '2026-01-15',
    lastSale: '2026-08-01',
    lastSalePrice: 2.1,
    attributes: [
      { trait: 'Color', value: 'Red', rarity: '45%' },
      { trait: 'Era', value: '1970s', rarity: '12%' },
      { trait: 'Condition', value: 'Pristine', rarity: '5%' },
      { trait: 'Door Type', value: 'Curved', rarity: '23%' },
      { trait: 'Lock Mechanism', value: 'Vintage', rarity: '8%' },
      { trait: 'Post Height', value: 'Standard', rarity: '56%' },
    ],
  };

  return (
    <Container>
      <div className="py-12">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-400">
          <a href="/" className="hover:text-purple-400">Home</a>
          {' / '}
          <a href="/marketplace" className="hover:text-purple-400">Marketplace</a>
          {' / '}
          <span className="text-white">{nft.title}</span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Section */}
          <div>
            <div className="sticky top-4">
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl aspect-square flex items-center justify-center text-9xl border border-purple-600/20">
                {nft.image}
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-gray-300 font-medium hover:bg-slate-600 transition-colors text-sm">
                  Fullscreen
                </button>
                <button className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-gray-300 font-medium hover:bg-slate-600 transition-colors text-sm">
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <div className="inline-block px-3 py-1 rounded-lg bg-blue-600/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-600/50">
                RARE
              </div>
              <h1 className="text-4xl font-bold text-white mb-3">
                {nft.title}
              </h1>
              <div className="flex items-center gap-3 text-gray-400">
                <span>by</span>
                <span className="text-white font-semibold cursor-pointer hover:text-purple-400">
                  @{nft.creator}
                </span>
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
              <div className="text-sm text-gray-400 mb-2">Current Price</div>
              <div className="flex items-baseline gap-2 mb-6">
                <div className="text-4xl font-bold text-white">{nft.price}</div>
                <div className="text-lg text-gray-400">ETH</div>
              </div>

              <div className="space-y-2 mb-6 pb-6 border-b border-slate-700 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Sale Price:</span>
                  <span className="text-white font-medium">{nft.lastSalePrice} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Sale Date:</span>
                  <span className="text-white font-medium">{nft.lastSale}</span>
                </div>
              </div>

              <button className="w-full px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors mb-3">
                Place Bid
              </button>
              <button className="w-full px-6 py-3 rounded-lg bg-slate-700 text-white font-semibold hover:bg-slate-600 transition-colors">
                Buy Now
              </button>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Edition</div>
                <div className="text-lg font-semibold text-white">{nft.edition}</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Created</div>
                <div className="text-lg font-semibold text-white">{nft.created}</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Current Owner</div>
                <div className="text-lg font-semibold text-white font-mono text-sm">
                  {nft.owner}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">About this item</h2>
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
              {nft.longDescription}
            </p>
          </div>
        </div>

        {/* Attributes */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nft.attributes.map((attr, idx) => (
              <div
                key={idx}
                className="bg-slate-800 rounded-lg p-4 border border-slate-700 cursor-pointer hover:border-purple-600/50 transition-colors"
              >
                <div className="text-xs text-purple-400 font-semibold uppercase mb-2">
                  {attr.trait}
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {attr.value}
                </div>
                <div className="text-xs text-gray-500">
                  Rarity: {attr.rarity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Activity</h2>
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="divide-y divide-slate-700">
              <div className="p-4 grid grid-cols-4 gap-4 font-semibold text-sm text-gray-400 bg-slate-900/50">
                <div>Event</div>
                <div>From/To</div>
                <div>Price</div>
                <div>Date</div>
              </div>
              <div className="p-4 grid grid-cols-4 gap-4 text-sm">
                <div className="text-white">Sale</div>
                <div className="text-gray-300">Collector_0x123</div>
                <div className="text-white font-semibold">2.1 ETH</div>
                <div className="text-gray-400">Aug 1, 2026</div>
              </div>
              <div className="p-4 grid grid-cols-4 gap-4 text-sm">
                <div className="text-white">Minted</div>
                <div className="text-gray-300">PostalMaster</div>
                <div className="text-white font-semibold">—</div>
                <div className="text-gray-400">Jan 15, 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
