import { createContext, useContext } from 'react';
import { useTheme } from './theme.jsx';
import SuperTokens from 'supertokens-auth-react';
import { SuperTokensConfig } from '../config.jsx';

const ThemeContext = createContext('light');

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const theme = useTheme();
  
  // Base styles for SuperTokens
  const baseStyles = `
    [data-supertokens~="poweredBy"] {
      display: none !important;
    }
    a[data-supertokens="superTokensBranding"] {
      display: none !important;
    }
    [data-supertokens~="button"] {
      background-color:rgb(106, 50, 151);
      border-radius: 4px;
      font-weight: bold;
    }
  `;

  // Dark mode specific styles
  const darkModeStyles = `
    [data-supertokens~=container] {
      --palette-background: 51, 51, 51;
      --palette-inputBackground: 41, 41, 41;
      --palette-inputBorder: 41, 41, 41;
      --palette-textTitle: 255, 255, 255;
      --palette-textLabel: 255, 255, 255;
      --palette-textPrimary: 255, 255, 255;
      --palette-error: 173, 46, 46;
      --palette-textInput: 169, 169, 169;
      --palette-textLink: 114,114,114;
      --palette-textGray: 158, 158, 158;
    }
  `;

  // Light mode specific styles
  const lightModeStyles = `
    [data-supertokens~=container] {
      --palette-background: 255, 255, 255;
      --palette-inputBackground: 250, 250, 250;
      --palette-inputBorder: 224, 224, 224;
      --palette-textTitle: 34, 34, 34;
      --palette-textLabel: 34, 34, 34;
      --palette-textPrimary: 34, 34, 34;
      --palette-error: 173, 46, 46;
      --palette-textInput: 34, 34, 34;
      --palette-textLink: 0, 118, 255;
      --palette-textGray: 128, 128, 128;
    }
  `;
  
  // Update SuperTokens styling based on theme
  const themeStyles = theme === 'dark' ? darkModeStyles : lightModeStyles;
  
  SuperTokens.init({
    ...SuperTokensConfig,
    style: baseStyles + themeStyles,
  });
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
