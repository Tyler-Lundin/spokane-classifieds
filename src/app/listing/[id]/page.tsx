import { notFound } from 'next/navigation';
import { DUMMY_LISTINGS } from '@/data/listings.data';
import { ImageSlider } from '@/components/ui/image-slider';
import { Button } from '@/components/ui/button';
import { HeartIcon, Share2Icon, FlagIcon } from 'lucide-react';
import PageContainer from '@/components/layout/page-container';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ListingPage(props: PageProps) {
  const { id } = await props.params;
  const listing = DUMMY_LISTINGS.find((l) => l.id === id);

  if (!listing) {
    notFound();
  }

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white dark:bg-black p-4 rounded-lg">
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <ImageSlider images={listing.imageUrls} />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-black dark:text-white">{listing.title}</h1>
              <p className="mt-2 text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
                {formatPrice(listing.price)}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon"><HeartIcon className="h-5 w-5" /></Button>
              <Button variant="outline" size="icon"><Share2Icon className="h-5 w-5" /></Button>
              <Button variant="outline" size="icon"><FlagIcon className="h-5 w-5" /></Button>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h2 className="text-lg font-medium text-black dark:text-white">Description</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{listing.description}</p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h2 className="text-lg font-medium text-black dark:text-white">Details</h2>
              <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Condition</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{listing.condition}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{listing.type}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {typeof listing.location === 'string' 
                      ? listing.location 
                      : `${listing.location.city}, ${listing.location.state}`}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Posted</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <Button className="w-full">Contact Seller</Button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

function formatPrice(price: number | null | undefined) {
  if (price === null || price === undefined) return 'Contact for price';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
