import { DUMMY_LISTINGS } from "@/data/listings.data";
import { Listing, ListingType, ItemCondition } from "@/types/app.types";

interface FilterParams {
  categoryId?: string;
  type?: ListingType;
  minPrice?: number;
  maxPrice?: number;
  condition?: ItemCondition;
  willTrade?: boolean;
  location?: {
    city?: string;
    state?: string;
  };
  search?: string;
  sortBy?: 'price' | 'date' | 'views';
  sortOrder?: 'asc' | 'desc';
}

export default async function getFilteredListings(params: FilterParams): Promise<Listing[]> {
  let filteredListings = [...DUMMY_LISTINGS];

  // Apply filters
  if (params.categoryId) {
    filteredListings = filteredListings.filter(listing => listing.categoryId === params.categoryId);
  }

  if (params.type) {
    filteredListings = filteredListings.filter(listing => listing.type === params.type);
  }

  if (params.minPrice !== undefined) {
    filteredListings = filteredListings.filter(listing => listing.price && listing.price >= params.minPrice!);
  }

  if (params.maxPrice !== undefined) {
    filteredListings = filteredListings.filter(listing => listing.price && listing.price <= params.maxPrice!);
  }

  if (params.condition) {
    filteredListings = filteredListings.filter(listing => listing.condition === params.condition);
  }

  if (params.willTrade !== undefined) {
    filteredListings = filteredListings.filter(listing => listing.willTrade === params.willTrade);
  }

  if (params.location?.city) {
    filteredListings = filteredListings.filter(listing => 
      listing.location.city.toLowerCase().includes(params.location!.city!.toLowerCase())
    );
  }

  if (params.location?.state) {
    filteredListings = filteredListings.filter(listing => 
      listing.location.state.toLowerCase().includes(params.location!.state!.toLowerCase())
    );
  }

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredListings = filteredListings.filter(listing =>
      listing.title.toLowerCase().includes(searchLower) ||
      listing.description.toLowerCase().includes(searchLower) ||
      listing.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Apply sorting
  if (params.sortBy) {
    filteredListings.sort((a, b) => {
      let comparison = 0;
      
      switch (params.sortBy) {
        case 'price':
          comparison = (a.price || 0) - (b.price || 0);
          break;
        case 'date':
          comparison = b.createdAt.getTime() - a.createdAt.getTime();
          break;
        case 'views':
          comparison = b.viewCount - a.viewCount;
          break;
      }

      return params.sortOrder === 'desc' ? -comparison : comparison;
    });
  }

  return filteredListings;
} 