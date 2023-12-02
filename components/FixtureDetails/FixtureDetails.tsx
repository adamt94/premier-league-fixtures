import LineUpGraphic from "./LineUpGraphic";
import { Event, Team, TeamList } from "../../api/types";
import { Image, Text, View } from "react-native";
import { teamLogoSrc } from "../../constants/variables";
import Header from "./Header";
import { ScrollView } from "react-native-gesture-handler";
import Goals from "./Goals";

type FixtureDetailsScreenProps = {
  theme: { textColor: string; backgroundColor: string; borderColor: string };
  awayTheme?: {
    textColor: string;
    backgroundColor: string;
    borderColor: string;
  };
  teamLineUps: TeamList[];
  teams: [{ team: Team; score: number }, { team: Team; score: number }];
  competition: string;
  events: Event[];
};

export default function FixtureDetailsScreen({
  theme,
  awayTheme,
  teamLineUps,
  teams,
  competition,
  events,
}: FixtureDetailsScreenProps) {
  const homeTeamLineUp = teamLineUps[0];
  const awayTeamLineUp = teamLineUps[1];
  const homeTeam = teams[0].team;
  const awayTeam = teams[1].team;
  const homeTeamLogo = teamLogoSrc + homeTeam.altIds.opta + ".png";
  const awayTeamLogo = teamLogoSrc + awayTeam.altIds.opta + ".png";

  const goals = events.filter(
    (event) => event.type === "G" || event.type === "P",
  );
  const goalsPersonIds = goals.map((event) => event.personId || 0);

  if (!homeTeamLineUp || !awayTeamLineUp) {
    return (
      <View>
        <Header
          homeTeamLogo={homeTeamLogo}
          awayTeamLogo={awayTeamLogo}
          homeTeamName={homeTeam.shortName}
          awayTeamName={awayTeam.shortName}
          league={competition}
          date=""
          showScore={teams[0].score && teams[1].score}
          homeScore={teams[0].score}
          awayScore={teams[1].score}
        />
      </View>
    );
  }
  return (
    <ScrollView>
      <View className="flex flex-col justify-center">
        <Header
          homeTeamLogo={homeTeamLogo}
          awayTeamLogo={awayTeamLogo}
          homeTeamName={homeTeam.shortName}
          awayTeamName={awayTeam.shortName}
          league={competition}
          date=""
          showScore={true}
          homeScore={teams[0].score}
          awayScore={teams[1].score}
        />
        <Goals
          homeTeamPlayers={homeTeamLineUp.lineup}
          awayTeamPlayers={awayTeamLineUp.lineup}
          homeTeamSubs={homeTeamLineUp.substitutes}
          awayTeamSubs={awayTeamLineUp.substitutes}
          events={events}
        />

        <View className="w-full h-10">
          <View className="flex flex-row justify-between items-center w-full h-full bg-secondaryContainer dark:bg-secondaryContainerDark px-4">
            <Image
              className=""
              source={{
                uri: teamLogoSrc + homeTeam.altIds.opta + ".png" ?? "",
              }}
              style={{ width: 25, height: 25 }}
            />

            <Text className="text-lg text-onSecondaryContainer dark:text-onSecondaryContainerDark">
              {homeTeam.shortName}
            </Text>
            <Text className="text-sm text-onSecondaryContainer dark:text-onSecondaryContainerDark">
              {homeTeamLineUp.formation?.label ?? ""}
            </Text>
          </View>
        </View>
        <LineUpGraphic
          theme={theme}
          awayTheme={awayTheme}
          homeTeamLineUp={homeTeamLineUp}
          awayTeamLineUp={awayTeamLineUp}
          goals={goalsPersonIds}
        />

        <View className="w-full h-10">
          <View className="flex flex-row justify-between items-center w-full h-full bg-tertiaryContainer dark:bg-tertiaryContainerDark px-4">
            <Image
              className=""
              source={{
                uri: teamLogoSrc + awayTeam.altIds.opta + ".png" ?? "",
              }}
              style={{ width: 25, height: 25 }}
            />

            <Text className="text-lg text-onTertiaryContainer dark:text-onTertiaryContainerDark">
              {awayTeam.shortName}
            </Text>
            <Text className="text-sm text-onTertiaryContainer dark:text-onTertiaryContainerDark">
              {awayTeamLineUp.formation?.label ?? ""}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
