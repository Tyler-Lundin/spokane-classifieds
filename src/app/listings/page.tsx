import getAllListings from '@/actions/listings/get-all-listings';
import PageContainer from '@/components/layout/page-container';
import ListingPreview from '@/components/listing/listing-preview';
import React from 'react';

export default async function ListingsPage() {

  const listings = await getAllListings();
  
  console.log({listings});
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold pb-6 text-black dark:text-white text-center bg-white dark:bg-black">All Listings</h1>
        <aside className="w-full md:w-64">
          {/* Filters will go here */}
        </aside>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  justify-center items-center gap-2 bg-white dark:bg-black justify-items-center">
          {listings.map((listing) => (
            <ListingPreview key={listing.id} {...listing} />
          ))}
        </div>
        </PageContainer>
  );
} 