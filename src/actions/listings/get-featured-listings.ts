"use server";

import { DUMMY_LISTINGS } from "@/data/listings.data";
import { Listing } from "@/types/app.types";


export async function getFeaturedListings(): Promise<Listing[]> {

    return Promise.resolve(DUMMY_LISTINGS.filter((listing) => listing.featured).sort((b,a)=> (a.featuredStrength ?? 0) - (b.featuredStrength ?? 0)).slice(0, 3));
}