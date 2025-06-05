'use client';

import { useState } from 'react';
import AuthForm, { AuthFormData } from '@/components/auth/AuthForm';
import { getUserByEmail } from '@/data/users.data';

export default function LoginPage() {
  const [, setError] = useState<string>('');

  const handleLogin = async (data: AuthFormData) => {
    try {
      const user = getUserByEmail(data.email);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // In a real app, we would verify the password hash here
      if (data.password !== 'hashed_password_here') {
        throw new Error('Invalid email or password');
      }

      if (user.isBanned) {
        throw new Error('This account has been banned');
      }

      // In a real app, we would set up the session here
      console.log('Logged in user:', user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleLogin}
    />
  );
} 