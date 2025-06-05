import React from 'react';

export default function TermsOfServicePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using Spokane Classifieds, you agree to be bound by these
              Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. User Responsibilities</h2>
            <p className="text-gray-700 mb-4">
              As a user of our platform, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Comply with all applicable laws</li>
              <li>Respect other users&apos; rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Prohibited Activities</h2>
            <p className="text-gray-700 mb-4">
              Users are prohibited from:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Posting illegal or fraudulent listings</li>
              <li>Harassing other users</li>
              <li>Attempting to manipulate the platform</li>
              <li>Violating intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              Spokane Classifieds is not liable for any damages arising from:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Use or inability to use the service</li>
              <li>Unauthorized access to your account</li>
              <li>Conduct of other users</li>
              <li>Third-party content</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
} 