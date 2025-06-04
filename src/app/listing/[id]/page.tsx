import getListingById from '@/actions/listings/get-listing-by-id';
import getUserById from '@/actions/users/get-user-by-id';
import { ImageSlider } from '@/components/ui/image-slider';
import { Listing, ListingType, User } from '@/types/app.types';
import { garamond, oldStandard } from "@/app/fonts";
import Image from "next/image";
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Listing
// export interface Listing {
//   id: string;
//   userId: string;
//   categoryId: string;
//   title: string;
//   type: ListingType;
//   willTrade?: boolean;
//   tradeFor?: string | null;
//   description: string;
//   price: number | null;
//   currency: string;
//   imageUrls: string[];
//   location: Location;
//   status: ListingStatus;
//   condition: ItemCondition;
//   tags?: string[];
//   viewCount: number;
//   createdAt: Date;
//   updatedAt: Date;
// }


export default async function ListingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const listing = await getListingById(id);
  const listingUser = listing?.userId ? await getUserById(listing.userId) : null;

  return (
    <main className="min-h-screen bg-[#f4f1ea] dark:bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/categories"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Categories
        </Link>

        <div className="relative border-2 border-black dark:border-white bg-white dark:bg-black shadow-lg">
          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/images/paper-texture.webp"
              alt="Paper Texture"
              fill
              className="object-cover mix-blend-multiply"
            />
          </div>

          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Section */}
              <div className="relative border-r border-black dark:border-white">
                <div className="sticky top-0">
                  <div className="aspect-square relative">
                    <ImageSlider images={listing?.imageUrls || []} />
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 space-y-8">
                <div className="space-y-6">
                  <Title title={listing?.title || ""} />
                  <RenderType type={listing?.type || ListingType.ITEM} />
                  <Details listing={listing} />
                  <ContactInfo listingUser={listingUser} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <div className={`${garamond.className} bg-[#f4f1ea] dark:bg-gray-800 text-black dark:text-white text-sm font-medium px-3 py-1 border border-black dark:border-white inline-block`}>
      {category}
    </div>
  )
}

function Title({ title }: { title: string }) {
  return (
    <h1 className={`${oldStandard.className} text-4xl font-bold tracking-tight border-b-2 border-black dark:border-white pb-4 text-black dark:text-white`}>
      {title}
    </h1>
  )
}

function Details({ listing }: { listing?: Listing }) {
  if (!listing) return null;

  return (
    <div className={`${garamond.className} space-y-6 text-black dark:text-white`}>
      <div className="text-lg italic leading-relaxed">
        {listing.description}
      </div>

      <div className="grid grid-cols-2 gap-6 border-t border-b border-black dark:border-white py-6">
        <div>
          <div className="text-sm uppercase tracking-wider font-bold mb-1">Price</div>
          <div className="text-2xl font-bold">
            {listing.price ? `${listing.currency}${listing.price.toLocaleString()}` : 'Contact for price'}
          </div>
        </div>

        <div>
          <div className="text-sm uppercase tracking-wider font-bold mb-1">Location</div>
          <div className="text-lg">{listing.location.city}, {listing.location.state}</div>
        </div>

        <div>
          <div className="text-sm uppercase tracking-wider font-bold mb-1">Condition</div>
          <div className="text-lg">{listing.condition}</div>
        </div>

        <div>
          <div className="text-sm uppercase tracking-wider font-bold mb-1">Posted</div>
          <div className="text-lg">{listing.createdAt.toLocaleDateString()}</div>
        </div>
      </div>

      {listing.tags && listing.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {listing.tags.map((tag, index) => (
            <CategoryBadge key={index} category={tag} />
          ))}
        </div>
      )}
    </div>
  )
}

function ContactInfo({ listingUser }: { listingUser?: User | null }) {
  if (!listingUser) return null;

  return (
    <div className={`${garamond.className} border-t border-black dark:border-white pt-6 text-black dark:text-white`}>
      <h2 className="text-xl font-bold uppercase tracking-wider mb-4">Contact Information</h2>
      <div className="space-y-2">
        <p className="text-lg font-bold">{listingUser.firstName} {listingUser.lastName.slice(0, 1)}.</p>
        <p className="text-lg">{listingUser.email}</p>
        {listingUser.phone && <p className="text-lg">{listingUser.phone}</p>}
      </div>
    </div>
  )
}

function RenderType({ type }: { type: ListingType }) {
  const typeLabels: Record<ListingType, string> = {
    [ListingType.ITEM]: "Item for Sale",
    [ListingType.VEHICLE]: "Vehicle Listing",
    [ListingType.JOB]: "Job Opportunity",
    [ListingType.HOUSING]: "Housing",
    [ListingType.SERVICE]: "Service",
    [ListingType.OTHER]: "Other",
  };

  return (
    <div className={`${garamond.className} text-sm uppercase tracking-wider font-bold text-gray-600 dark:text-gray-300`}>
      {typeLabels[type]}
    </div>
  )
}