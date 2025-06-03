import getListingById from '@/actions/listings/get-listing-by-id';
import getUserById from '@/actions/users/get-user-by-id';
import { ImageSlider } from '@/components/ui/image-slider';
import { Listing, ListingType, User } from '@/types/app.types';
import { garamond, oldStandard } from "@/app/fonts";
import Image from "next/image";
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

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
    <main className="min-h-screen bg-[#f4f1ea] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative border-2 border-black bg-white p-8 shadow-lg">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative grid">
                <div className="border border-black aspect-square relative">
                  <ImageSlider images={listing?.imageUrls || []} />
                </div>
              </div>
              <div className="space-y-6">
                <Title title={listing?.title || ""} />
                <Details listing={listing} />
                <RenderType type={listing?.type || ListingType.ITEM} />
                <ContactInfo listingUser={listingUser} />
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
    <div className={`${garamond.className} bg-[#f4f1ea] text-black text-sm font-medium px-3 py-1 border border-black inline-block`}>
      {category}
    </div>
  )
}

function Title({ title }: { title: string }) {
  return (
    <h1 className={`${oldStandard.className} text-3xl font-bold tracking-tight border-b-2 border-black pb-2`}>
      {title}
    </h1>
  )
}

function Details({ listing }: { listing?: Listing }) {
  if (!listing) return null;

  return (
    <div className={`${garamond.className} space-y-4`}>
      <div className="text-lg italic">
        {listing.description}
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-b border-black py-4">
        <div>
          <div className="text-sm uppercase tracking-wider font-bold">Price</div>
          <div className="text-xl font-bold">
            {listing.price ? `${listing.currency}${listing.price.toLocaleString()}` : 'Contact for price'}
          </div>
        </div>

        <div>
          <div className="text-sm uppercase tracking-wider font-bold">Location</div>
          <div>{listing.location.city}, {listing.location.state}</div>
        </div>

        <div>
          <div className="text-sm uppercase tracking-wider font-bold">Condition</div>
          <div>{listing.condition}</div>
        </div>

        <div>
          <div className="text-sm uppercase tracking-wider font-bold">Posted</div>
          <div>{listing.createdAt.toLocaleDateString()}</div>
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
    <div className={`${garamond.className} border-t border-black pt-4`}>
      <h2 className="text-lg font-bold uppercase tracking-wider mb-2">Contact Information</h2>
      <div className="space-y-1">
        <p className="font-bold">{listingUser.firstName} {listingUser.lastName.slice(0, 1)}.</p>
        <p>{listingUser.email}</p>
        {listingUser.phone && <p>{listingUser.phone}</p>}
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
    <div className={`${garamond.className} text-sm uppercase tracking-wider font-bold`}>
      {typeLabels[type]}
    </div>
  )
}