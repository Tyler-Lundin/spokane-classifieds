'use client';

import { useEffect, useState } from 'react';
import { Moon, Settings, Sun, SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function SettingsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely show the UI
  useEffect(() => setMounted(true), []);

  // Debug theme changes
  useEffect(() => {
    console.log('Theme changed:', { theme, resolvedTheme });
  }, [theme, resolvedTheme]);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    console.log('Setting theme to:', newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        aria-label="Settings"
      >
        <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-48">
          <div className="space-y-2">
            <button
              onClick={toggleTheme}
              className="w-full text-left text-black dark:text-white px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : theme === 'dark' ? (
                <SunMoon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
              {theme === 'light' ? 'Dark' : theme === 'dark' ? 'System' : 'Light'} Mode
              {theme === 'system' && (
                <span className="text-xs text-gray-500 ml-1">
                  ({resolvedTheme})
                </span>
              )}
            </button>
            <div className="text-xs text-gray-500 mt-2">
              Current: {theme}
              <br />
              Resolved: {resolvedTheme}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 