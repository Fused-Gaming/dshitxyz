import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Profile | Dshit.xyz',
  description: 'Manage your account and collection',
};

interface UserProfile {
  name: string;
  handle: string;
  email: string;
  avatar: string;
  bio: string;
  website: string;
  twitter: string;
  collectionCount: number;
  followerCount: number;
  followingCount: number;
  joinDate: string;
}

const mockProfile: UserProfile = {
  name: 'Postal Enthusiast',
  handle: 'collector_0x123',
  email: 'collector@example.com',
  avatar: '👤',
  bio: 'Web3 postal service collector and historian',
  website: 'https://example.com',
  twitter: '@postal_collector',
  collectionCount: 24,
  followerCount: 1250,
  followingCount: 342,
  joinDate: '2026-01-15',
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState<'collection' | 'settings' | 'activity'>('collection');

  return (
    <Container>
      <div className="py-12">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end mb-8">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center text-8xl border-4 border-slate-800">
              {mockProfile.avatar}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {mockProfile.name}
              </h1>
              <div className="text-lg text-gray-400 mb-4">
                @{mockProfile.handle}
              </div>
              <p className="text-gray-300 mb-4 max-w-xl">
                {mockProfile.bio}
              </p>

              {/* Social Links */}
              <div className="flex gap-4 mb-6 flex-wrap">
                <a
                  href={mockProfile.website}
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Website
                </a>
                <a
                  href={`https://twitter.com/${mockProfile.twitter.slice(1)}`}
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  {mockProfile.twitter}
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                <button className="px-6 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors">
                  Follow
                </button>
                <button className="px-6 py-2 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-600 transition-colors">
                  Message
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {mockProfile.collectionCount}
              </div>
              <div className="text-sm text-gray-400">Items</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {mockProfile.followerCount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {mockProfile.followingCount}
              </div>
              <div className="text-sm text-gray-400">Following</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                2.5Ξ
              </div>
              <div className="text-sm text-gray-400">Floor</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-700 mb-8">
          <div className="flex gap-8 overflow-x-auto">
            {(['collection', 'settings', 'activity'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-semibold capitalize border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-white border-purple-600'
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'collection' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">My Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="group rounded-xl overflow-hidden bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer"
                >
                  <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center text-5xl">
                    🖼️
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-1">Collectible #{item}</h3>
                    <div className="text-sm text-gray-400">2.5 ETH</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-8">Settings</h2>

            {/* Account Settings */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
              <h3 className="text-lg font-semibold text-white mb-6">Account</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    defaultValue={mockProfile.name}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    defaultValue={mockProfile.bio}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    defaultValue={mockProfile.website}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
              <h3 className="text-lg font-semibold text-white mb-6">Security</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-colors text-left font-medium">
                  Change Password
                </button>
                <button className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-colors text-left font-medium">
                  Enable 2FA
                </button>
                <button className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-colors text-left font-medium">
                  Connected Wallets
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button className="w-full px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors">
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'activity' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Activity</h2>
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="divide-y divide-slate-700">
                <div className="p-4 grid grid-cols-4 gap-4 font-semibold text-sm text-gray-400 bg-slate-900/50">
                  <div>Event</div>
                  <div>Item</div>
                  <div>Amount</div>
                  <div>Time</div>
                </div>
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-4 grid grid-cols-4 gap-4 text-sm hover:bg-slate-700/50">
                    <div className="text-white">Purchase</div>
                    <div className="text-gray-300">Collectible #{item}</div>
                    <div className="text-white font-semibold">2.5 ETH</div>
                    <div className="text-gray-400">2 days ago</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
