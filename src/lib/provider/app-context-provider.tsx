"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  themeColor: string;
  setThemeColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeColor, setThemeColor] = useState<string>("blue-200");

  // Set themeColor from localStorage only on the client side
  useEffect(() => {
    const storedTheme = localStorage.getItem("themeColor");
    if (storedTheme) {
      setThemeColor(storedTheme);
    }
  }, []);

  useEffect(() => {
    // Sync themeColor to localStorage on the client side
    if (typeof window !== "undefined") {
      localStorage.setItem("themeColor", themeColor);
    }
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
      
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within an AppProvider");
  }
  return context;
};
