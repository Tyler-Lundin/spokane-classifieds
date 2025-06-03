import React from 'react';

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Search Results {searchParams.q && `for "${searchParams.q}"`}
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