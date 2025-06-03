import { DUMMY_LISTINGS } from "@/data/placeholder.data";
import { Listing } from "@/types/app.types";


export default async function getListingsByCategories(categories: string[]): Promise<Listing[]> {
    return Promise.resolve(DUMMY_LISTINGS.filter((listing) => {}));
}