import { DUMMY_LISTINGS } from "@/data/listings.data";
import { Listing } from "@/types/app.types";




export async function getMostRecentListings({ limit = 10 }: { limit?: number }): Promise<Listing[]> {
    return Promise.resolve(DUMMY_LISTINGS.slice(0, limit));
}