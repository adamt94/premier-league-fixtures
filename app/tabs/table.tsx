import { ActivityIndicator, useColorScheme } from "react-native";
import { View } from "../../components/Themed";
import { RefreshControl, ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Entry, FootballTablesData } from "../../api/types";
import Table, { TableTeam } from "../../components/Table";
import { getTable } from "../../api/getTable";

const fetchTableData = () => {
  return getTable();
};

export default function FixturesScreen({
  cachedFixtures,
}: {
  cachedFixtures?: ApiFixture;
}) {
  const { isLoading, data, isRefetching, refetch } =
    useQuery<FootballTablesData | null>({
      queryKey: ["tables"],
      queryFn: fetchTableData,
    });

  const convertToTableData = (data: FootballTablesData) => {
    const entries: Entry[] = data.tables[0].entries;
    return entries.map((team) => {
      return {
        name: team.team.club.abbr,
        position: team.position,
        played: team.overall.played,
        wins: team.overall.won,
        draws: team.overall.drawn,
        losses: team.overall.lost,
        points: team.overall.points,
        startingPosition: team.startingPosition,
        icon: `https://resources.premierleague.com/premierleague/badges/70/${team.team.altIds.opta}.png`,
      };
    }) as TableTeam[];
  };
  if (isLoading || !data) {
    return (
      <View className="flex bg-surface dark:bg-surfaceDark h-full flex-col items-center justify-center">
        {<ActivityIndicator size="large" />}
      </View>
    );
  }
  const premierLeagueTableData = convertToTableData(data);

  return (
    <View className="flex pt-12">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <Table teams={premierLeagueTableData} />
      </ScrollView>
    </View>
  );
}
