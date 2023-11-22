import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type NumberCircleProps = {
  borderColor: string;
  backgroundColor: string;
  size: number;
  children?: React.ReactNode;
};

const NumberCircle = ({
  borderColor,
  backgroundColor,
  children,
  size,
}: NumberCircleProps) => {
  return (
    <View
      style={[
        styles.circle,
        {
          borderColor,
          backgroundColor,
          width: size,
          height: size,
        },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NumberCircle;
