'use client';

import CreateListingForm from '@/components/listing/create-listing-form';

export default function NewListingPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <CreateListingForm />
      </div>
    </main>
  );
} 