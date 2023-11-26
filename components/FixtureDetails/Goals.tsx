import { Image, Text, View } from "react-native";
import { Event, Player } from "../../api/types";
import { Ionicons } from "@expo/vector-icons";

type HeaderProps = {
  homeTeamPlayers: Player[];
  awayTeamPlayers: Player[];
  homeTeamSubs: Player[];
  awayTeamSubs: Player[];
  events: Event[];
};
const Goals = ({
  homeTeamPlayers,
  awayTeamPlayers,
  homeTeamSubs,
  awayTeamSubs,
  events,
}: HeaderProps) => {
  const findPlayerAndTeam = (id: number) => {
    const findPlayer = (players: Player[], team: number) => {
      const player = players.find((p) => p.id === id);
      return player ? { player, team } : null;
    };

    const homePlayer =
      findPlayer(homeTeamPlayers, 0) || findPlayer(homeTeamSubs, 0);
    const awayPlayer =
      findPlayer(awayTeamPlayers, 1) || findPlayer(awayTeamSubs, 1);

    return homePlayer || awayPlayer || null;
  };

  const getGoalScorers = (events: Event[]) => {
    const goalEvents = events.filter(
      (event) => event.type === "G" || event.type === "P",
    );
    const goalIds = goalEvents.map((event) => event.personId);
    const goalScorers = goalIds
      .map((id) => findPlayerAndTeam(id || 0))
      .filter(Boolean);
    return goalScorers;
  };

  const goalScorers = getGoalScorers(events);

  return (
    <View className="flex flex-col items-center justify-center py-4 px-2">
      {goalScorers.map((scorer, index) => (
        <View
          key={index}
          className="flex flex-row items-center w-full justify-between"
        >
          <Text className="text-sm text-onSurface dark:text-onSurfaceDark flex-1">
            {scorer.team === 0 ? scorer.player.name.display : ""}
          </Text>
          <Ionicons name="football" size={20} color="white" />
          <Text className="text-sm text-onSurface dark:text-onSurfaceDark flex-1 text-right">
            {scorer.team === 1 ? scorer.player.name.display : ""}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Goals;
