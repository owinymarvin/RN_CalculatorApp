import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export type ThemedContextType = {
  currentTheme: String;
  toggleTheme: (newtheme: string) => void;
  useSystemTheme: () => void;
  isSystemTheme: boolean;
};

export const ThemeContext = createContext<ThemedContextType>({
  currentTheme: "light",
  toggleTheme: () => {},
  useSystemTheme: () => {},
  isSystemTheme: false,
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<string>("light");
  const [systemTheme, setSystemTheme] = useState<boolean>(false);

  useEffect(() => {
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme !== null) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.log(`Error loading theme: ${error}`);
      }
    };
    getTheme();
  }, [theme]);

  useEffect(() => {
    if (colorScheme) {
      setTheme(colorScheme);
      AsyncStorage.setItem("theme", colorScheme);
      setSystemTheme(true);
    }
  }, [colorScheme]);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    const storeData = async (theme: string) => {
      try {
        await AsyncStorage.setItem("theme", theme);
      } catch (error) {
        console.log(`Error saving: ${error}`);
      }
    };
    storeData(newTheme);
    setSystemTheme(false);
  };

  const useSystemTheme = () => {
    if (colorScheme) {
      setTheme(colorScheme);
      AsyncStorage.setItem("theme", colorScheme);
      setSystemTheme(true);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: theme,
        toggleTheme,
        useSystemTheme,
        isSystemTheme: systemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
