import { getMostRecentListings } from "@/actions/listings/get-most-recent-listings";
import ListingPreview from "@/components/listing/listing-preview";
import Link from "next/link";

export default async function HomeMostRecent() {
    const mostRecentListings = await getMostRecentListings({ limit: 5 });
    
    return (
        <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Latest Listings</h2>
                    <Link 
                        href="/listings"
                        className="text-sm"
                    >
                        View All Listings
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {mostRecentListings.map((listing) => (
                        <ListingPreview key={listing.id} {...listing} />
                    ))}
                </div>
            </div>
        </section>
    );
}