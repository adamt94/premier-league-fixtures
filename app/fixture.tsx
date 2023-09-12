import { ActivityIndicator, useColorScheme } from "react-native";
import { GameWeek } from "../components/GameWeek";
import { View } from "../components/Themed";
import { useFetch } from "./hooks/usefetch";
import { Text, RefreshControl, ScrollView } from "react-native";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

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

export default function FixturesScreen() {
  const { isLoading, isError, data, error, isRefetching, refetch } =
    useQuery<ApiFixture>({
      queryKey: ["fixtures"],
      queryFn: fetchFixturesSortByDate,
    });

  const fixtures = data ? mapApiFixtureToFixture(data) : [];

  if (isLoading) {
    return (
      <View className="flex bg-surface h-full flex-col items-center justify-center">
        {<ActivityIndicator size="large" />}
      </View>
    );
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {data && <GameWeek fixtures={fixtures} />}
      </ScrollView>
    </>
  );
}
