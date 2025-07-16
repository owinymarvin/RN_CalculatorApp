import SettingsButton from "@/components/SettingsButton";
import { ThemeContext } from "@/context/ThemedContext";
import { Colors } from "@/utils/Colors";
import { Stack } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

const settings = () => {
  const { currentTheme, toggleTheme, useSystemTheme, isSystemTheme } =
    useContext(ThemeContext);
  return (
    <>
      <Stack.Screen
        options={{
          title: "Settings",
          headerTitleStyle: {
            color: currentTheme === "dark" ? Colors.light : Colors.dark,
          },
          headerStyle: {
            backgroundColor:
              currentTheme === "dark" ? Colors.dark : Colors.light,
          },
        }}
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              currentTheme === "dark" ? Colors.dark : Colors.gray,
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              color: currentTheme === "dark" ? Colors.light : Colors.dark,
            },
          ]}
        >
          Theme Switch
        </Text>
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor:
                currentTheme === "dark" ? Colors.btnDark : Colors.btnLight,
            },
          ]}
          onPress={() => {}}
        >
          <Text
            style={{
              color: currentTheme === "dark" ? Colors.light : Colors.dark,
            }}
          >
            Dark Mode
          </Text>
          <Switch
            value={currentTheme === "dark"}
            onValueChange={() =>
              toggleTheme(currentTheme === "light" ? "dark" : "light")
            }
          />
        </Pressable>

        <Text
          style={[
            styles.title,
            {
              color: currentTheme === "dark" ? Colors.light : Colors.dark,
            },
          ]}
        >
          Theme Settings
        </Text>
        <SettingsButton
          title="Light"
          icon="lightbulb-on"
          onPress={() => {
            toggleTheme("light");
          }}
          isActive={!isSystemTheme && currentTheme === "light"}
        />
        <SettingsButton
          title="Dark"
          icon="weather-night"
          onPress={() => {
            toggleTheme("dark");
          }}
          isActive={!isSystemTheme && currentTheme === "dark"}
        />
        <SettingsButton
          title="System"
          icon="theme-light-dark"
          onPress={useSystemTheme}
          isActive={isSystemTheme}
        />
      </View>
    </>
  );
};

export default settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.gray,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    marginVertical: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.light,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
});
