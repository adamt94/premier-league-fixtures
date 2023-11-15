import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, useColorScheme, View } from "react-native";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import FixturesScreen from "./fixture";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  const { getItem } = useAsyncStorage("@fixtures");
  const [cachedFixtures, setCachedFixtures] = useState<
    ApiFixture | undefined
  >();

  useEffect(() => {
    const getFixtures = async () => {
      const fixtures = await getItem();

      if (fixtures) {
        setCachedFixtures(JSON.parse(fixtures));
      }
    };
    getFixtures();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Tabs>
          <View className="bg-surfaceContainer dark:bg-surfaceContainerDark">
            <SafeAreaView>
              <StatusBar
                barStyle={colorScheme === "dark"
                  ? "light-content"
                  : "dark-content"}
              />
            </SafeAreaView>
          </View>
        </Tabs>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
