import { ActivityIndicator, useColorScheme } from "react-native";
import { GameWeek } from "../components/GameWeek";
import { View } from "../components/Themed";
import { useFetch } from "./hooks/usefetch";
import { Text, RefreshControl, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

const mapApiFixtureToFixture = (apiFixture: ApiFixture): Fixture[] => {
  // conver apifixture attributes to fixture attributes
  return apiFixture.data.map((fixture) => {
    return {
      date: fixture.attributes.date,
      homeTeam: fixture.attributes.homeTeam,
      awayTeam: fixture.attributes.awayTeam,
      homeScore: fixture.attributes.homeScore,
      awayScore: fixture.attributes.awayScore,
      homeTeamLogo: fixture.attributes.homeTeamLogo,
      awayTeamLogo: fixture.attributes.awayTeamLogo,
    } as Fixture;
  });
};

const fetchFixturesSortByDate = () => {
  return fetch(
    "https://premier-league-fixtures.vercel.app/api/model/fixture?sort=date"
  )
    .then((response) => response.json())
    .then((data) => data as ApiFixture);
};

export default function FixturesScreen({
  cachedFixtures,
}: {
  cachedFixtures?: ApiFixture;
}) {
  const { setItem } = useAsyncStorage("@fixtures");
  const { isLoading, isError, data, error, isRefetching, refetch } =
    useQuery<ApiFixture>({
      queryKey: ["fixtures"],
      queryFn: fetchFixturesSortByDate,
    });

  useEffect(() => {
    if (data) {
      setItem(JSON.stringify(data));
    }
  }, [data]);

  if (!cachedFixtures && isLoading) {
    return (
      <View className="flex bg-surface dark:bg-surfaceDark h-full flex-col items-center justify-center">
        {<ActivityIndicator size="large" />}
      </View>
    );
  }

  const fixtures = data
    ? mapApiFixtureToFixture(data)
    : mapApiFixtureToFixture(cachedFixtures!);
  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <GameWeek fixtures={fixtures} />
      </ScrollView>
    </>
  );
}
