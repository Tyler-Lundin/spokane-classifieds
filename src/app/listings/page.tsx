import getAllListings from '@/actions/listings/get-all-listings';
import PageContainer from '@/components/layout/page-container';
import ListingPreview from '@/components/listing/listing-preview';
import React from 'react';

export default async function ListingsPage() {

  const listings = await getAllListings();
  
  console.log({listings});
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">All Listings</h1>
        <aside className="w-full md:w-64">
          {/* Filters will go here */}
        </aside>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  justify-center items-center gap-2 lg:gap-8 justify-items-center">
          {listings.map((listing) => (
            <ListingPreview key={listing.id} {...listing} />
          ))}
        </div>
        </PageContainer>
  );
} 