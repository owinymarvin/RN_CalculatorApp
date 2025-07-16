import { ThemeContext } from "@/context/ThemedContext";
import { Colors } from "@/utils/Colors";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

const Calculator = () => {
  const { currentTheme } = useContext(ThemeContext);
  const [firstValue, setFirstValue] = useState("");
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState("");
  const [previous, setPrevious] = useState("");

  const InputNumberHandler = (num: string) => {
    if (operator && firstValue) {
      const currentInput = displayValue === "0" ? num : displayValue + num;
      setDisplayValue(currentInput);
    } else {
      const newInput = displayValue === "0" ? num : displayValue + num;
      setDisplayValue(newInput);
    }
  };

  const operatorInputHandler = (op: string) => {
    if (op === "clear") {
      setFirstValue("");
      setDisplayValue("0");
      setOperator("");
      setPrevious("");
      return;
    }

    if (op === "backspace") {
      if (displayValue.length > 1) {
        setDisplayValue(displayValue.slice(0, -1));
      } else {
        setDisplayValue("0");
      }
      return;
    }

    if (firstValue && operator) {
      const result = performCalc(firstValue, displayValue, operator);
      setFirstValue(result);
      setDisplayValue("0");
      setPrevious(result + op);
    } else {
      setFirstValue(displayValue);
      setDisplayValue("0");
      setPrevious(displayValue + op);
    }

    setOperator(op);
  };

  const performCalc = (a: string, b: string, op: string): string => {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    let result = 0;

    switch (op) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num2 !== 0 ? num1 / num2 : 0;
        break;
      case "%":
        result = num1 % num2;
        break;
    }

    return result.toString();
  };

  const calculationHandler = () => {
    if (!firstValue || !operator) return;

    const result = performCalc(firstValue, displayValue, operator);
    setDisplayValue(result);
    setPrevious(firstValue + operator + displayValue + "=");
    setFirstValue("");
    setOperator("");
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.display,
          {
            backgroundColor:
              currentTheme === "dark" ? Colors.dark : Colors.gray,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "300",
            color: currentTheme === "dark" ? Colors.light : Colors.dark,
          }}
        >
          {previous}
        </Text>
        <Text
          style={{
            fontSize: 70,
            fontWeight: "300",
            color: currentTheme === "dark" ? Colors.light : Colors.dark,
          }}
        >
          {displayValue}
        </Text>
      </View>
      <View
        style={[
          styles.keypad,
          {
            backgroundColor:
              currentTheme === "dark" ? Colors.dark : Colors.light,
          },
        ]}
      >
        <Button
          title="C"
          type="top"
          onPress={() => operatorInputHandler("clear")}
        />
        <Button
          title="🐕‍🦺"
          type="top"
          onPress={() => operatorInputHandler("backspace")}
        />
        <Button
          title="%"
          type="top"
          onPress={() => operatorInputHandler("%")}
        />
        <Button
          title="🤸"
          type="right"
          onPress={() => operatorInputHandler("/")}
        />
        <Button
          title="7"
          type="number"
          onPress={() => InputNumberHandler("7")}
        />
        <Button
          title="8"
          type="number"
          onPress={() => InputNumberHandler("8")}
        />
        <Button
          title="9"
          type="number"
          onPress={() => InputNumberHandler("9")}
        />
        <Button
          title="x"
          type="right"
          onPress={() => operatorInputHandler("*")}
        />
        <Button
          title="4"
          type="number"
          onPress={() => InputNumberHandler("4")}
        />
        <Button
          title="5"
          type="number"
          onPress={() => InputNumberHandler("5")}
        />
        <Button
          title="6"
          type="number"
          onPress={() => InputNumberHandler("6")}
        />
        <Button
          title="-"
          type="right"
          onPress={() => operatorInputHandler("-")}
        />
        <Button
          title="1"
          type="number"
          onPress={() => InputNumberHandler("1")}
        />
        <Button
          title="2"
          type="number"
          onPress={() => InputNumberHandler("2")}
        />
        <Button
          title="3"
          type="number"
          onPress={() => InputNumberHandler("3")}
        />
        <Button
          title="+"
          type="right"
          onPress={() => operatorInputHandler("+")}
        />
        <Button
          title="0"
          type="number"
          onPress={() => InputNumberHandler("0")}
        />
        <Button
          title="00"
          type="number"
          onPress={() => InputNumberHandler("00")}
        />
        <Button
          title="."
          type="number"
          onPress={() => InputNumberHandler(".")}
        />
        <Button
          title="="
          type="right"
          onPress={calculationHandler}
        />
      </View>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  display: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  keypad: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    padding: 7,
  },
});
