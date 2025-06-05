import React from 'react';

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log('unused params in /user/[id]/page.tsx', id);
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Name</h1>
          <p className="text-gray-600">Member since 2024</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Active Listings</h2>
            {/* User's listings will go here */}
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            {/* User's reviews will go here */}
          </div>
        </div>
      </div>
    </main>
  );
} 