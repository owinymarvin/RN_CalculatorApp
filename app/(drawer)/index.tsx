import Calculator from "@/components/Calculator";
import { ThemeContext } from "@/context/ThemedContext";
import { Colors } from "@/utils/Colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { Switch } from "react-native";

export default function Index() {
  const { currentTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <StatusBar style={currentTheme === "dark" ? "light" : "dark"} />
      <Stack.Screen
        options={{
          title: "calculator",
          headerTitleStyle: {
            color: currentTheme === "dark" ? Colors.light : Colors.dark,
          },
          headerStyle: {
            backgroundColor:
              currentTheme === "dark" ? Colors.dark : Colors.light,
          },
          headerRight: () => (
            <Switch
              value={currentTheme === "dark"}
              onValueChange={() =>
                toggleTheme(currentTheme === "light" ? "dark" : "light")
              }
            />
          ),
        }}
      />
      <Calculator />
    </>
  );
}
