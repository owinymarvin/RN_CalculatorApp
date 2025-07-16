import ThemeProvider from "@/context/ThemedContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
