
export interface VerificationToken {
  id: string;
  userId: string;
  token: string;
  type: 'email_verification' | 'password_reset';
  expiresAt: Date;
  createdAt: Date;
}

// Mock verification tokens
export const verificationTokens: VerificationToken[] = [];

// Helper functions
export const createVerificationToken = (
  userId: string,
  type: VerificationToken['type'],
  expiresInHours: number = 24
): VerificationToken => {
  const token: VerificationToken = {
    id: (verificationTokens.length + 1).toString(),
    userId,
    token: Math.random().toString(36).substring(2, 15), // Simple random token
    type,
    expiresAt: new Date(Date.now() + expiresInHours * 60 * 60 * 1000),
    createdAt: new Date(),
  };
  
  verificationTokens.push(token);
  return token;
};

export const getVerificationToken = (token: string): VerificationToken | undefined => {
  return verificationTokens.find(vt => vt.token === token && vt.expiresAt > new Date());
};

export const deleteVerificationToken = (token: string): boolean => {
  const tokenIndex = verificationTokens.findIndex(vt => vt.token === token);
  if (tokenIndex === -1) return false;
  
  verificationTokens.splice(tokenIndex, 1);
  return true;
};

export const deleteExpiredTokens = (): void => {
  const now = new Date();
  const validTokens = verificationTokens.filter(vt => vt.expiresAt > now);
  verificationTokens.length = 0;
  verificationTokens.push(...validTokens);
}; 