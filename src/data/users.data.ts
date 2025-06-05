import { User } from '../types/app.types';

// Mock user data
export const users: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '509-555-0123',
    passwordHash: 'hashed_password_here', // In real app, this would be properly hashed
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    isVerified: true,
    isBanned: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '509-555-0124',
    passwordHash: 'hashed_password_here',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    isVerified: false,
    isBanned: false,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
];

// Helper functions
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const createUser = (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
  const newUser: User = {
    ...userData,
    id: (users.length + 1).toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id: string, userData: Partial<User>): User | undefined => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return undefined;

  const updatedUser = {
    ...users[userIndex],
    ...userData,
    updatedAt: new Date(),
  };
  users[userIndex] = updatedUser;
  return updatedUser;
};

export const deleteUser = (id: string): boolean => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return false;
  
  users.splice(userIndex, 1);
  return true;
}; 