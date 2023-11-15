import { Image, Text, useColorScheme, View } from "react-native";
import { formatDate, getHoursMins } from "../util/dateFormat";
import FixtureScore from "./FixtureScore";

type FixtureProps = {
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
    <View className="flex flex-col items-center justify-center">
      {showDate && (
        <Text className="text-outline dark:text-outlineDark text-base pt-5">
          {formatDate(date)}
        </Text>
      )}
      <View className="flex flex-row justify-start gap-1 py-2  w-full">
        <View className="flex flex-row flex-1 justify-end gap-1 ">
          <Text className="text-onSurface dark:text-onSurfaceDark text-right">
            {abrvName(homeTeam)}
          </Text>
          <Image
            source={{ uri: homeTeamLogo }}
            style={{ width: 25, height: 25 }}
          />
        </View>
        <View className="flex justify-center">
          <FixtureScore
            date={date}
            showScore={showScore}
            homeScore={homeScore}
            awayScore={awayScore}
          />
        </View>
        <View className="flex flex-row flex-1 gap-1">
          <Image
            source={{ uri: awayTeamLogo }}
            style={{ width: 25, height: 25 }}
          />
          <Text className="text-onSurface dark:text-onSurfaceDark ">
            {abrvName(awayTeam)}
          </Text>
        </View>
      </View>
    </View>
  );
}
