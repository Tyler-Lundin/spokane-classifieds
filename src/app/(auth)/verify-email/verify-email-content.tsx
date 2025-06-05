'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getVerificationToken, deleteVerificationToken } from '@/data/verification-tokens.data';
import { updateUser } from '@/data/users.data';

export function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link');
        return;
      }

      try {
        const verificationToken = getVerificationToken(token);
        
        if (!verificationToken) {
          setStatus('error');
          setMessage('Invalid or expired verification link');
          return;
        }

        if (verificationToken.type !== 'email_verification') {
          setStatus('error');
          setMessage('Invalid verification token type');
          return;
        }

        // Update user verification status
        const updatedUser = updateUser(verificationToken.userId, { isVerified: true });
        
        if (!updatedUser) {
          setStatus('error');
          setMessage('Failed to verify email');
          return;
        }

        // Delete the used token
        deleteVerificationToken(token);

        setStatus('success');
        setMessage('Email verified successfully!');
      } catch (error) {
        console.error('error in verify-email.tsx', error);
        setStatus('error');
        setMessage('An error occurred during verification');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <>
      <div className={`rounded-md p-4 ${
        status === 'success' ? 'bg-green-50' :
        status === 'error' ? 'bg-red-50' :
        'bg-blue-50'
      }`}>
        <div className={`text-sm ${
          status === 'success' ? 'text-green-700' :
          status === 'error' ? 'text-red-700' :
          'text-blue-700'
        }`}>
          {message}
        </div>
      </div>

      {status === 'success' && (
        <div className="text-center">
          <Link
            href="/auth/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Proceed to login
          </Link>
        </div>
      )}

      {status === 'error' && (
        <div className="text-center">
          <Link
            href="/auth/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to registration
          </Link>
        </div>
      )}
    </>
  );
} 