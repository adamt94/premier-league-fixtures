import { ActivityIndicator, Text } from "react-native";
import { GameWeek } from "../../components/GameWeek";
import { View } from "../../components/Themed";
import { RefreshControl, ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getFixtures } from "../../api/getFixtures";
import { FootballFixtureData } from "../../api/types";

const fetchFixturesSortByDate = () => {
  return getFixtures();
};

export default function FixturesScreen({
  cachedFixtures,
}: {
  cachedFixtures?: ApiFixture;
}) {
  const { isLoading, data, isRefetching, refetch } =
    useQuery<FootballFixtureData | null>({
      queryKey: ["fixtures"],
      queryFn: fetchFixturesSortByDate,
    });

  if (isLoading || !data) {
    return (
      <View className="flex bg-surface dark:bg-surfaceDark h-full flex-col items-center justify-center">
        {<ActivityIndicator size="large" />}
      </View>
    );
  }
  const fixtures = data.content;
  if (!data.content) {
    return (
      <View className="flex bg-surface dark:bg-surfaceDark h-full flex-col items-center justify-center">
        <Text className="text-surface">no content</Text>
      </View>
    );
  }
  return (
    <View className="flex pt-12">
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
