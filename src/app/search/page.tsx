import React from 'react';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Search Results {q && `for "${q}"`}
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64">
          {/* Search filters will go here */}
        </aside>
        <div className="flex-1">
          {/* Search results will go here */}
        </div>
      </div>
    </main>
  );
} 