'use client';

import { useState } from 'react';
import AuthForm, { AuthFormData } from '@/components/auth/AuthForm';
import { createUser } from '@/data/users.data';
import { createVerificationToken } from '@/data/verification-tokens.data';
import { createUserSettings } from '@/data/user-settings.data';

export default function RegisterPage() {
  const [, setError] = useState<string>('');

  const handleRegister = async (data: AuthFormData) => {
    try {
      // In a real app, we would hash the password here
      const user = createUser({
        firstName: data.firstName!,
        lastName: data.lastName!,
        email: data.email,
        phone: data.phone!,
        passwordHash: 'hashed_password_here', // In real app, this would be properly hashed
        isVerified: false,
        isBanned: false,
      });

      // Create default user settings
      createUserSettings(user.id);

      // Create email verification token
      const verificationToken = createVerificationToken(user.id, 'email_verification');

      // In a real app, we would send the verification email here
      console.log('Verification token:', verificationToken.token);
      console.log('Created user:', user);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return (
    <AuthForm
      type="register"
      onSubmit={handleRegister}
    />
  );
} 