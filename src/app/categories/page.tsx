import getAllCategories from '@/actions/categories/get-all-categories';
import React from 'react';
import { garamond, oldStandard } from "@/app/fonts";
import CategoryList from '@/components/category/category-list';

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  
  return (
    <main className="container mx-auto px-4 py-16 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {/* Decorative Line */}
          <div className="w-16 h-[2px] bg-black dark:bg-white mx-auto mb-6"></div>
          
          <h1 className={`${oldStandard.className} text-4xl font-bold mb-4 tracking-tight text-black dark:text-white`}>
            Browse Categories
          </h1>
          <p className={`${garamond.className} text-lg text-gray-600 dark:text-gray-300 italic max-w-2xl mx-auto mb-8`}>
            Find what you&apos;re looking for in our curated collection of categories
          </p>

          {/* Category List with Search */}
          <CategoryList categories={categories} />
        </div>
      </div>
    </main>
  );
} 