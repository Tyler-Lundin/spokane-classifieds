import getFilteredListings from '@/actions/listings/get-filtered-listings';
import PageContainer from '@/components/layout/page-container';
import ListingPreview from '@/components/listing/listing-preview';
import ListingFilters from '@/components/listing/listing-filters';
import { ListingType, ItemCondition } from '@/types/app.types';
import React from 'react';

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { categoryId, type, minPrice, maxPrice, condition, willTrade, city, state, search, sortBy, sortOrder } = await searchParams;
  const listings = await getFilteredListings({
    categoryId: categoryId === 'all' ? undefined : categoryId as string,
    type: type === 'all' ? undefined : type as ListingType,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    condition: condition === 'all' ? undefined : condition as ItemCondition,
    willTrade: willTrade === 'true',
    location: {
      city: city as string,
      state: state as string,
    },
    search: search as string,
    sortBy: sortBy as 'price' | 'date' | 'views',
    sortOrder: sortOrder as 'asc' | 'desc',
  });

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold pb-6 text-black dark:text-white text-center bg-white dark:bg-black">All Listings</h1>
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-64">
          <ListingFilters />
        </aside>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center items-center gap-2 bg-white dark:bg-black justify-items-center px-2">
            {listings.map((listing) => (
              <ListingPreview key={listing.id} {...listing} />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
} 