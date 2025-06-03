import { getFeaturedListings } from "@/actions/listings/get-featured-listings";
import ListingPreview from "@/components/listing/listing-preview";
import Link from "next/link";

export default async function HomeFeatured() {
    const featuredListings = await getFeaturedListings();
    
    return (
        <section className="py-16 px-4 border-b border-black/10 dark:border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Featured Listings</h2>
                    <p className="text-lg max-w-2xl mx-auto">
                        Hand-picked listings from our community
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredListings.map((listing) => (
                        <div key={listing.id} className="flex flex-col">
                            <ListingPreview {...listing} />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link 
                        href="/listings?featured=true"
                        className="text-sm"
                    >
                        View All Featured Listings
                    </Link>
                </div>
            </div>
        </section>
    );
}