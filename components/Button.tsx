import { ThemeContext } from "@/context/ThemedContext";
import { Colors } from "@/utils/Colors";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const Button = ({
  title,
  type,
  onPress,
}: {
  title: string;
  type: "top" | "right" | "number";
  onPress: () => void;
}) => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor:
            currentTheme === "dark"
              ? type === "top"
                ? Colors.btnLight
                : type === "right"
                ? Colors.btnRight
                : Colors.btnDark
              : type === "top"
              ? Colors.btnDark
              : type === "right"
              ? Colors.btnRight
              : Colors.btnLight,
        },
      ]}
    >
      <Text
        style={{
          fontSize: 34,
          color:
            currentTheme === "dark"
              ? type !== "top"
                ? Colors.light
                : Colors.dark
              : type === "number"
              ? Colors.dark
              : Colors.light,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 80,
    width: 80,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark,
  },
});
