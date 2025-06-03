import getAllCategories from '@/actions/categories/get-all-categories';
import CategoryCard from '@/components/category/category-card';
import React from 'react';

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Category cards will go here */}
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </main>
  );
} 