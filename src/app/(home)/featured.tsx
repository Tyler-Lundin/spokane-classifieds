import { getFeaturedListings } from "@/actions/listings/get-featured-listings";
import ListingPreview from "@/components/listing/listing-preview";
import Link from "next/link";
import { garamond, oldStandard } from "@/app/fonts";

export default async function HomeFeatured() {
    const featuredListings = await getFeaturedListings();
    
    return (
        <section className="py-20 px-4 border-b border-black/10 dark:border-white/10 text-black dark:text-white bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    {/* Decorative Line */}
                    <div className="w-16 h-[2px] bg-black dark:bg-white mx-auto mb-6"></div>
                    
                    <h2 className={`${oldStandard.className} text-4xl font-bold mb-4 tracking-tight`}>Featured Listings</h2>
                    <p className={`${garamond.className} text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300 italic`}>
                        Hand-picked listings from our community
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {featuredListings.map((listing) => (
                        <div key={listing.id} className="flex flex-col group">
                            <ListingPreview {...listing} />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link 
                        href="/listings?featured=true"
                        className={`${garamond.className} inline-block text-sm uppercase tracking-wider hover:underline underline-offset-4 transition-all duration-200 hover:opacity-75`}
                    >
                        View All Featured Listings →
                    </Link>
                </div>
            </div>
        </section>
    );
}