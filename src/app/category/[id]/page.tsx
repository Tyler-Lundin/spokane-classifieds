import getListingsByCategories from "@/actions/listings/get-listings-by-categories";
import PageContainer from "@/components/layout/page-container";
import ListingPreview from "@/components/listing/listing-preview";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CATEGORIES } from "@/data/categories.data";
import { garamond, oldStandard } from "@/app/fonts";

export default async function CategoryPage({ params }: { params: { id: string } }) {
    // Find the category by slug
    const category = CATEGORIES.find(cat => cat.slug === params.id);
    
    if (!category) {
        return (
            <PageContainer>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center py-12">
                        <p className={`${garamond.className} text-gray-500 dark:text-gray-400`}>
                            Category not found.
                        </p>
                    </div>
                </div>
            </PageContainer>
        );
    }

    const listings = await getListingsByCategories([category.id]);

    return (
        <PageContainer>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-12">
                    <Link 
                        href="/categories"
                        className={`${garamond.className} inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition-colors`}
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Categories
                    </Link>

                    {/* Decorative Line */}
                    <div className="w-16 h-[2px] bg-black dark:bg-white mb-6"></div>

                    <h1 className={`${oldStandard.className} text-4xl font-bold mb-4 tracking-tight text-black dark:text-white`}>
                        {category.name}
                    </h1>
                    <p className={`${garamond.className} text-lg text-gray-600 dark:text-gray-300 italic`}>
                        {listings.length} {listings.length === 1 ? 'listing' : 'listings'} in this category
                    </p>
                </div>

                {listings.length === 0 ? (
                    <div className="text-center py-12">
                        <p className={`${garamond.className} text-gray-500 dark:text-gray-400`}>
                            No listings found in this category.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listings.map((listing) => (
                            <ListingPreview key={listing.id} {...listing} />
                        ))}
                    </div>
                )}
            </div>
        </PageContainer>
    );
}