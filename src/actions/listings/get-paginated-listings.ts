import { DUMMY_LISTINGS } from "@/data/listings.data";


export async function getPaginatedListings(page: string, 
    // category: string, 
    // search: string, 
    // sort: string, 
    // order: string,
    // minPrice: string,
    // maxPrice: string,
    // condition: string,
    // willTrade: string
) {
    return DUMMY_LISTINGS.slice((Number(page) - 1) * 10, Number(page) * 10);
}