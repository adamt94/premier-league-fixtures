import React from "react";
import { router, Stack } from "expo-router";
import resolveConfig from "tailwindcss/resolveConfig";
const myConfig = require("../../tailwind.config.js");
import { useColorScheme, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Layout() {
  const { theme } = resolveConfig(myConfig);
  const colorScheme = useColorScheme();
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === "light"
              ? theme.backgroundColor.primaryContainer
              : theme.backgroundColor.primaryContainerDark,
          },
          headerTitleStyle: {
            color: colorScheme === "light"
              ? theme.textColor.onPrimaryContainer
              : theme.textColor.onPrimaryContainerDark,
          },
          headerTintColor: colorScheme === "light"
            ? theme.textColor.onPrimaryContainer
            : theme.textColor.onPrimaryContainerDark,
        }}
      />
    </>
  );
}
