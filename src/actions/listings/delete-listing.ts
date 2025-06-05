import { DUMMY_LISTINGS } from "@/data/listings.data";

export default async function deleteListing(listingId: string) {
    // In a real application, this would make an API call to delete the listing
    // For now, we'll just simulate a successful deletion
    const index = DUMMY_LISTINGS.findIndex(listing => listing.id === listingId);
    if (index !== -1) {
        DUMMY_LISTINGS.splice(index, 1);
        return true;
    }
    return false;
} 