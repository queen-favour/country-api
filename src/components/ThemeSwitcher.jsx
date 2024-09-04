import React from 'react';
import { useTheme } from '../ThemeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded focus:outline-none focus:ring"
    >
      {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default ThemeSwitcher;
