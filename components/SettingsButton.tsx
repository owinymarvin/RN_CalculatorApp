import { ThemeContext } from "@/context/ThemedContext";
import { Colors } from "@/utils/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type SettingsButtonProps = {
  title: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  onPress: () => void;
  isActive: boolean;
};

const SettingsButton = ({
  title,
  icon,
  onPress,
  isActive,
}: SettingsButtonProps) => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.settingsButton,
        {
          backgroundColor: currentTheme === "dark" ? Colors.dark : Colors.light,
        },
      ]}
    >
      <View style={styles.titleWrapper}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={currentTheme === "dark" ? Colors.light : Colors.dark}
        />
        <Text
          style={[
            styles.title,
            {
              color: currentTheme === "dark" ? Colors.light : Colors.dark,
            },
          ]}
        >
          {title}
        </Text>
      </View>

      <MaterialIcons
        name={isActive ? "check-box" : "check-box-outline-blank"}
        size={24}
        color={
          currentTheme === "dark"
            ? isActive
              ? Colors.btnRight
              : Colors.light
            : isActive
            ? Colors.btnRight
            : Colors.dark
        }
      />
    </Pressable>
  );
};

export default SettingsButton;

const styles = StyleSheet.create({
  settingsButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.light,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
  },
});
