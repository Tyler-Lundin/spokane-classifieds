import React from 'react';
import CreateListingForm from '@/components/listing/create-listing-form';


export default function PostListingPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black dark:text-white text-center md:text-left">Post a New Listing</h1>
        <CreateListingForm />
      </div>
    </main>
  );
} 