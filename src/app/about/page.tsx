import React from 'react';

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Spokane Classifieds</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Spokane Classifieds is dedicated to connecting the local community through
            a safe, reliable, and user-friendly marketplace platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Trust & Safety</h2>
          <p className="text-gray-700 mb-4">
            We prioritize the safety and security of our users through various
            verification processes and community guidelines.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Community Guidelines</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Be honest and accurate in your listings</li>
            <li>Treat all users with respect</li>
            <li>Follow local laws and regulations</li>
            <li>Report suspicious activity</li>
          </ul>
        </section>
      </div>
    </main>
  );
} 