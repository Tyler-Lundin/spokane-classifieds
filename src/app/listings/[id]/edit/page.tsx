'use client';

import { useParams } from 'next/navigation';
import CreateListingForm from '@/components/listing/create-listing-form';

export default function EditListingPage() {
  const params = useParams();
  const listingId = params.id as string;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black dark:text-white text-center md:text-left">Edit Listing</h1>
        <CreateListingForm mode="edit" listingId={listingId} />
      </div>
    </main>
  );
} 