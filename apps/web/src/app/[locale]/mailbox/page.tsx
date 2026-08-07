import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Mailbox | Dshit.xyz',
  description: 'Track your postal service deliveries',
};

interface DeliveryItem {
  id: string;
  title: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'failed';
  date: string;
  trackingId: string;
  estimatedDelivery: string;
  nftPreview: string;
}

const mockDeliveries: DeliveryItem[] = [
  {
    id: '1',
    title: 'Vintage Mailbox #001',
    status: 'delivered',
    date: '2026-08-05',
    trackingId: 'DSHIT-2026-08-001',
    estimatedDelivery: '2026-08-05',
    nftPreview: '🖼️',
  },
  {
    id: '2',
    title: 'Golden Envelope Series',
    status: 'shipped',
    date: '2026-08-07',
    trackingId: 'DSHIT-2026-08-002',
    estimatedDelivery: '2026-08-10',
    nftPreview: '✉️',
  },
  {
    id: '3',
    title: 'Stamp Collection Alpha',
    status: 'processing',
    date: '2026-08-07',
    trackingId: 'DSHIT-2026-08-003',
    estimatedDelivery: '2026-08-12',
    nftPreview: '🎫',
  },
  {
    id: '4',
    title: 'Postmark History',
    status: 'pending',
    date: '2026-08-08',
    trackingId: 'DSHIT-2026-08-004',
    estimatedDelivery: 'Pending',
    nftPreview: '📮',
  },
];

const statusConfig: Record<DeliveryItem['status'], { color: string; label: string; icon: string }> = {
  pending: { color: 'bg-gray-600', label: 'Pending', icon: '⏳' },
  processing: { color: 'bg-yellow-600', label: 'Processing', icon: '⚙️' },
  shipped: { color: 'bg-blue-600', label: 'Shipped', icon: '📦' },
  delivered: { color: 'bg-green-600', label: 'Delivered', icon: '✓' },
  failed: { color: 'bg-red-600', label: 'Failed', icon: '✗' },
};

export default function MailboxPage() {
  const deliveredCount = mockDeliveries.filter((d) => d.status === 'delivered').length;
  const inTransitCount = mockDeliveries.filter((d) => ['processing', 'shipped'].includes(d.status)).length;

  return (
    <Container>
      <div className="py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
            Your Mailbox
          </h1>
          <p className="text-lg text-gray-400">
            Track your postal service NFT deliveries
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="text-sm text-gray-400 mb-2">Total Items</div>
            <div className="text-3xl font-bold text-white">
              {mockDeliveries.length}
            </div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="text-sm text-gray-400 mb-2">Delivered</div>
            <div className="text-3xl font-bold text-green-400">
              {deliveredCount}
            </div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="text-sm text-gray-400 mb-2">In Transit</div>
            <div className="text-3xl font-bold text-blue-400">
              {inTransitCount}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex gap-2 flex-wrap">
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors">
            All
          </button>
          <button className="px-4 py-2 rounded-lg bg-slate-700 text-gray-300 font-medium hover:bg-slate-600 transition-colors">
            Delivered
          </button>
          <button className="px-4 py-2 rounded-lg bg-slate-700 text-gray-300 font-medium hover:bg-slate-600 transition-colors">
            In Transit
          </button>
          <button className="px-4 py-2 rounded-lg bg-slate-700 text-gray-300 font-medium hover:bg-slate-600 transition-colors">
            Pending
          </button>
        </div>

        {/* Delivery List */}
        <div className="space-y-4">
          {mockDeliveries.map((delivery) => {
            const statusInfo = statusConfig[delivery.status];
            return (
              <div
                key={delivery.id}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* NFT Preview */}
                  <div className="md:col-span-2">
                    <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center text-4xl">
                      {delivery.nftPreview}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {delivery.title}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-400">
                      <div>Tracking: <span className="text-gray-300 font-mono">{delivery.trackingId}</span></div>
                      <div>Ordered: {delivery.date}</div>
                    </div>
                  </div>

                  {/* Status & Timeline */}
                  <div className="md:col-span-3">
                    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${statusInfo.color} text-white font-medium mb-2`}>
                      <span>{statusInfo.icon}</span>
                      {statusInfo.label}
                    </div>
                    <div className="text-sm text-gray-400">
                      Delivery: <span className="text-gray-300">{delivery.estimatedDelivery}</span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="md:col-span-3 text-right">
                    <button className="px-4 py-2 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 transition-colors font-medium border border-purple-600/50">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                      style={{
                        width: delivery.status === 'delivered' ? '100%' :
                               delivery.status === 'shipped' ? '75%' :
                               delivery.status === 'processing' ? '50%' : '25%',
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Pending</span>
                    <span>Processing</span>
                    <span>Shipped</span>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State Helper */}
        <div className="mt-12 p-8 rounded-xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-600/20 text-center">
          <p className="text-gray-300">
            New to the postal service? <a href="/marketplace" className="text-purple-400 hover:text-purple-300 font-semibold">Browse the marketplace</a> to start collecting.
          </p>
        </div>
      </div>
    </Container>
  );
}
