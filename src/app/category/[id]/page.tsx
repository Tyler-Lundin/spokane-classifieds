import getListingsByCategories from "@/actions/listings/get-listings-by-categories";
import PageContainer from "@/components/layout/page-container";
import ListingPreview from "@/components/listing/listing-preview";


export default async function CategoryPage({ params }: { params: { id: string } }) {
    const listings = await getListingsByCategories([params.id]);


    return (
        <PageContainer>
            <h1>Category: {params.id}</h1>
            {listings.map((listing) => (
                <ListingPreview key={listing.id} {...listing} />
            ))}
        </PageContainer>
    )
}