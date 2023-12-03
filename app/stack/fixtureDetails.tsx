import { ActivityIndicator, useColorScheme } from "react-native";
import { View } from "../../components/Themed";

import resolveConfig from "tailwindcss/resolveConfig";
import FixtureDetailsScreen from "../../components/FixtureDetails/FixtureDetails";
import { useQuery } from "@tanstack/react-query";
import { FootballFixtureDetailsData } from "../../api/types";
import { getFixtureDetails } from "../../api/getFixtureDetails";
import { Stack, useLocalSearchParams } from "expo-router";
const myConfig = require("../../tailwind.config.js");

const fetchFixturesSortByDate = (id: string) => {
  return getFixtureDetails(id);
};
export default function FixtureDetails() {
  const { id } = useLocalSearchParams();

  const colorScheme = useColorScheme();

  const { isLoading, data, isRefetching, refetch } = useQuery<
    FootballFixtureDetailsData | null
  >({
    queryKey: ["fixtureDetailsS", id],
    staleTime: 0,
    queryFn: () => fetchFixturesSortByDate(id as string),
  });

  if (isLoading || !data) {
    return (
      <View className="flex bg-surface dark:bg-surfaceDark h-full flex-col items-center justify-center">
        {<ActivityIndicator size="large" />}
      </View>
    );
  }

  const lineUps = data.teamLists;
  const title = data.teams[0].team.club.shortName +
    " vs " +
    data.teams[1].team.club.shortName;

  const { theme } = resolveConfig(myConfig);
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title }} />
      <View className="w-full h-full surface relative bg-surfaceContainer dark:bg-surfaceContainerDark">
        <FixtureDetailsScreen
          theme={{
            textColor: colorScheme === "light"
              ? theme.colors.onPrimaryFixedVariant
              : theme.colors.onPrimaryFixedVariantDark,
            borderColor: colorScheme === "light"
              ? theme.colors.onPrimaryFixedVariant
              : theme.colors.onPrimaryFixedVariantDark,
            backgroundColor: colorScheme === "light"
              ? theme.colors.primaryFixed
              : theme.colors.primaryFixedDark,
          }}
          awayTheme={{
            textColor: colorScheme === "light"
              ? theme.colors.onTertiaryFixedVariant
              : theme.colors.onTertiaryFixedVariantDark,
            borderColor: colorScheme === "light"
              ? theme.colors.onTertiaryFixedVariant
              : theme.colors.onTertiaryFixedVariantDark,
            backgroundColor: colorScheme === "light"
              ? theme.colors.tertiaryFixed
              : theme.colors.tertiaryFixedDark,
          }}
          teamLineUps={lineUps}
          teams={data.teams}
          competition={data.gameweek.compSeason.competition.description}
          events={data.events}
          clock={data.clock.label}
        />
      </View>
    </>
  );
}
