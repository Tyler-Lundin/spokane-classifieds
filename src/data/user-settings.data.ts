import { UserSetting } from '../types/app.types';

// Mock user settings
export const userSettings: UserSetting[] = [
  {
    id: '1',
    userId: '1',
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    preferredCurrency: 'USD',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    userId: '2',
    emailNotifications: true,
    smsNotifications: true,
    darkMode: true,
    preferredCurrency: 'USD',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
];

// Helper functions
export const getUserSettings = (userId: string): UserSetting | undefined => {
  return userSettings.find(settings => settings.userId === userId);
};

export const createUserSettings = (userId: string): UserSetting => {
  const defaultSettings: UserSetting = {
    id: (userSettings.length + 1).toString(),
    userId,
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    preferredCurrency: 'USD',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  userSettings.push(defaultSettings);
  return defaultSettings;
};

export const updateUserSettings = (
  userId: string,
  settings: Partial<Omit<UserSetting, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
): UserSetting | undefined => {
  const settingsIndex = userSettings.findIndex(s => s.userId === userId);
  if (settingsIndex === -1) return undefined;

  const updatedSettings = {
    ...userSettings[settingsIndex],
    ...settings,
    updatedAt: new Date(),
  };
  
  userSettings[settingsIndex] = updatedSettings;
  return updatedSettings;
};

export const deleteUserSettings = (userId: string): boolean => {
  const settingsIndex = userSettings.findIndex(s => s.userId === userId);
  if (settingsIndex === -1) return false;
  
  userSettings.splice(settingsIndex, 1);
  return true;
}; 