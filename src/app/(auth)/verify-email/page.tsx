'use client';

import { Suspense } from 'react';
import { VerifyEmailContent } from '@/app/(auth)/verify-email/verify-email-content';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
          <div className="mt-8 space-y-6">
            <Suspense fallback={
              <div className="rounded-md p-4 bg-blue-50">
                <div className="text-sm text-blue-700">
                  Verifying your email...
                </div>
              </div>
            }>
              <VerifyEmailContent />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
} 