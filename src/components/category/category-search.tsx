"use client";

import { Category } from "@/types/app.types";
import { garamond } from "@/app/fonts";
import { useState } from "react";
import { Search } from "lucide-react";
import CategoryCard from "./category-card";

interface CategorySearchProps {
    categories: Category[];
}

export default function CategorySearch({ categories }: CategorySearchProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setFilteredCategories(categories);
            return;
        }

        const filtered = categories.filter(category =>
            category.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCategories(filtered);
    };

    return (
        <div className="w-full">
            <div className="max-w-xl mx-auto mb-8">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search categories..."
                        className={`${garamond.className} w-full px-4 py-3 pl-12 border border-black/10 dark:border-white/10 focus:border-black dark:focus:border-white bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-all duration-200`}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                </div>

                {/* Results count */}
                <p className={`${garamond.className} text-sm text-gray-500 dark:text-gray-400 mt-2 text-center`}>
                    {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'} found
                </p>
            </div>

            {/* Filtered Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCategories.map((category) => (
                    <div key={category.id} className="group">
                        <CategoryCard category={category} />
                    </div>
                ))}
            </div>
        </div>
    );
} 