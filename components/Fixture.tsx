import { Image, Text, useColorScheme, View } from "react-native";
import { formatDate, getHoursMins } from "../util/dateFormat";
import FixtureScore from "./FixtureScore";
import { TouchableHighlight } from "react-native-gesture-handler";
import { router, useNavigation } from "expo-router";

type FixtureProps = {
  id: number;
  date: number;
  showDate: boolean;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  homeTeamLogo: string;
  awayTeamLogo: string;
  showScore: boolean;
};

export default function Fixture({
  id,
  date,
  showDate = true,
  showScore = false,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  homeTeamLogo,
  awayTeamLogo,
}: FixtureProps) {
  const abrvName = (name: string) => {
    if (name === "Tottenham Hotspur") {
      return "Tottenham";
    }
    return name;
  };

  return (
    <>
      {showDate && (
        <Text className="text-outline dark:text-outlineDark text-base pt-5 text-center">
          {formatDate(date)}
        </Text>
      )}

      <TouchableHighlight
        className="flex flex-col items-center justify-center"
        underlayColor="rgba(0,0,0,0.1)"
        onPress={() =>
          router.push({
            pathname: "stack/fixtureDetails",
            params: { id: id },
          })}
      >
        <View className="flex flex-row justify-start gap-1 py-2  w-full items-center">
          <View className="flex flex-row flex-1 justify-end">
            <Text className="text-onSurface dark:text-onSurfaceDark text-right px-1.5">
              {abrvName(homeTeam)}
            </Text>
            <Image
              className=""
              source={{ uri: homeTeamLogo }}
              style={{ width: 25, height: 25 }}
            />
          </View>
          <View className="flex justify-center px-2">
            <FixtureScore
              date={date}
              showScore={showScore}
              homeScore={homeScore}
              awayScore={awayScore}
            />
          </View>
          <View className="flex flex-row justify-start flex-1 ">
            <Image
              className=""
              source={{ uri: awayTeamLogo }}
              style={{ width: 25, height: 25 }}
            />
            <Text className="text-onSurface dark:text-onSurfaceDark px-1.5">
              {abrvName(awayTeam)}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </>
  );
}
