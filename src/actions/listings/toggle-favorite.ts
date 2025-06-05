"use server";

import { DUMMY_FAVORITES } from "@/data/favorites.data";


export async function toggleFavorite(listingId: string, userId: string) {
    // In a real application, this would make an API call to toggle the favorite
    // For now, we'll just simulate the behavior
    const existingFavorite = DUMMY_FAVORITES.find(
        fav => fav.listingId === listingId && fav.userId === userId
    );

    if (existingFavorite) {
        // Remove favorite
        const index = DUMMY_FAVORITES.findIndex(
            fav => fav.listingId === listingId && fav.userId === userId
        );
        DUMMY_FAVORITES.splice(index, 1);
        return false; // Not favorited
    } else {
        // Add favorite
        DUMMY_FAVORITES.push({
            id: Math.random().toString(),
            userId,
            listingId,
            createdAt: new Date()
        });
        return true; // Favorited
    }
} 