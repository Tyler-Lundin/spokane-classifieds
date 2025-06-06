'use client';

import { useParams } from 'next/navigation';
import CreateListingForm from '@/components/listing/create-listing-form';
import { PageHeader } from '@/components/ui/PageHeader';
import PageContainer from '@/components/layout/page-container';

export default function EditListingPage() {
  const params = useParams();
  const listingId = params.id as string;

  return (
    <PageContainer>
      <PageHeader title="Edit Listing" />
      <div className="max-w-2xl mx-auto">
        <CreateListingForm mode="edit" listingId={listingId} />
      </div>
    </PageContainer>
  );
} 