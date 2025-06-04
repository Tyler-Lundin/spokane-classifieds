import { DUMMY_LISTINGS } from "@/data/listings.data";


export default async function getListingById(id: string) {

    // TODO: Replace with actual database call
    return DUMMY_LISTINGS.find((listing) => listing.id === id);
}