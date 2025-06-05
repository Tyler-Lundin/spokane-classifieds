'use client';

import { useState } from 'react';
import { toggleFavorite } from '@/actions/listings/toggle-favorite';

interface FavoriteButtonProps {
    listingId: string;
    userId: string;
    initialIsFavorited: boolean;
}

export default function FavoriteButton({ listingId, userId, initialIsFavorited }: FavoriteButtonProps) {
    const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        e.stopPropagation(); // Prevent event bubbling
        
        if (isLoading) return;
        
        setIsLoading(true);
        try {
            const newState = await toggleFavorite(listingId, userId);
            setIsFavorited(newState);
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors z-10 ${
                isFavorited 
                    ? 'text-yellow-500 hover:text-yellow-600' 
                    : 'text-gray-400 hover:text-gray-500'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
            <svg 
                className="w-6 h-6" 
                fill={isFavorited ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
            </svg>
        </button>
    );
} 