import { ActivityIndicator, useColorScheme } from "react-native";
import { GameWeek } from "../components/GameWeek";
import { Text, View } from "../components/Themed";
import { RefreshControl, ScrollView } from "react-native";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { getFixtures } from "../api/getFixtures";
import { FootballFixtureData } from "../api/types";
import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const fetchFixturesSortByDate = () => {
  return getFixtures();
};

export default function FixturesScreen({
  cachedFixtures,
}: {
  cachedFixtures?: ApiFixture;
}) {
  const { setItem } = useAsyncStorage("@fixtures");
  const { isLoading, data, isRefetching, refetch } = useQuery<
    FootballFixtureData | null
  >({
    queryKey: ["fixtures"],
    queryFn: fetchFixturesSortByDate,
  });

  useEffect(() => {
    if (data) {
      setItem(JSON.stringify(data));
    }
  }, [data]);

  if (isLoading || !data) {
    return (
      <View className="flex bg-surface dark:bg-surfaceDark h-full flex-col items-center justify-center">
        {<ActivityIndicator size="large" />}
      </View>
    );
  }

  const fixtures = data.content;

  return (
    <View className="flex pt-12">
      <Tabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="trophy" size={30} color="grey" />,
        }}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <GameWeek fixtures={fixtures} />
      </ScrollView>
    </View>
  );
}
