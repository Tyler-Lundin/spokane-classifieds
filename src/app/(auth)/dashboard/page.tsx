'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DUMMY_LISTINGS } from '@/data/listings.data';
import { ListingStatus, ListingAnalytics, ViewSource, DeviceType } from '@/types/app.types';
import ConfirmationModal from '@/components/ui/confirmation-modal';
import deleteListing from '@/actions/listings/delete-listing';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'saved' | 'analytics'>('overview');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<string | null>(null);
  const router = useRouter();

  // Filter active listings for the current user (using userId "1" for now)
  const userListings = DUMMY_LISTINGS.filter(listing => listing.userId === "1");
  
  // For now, we'll use the first few listings as saved listings
  const savedListings = DUMMY_LISTINGS.slice(0, 2);

  // Mock analytics data for demonstration
  const mockAnalytics: ListingAnalytics = {
    id: '1',
    listingId: '1',
    views: {
      total: 150,
      unique: 120,
      byDate: [
        { date: new Date('2024-03-01'), count: 25, uniqueCount: 20 },
        { date: new Date('2024-03-02'), count: 30, uniqueCount: 25 },
        { date: new Date('2024-03-03'), count: 35, uniqueCount: 30 },
      ],
      bySource: [
        { source: ViewSource.SEARCH, count: 60, uniqueCount: 50 },
        { source: ViewSource.CATEGORY, count: 40, uniqueCount: 35 },
        { source: ViewSource.DIRECT, count: 50, uniqueCount: 35 },
      ],
      byDevice: [
        { device: DeviceType.MOBILE, count: 80, uniqueCount: 65 },
        { device: DeviceType.DESKTOP, count: 60, uniqueCount: 50 },
        { device: DeviceType.TABLET, count: 10, uniqueCount: 5 },
      ],
    },
    saves: {
      total: 15,
      byDate: [
        { date: new Date('2024-03-01'), count: 5 },
        { date: new Date('2024-03-02'), count: 7 },
        { date: new Date('2024-03-03'), count: 3 },
      ],
      activeUsers: 12,
    },
    engagement: {
      messageCount: 25,
      uniqueMessagers: 15,
      averageResponseTime: 45,
      byDate: [
        { date: new Date('2024-03-01'), messageCount: 8, uniqueMessagers: 5 },
        { date: new Date('2024-03-02'), messageCount: 10, uniqueMessagers: 7 },
        { date: new Date('2024-03-03'), messageCount: 7, uniqueMessagers: 3 },
      ],
    },
    performance: {
      conversionRate: 16.7,
      averageViewDuration: 120,
      bounceRate: 35,
      lastUpdated: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const handleDeleteClick = (listingId: string) => {
    setListingToDelete(listingId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (listingToDelete) {
      const success = await deleteListing(listingToDelete);
      if (success) {
        // Refresh the page to show updated listings
        router.refresh();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Dashboard
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link
              href="/listings/new"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create New Listing
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`${
                activeTab === 'listings'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Listings
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`${
                activeTab === 'saved'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              Saved Listings
            </button>
              <button
              onClick={() => setActiveTab('analytics')}
              className={`${
                activeTab === 'analytics'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
              >
              Analytics
              </button>
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Quick Stats */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Active Listings</dt>
                        <dd className="text-lg font-medium text-gray-900">{userListings.length}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Saved Listings</dt>
                        <dd className="text-lg font-medium text-gray-900">{savedListings.length}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Views</dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {userListings.reduce((sum, listing) => sum + (listing.viewCount || 0), 0)}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
              <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {userListings.map((listing) => (
                    <li key={listing.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <Image 
                                className="h-10 w-10 rounded-full object-cover" 
                                src={listing.imageUrls[0] || '/images/placeholder.jpg'} 
                                alt={listing.title}
                                width={40}
                                height={40}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-indigo-600">{listing.title}</div>
                              <div className="text-sm text-gray-500">{listing.type}</div>
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              listing.status === ListingStatus.ACTIVE ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {listing.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="mt-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {userListings.map((listing) => (
                  <li key={listing.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <Image 
                              className="h-12 w-12 rounded-lg object-cover" 
                              src={listing.imageUrls[0] || '/images/placeholder.jpg'} 
                              alt={listing.title}
                              width={48}
                              height={48}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-indigo-600">{listing.title}</div>
                            <div className="text-sm text-gray-500">
                              {listing.price ? `$${listing.price.toFixed(2)}` : 'Contact for price'}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">{listing.viewCount}</span> views
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">{listing.featured ? 'Featured' : 'Not Featured'}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Link href={`/listings/${listing.id}/edit`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                            <button 
                              onClick={() => handleDeleteClick(listing.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Saved Listings Tab */}
        {activeTab === 'saved' && (
          <div className="mt-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {savedListings.map((listing) => (
                  <li key={listing.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <Image 
                              className="h-12 w-12 rounded-lg object-cover" 
                              src={listing.imageUrls[0] || '/images/placeholder.jpg'} 
                              alt={listing.title}
                              width={48}
                              height={48}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-indigo-600">{listing.title}</div>
                            <div className="text-sm text-gray-500">
                              {listing.price ? `$${listing.price.toFixed(2)}` : 'Contact for price'}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">{listing.viewCount}</span> views
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">{listing.featured ? 'Featured' : 'Not Featured'}</span>
                          </div>
                          <button className="text-red-600 hover:text-red-900">Remove</button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Views Overview */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Views</dt>
                        <dd className="text-lg font-medium text-gray-900">{mockAnalytics.views.total}</dd>
                        <dt className="text-sm font-medium text-gray-500 truncate mt-2">Unique Views</dt>
                        <dd className="text-lg font-medium text-gray-900">{mockAnalytics.views.unique}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Saves Overview */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Saves</dt>
                        <dd className="text-lg font-medium text-gray-900">{mockAnalytics.saves.total}</dd>
                        <dt className="text-sm font-medium text-gray-500 truncate mt-2">Active Users</dt>
                        <dd className="text-lg font-medium text-gray-900">{mockAnalytics.saves.activeUsers}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engagement Overview */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Messages</dt>
                        <dd className="text-lg font-medium text-gray-900">{mockAnalytics.engagement.messageCount}</dd>
                        <dt className="text-sm font-medium text-gray-500 truncate mt-2">Unique Messagers</dt>
                        <dd className="text-lg font-medium text-gray-900">{mockAnalytics.engagement.uniqueMessagers}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="mt-8">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <dt className="text-sm font-medium text-gray-500 truncate">Conversion Rate</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{mockAnalytics.performance.conversionRate}%</dd>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <dt className="text-sm font-medium text-gray-500 truncate">Avg. View Duration</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{mockAnalytics.performance.averageViewDuration}s</dd>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <dt className="text-sm font-medium text-gray-500 truncate">Bounce Rate</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{mockAnalytics.performance.bounceRate}%</dd>
                  </div>
                </div>
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="mt-8">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Traffic Sources</h3>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {mockAnalytics.views.bySource.map((source) => (
                      <div key={source.source} className="bg-gray-50 p-4 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">{source.source}</dt>
                        <dd className="mt-1 text-2xl font-semibold text-gray-900">{source.count}</dd>
                        <dd className="text-sm text-gray-500">({source.uniqueCount} unique)</dd>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Device Breakdown */}
            <div className="mt-8">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Device Breakdown</h3>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {mockAnalytics.views.byDevice.map((device) => (
                      <div key={device.device} className="bg-gray-50 p-4 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">{device.device}</dt>
                        <dd className="mt-1 text-2xl font-semibold text-gray-900">{device.count}</dd>
                        <dd className="text-sm text-gray-500">({device.uniqueCount} unique)</dd>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setListingToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
          title="Delete Listing"
          message="Are you sure you want to delete this listing? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
} 