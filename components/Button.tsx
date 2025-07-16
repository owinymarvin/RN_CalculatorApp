import { Colors } from "@/utils/Colors";
import React from "react";
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
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor:
            type === "top"
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
          color: type === "number" ? "black" : Colors.light,
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
