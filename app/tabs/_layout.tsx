import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs initialRouteName="fixture">
        <Tabs.Screen
          name="table"
          options={{
            headerShown: false,
            tabBarIcon: (item) => (
              <Ionicons name="albums" size={30} color={item.color} />
            ),
          }}
        />
        <Tabs.Screen
          name="fixture"
          options={{
            headerShown: false,
            tabBarIcon: (item) => (
              <Ionicons name="trophy" size={30} color={item.color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
