import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Function to get cookie by name
    const getCookie = (name) => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };

    // Initialize theme from cookie
    const initTheme = () => {
      const themeCookie = getCookie('theme');
      if (themeCookie) {
        setTheme(themeCookie);
      }
    };

    // Set up listener for cookie changes
    initTheme();
    
    const checkCookie = () => {
      const currentTheme = getCookie('theme');
      if (currentTheme && currentTheme !== theme) {
        setTheme(currentTheme);
      }
    };

    const intervalId = setInterval(checkCookie, 2000);
    
    return () => clearInterval(intervalId);
  }, [theme]);

  return theme;
};
