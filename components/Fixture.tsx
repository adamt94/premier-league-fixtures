import { View, Text, Image } from "react-native";
import { formatDate, getHoursMins } from "../util/dateFormat";
import FixtureScore from "./FixtureScore";

type FixtureProps = {
  date: string;
  showDate: boolean;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  homeTeamLogo: string;
  awayTeamLogo: string;
};

export default function Fixture({
  date,
  showDate = true,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  homeTeamLogo,
  awayTeamLogo,
}: FixtureProps) {
  const abreviateTeamName = (teamName: string) => {
    if (teamName === "Manchester United") {
      return "Man United";
    }
    if (teamName === "Manchester City") {
      return "Man City";
    }
    if (teamName === "Nottingham Forest") {
      return "Nottm Forest";
    }
    return teamName;
  };
  return (
    <View className="flex flex-col items-center justify-center">
      {showDate && (
        <Text className="text-onPrimaryFixedVariant text-base pt-5">
          {formatDate(date)}
        </Text>
      )}
      <View className="flex flex-row justify-start gap-1 py-2  w-full">
        <View className="flex flex-row flex-1 justify-end gap-1 ">
          <Text className="text-onSurface text-right">
            {abreviateTeamName(homeTeam)}
          </Text>
          <Image
            source={{ uri: homeTeamLogo }}
            style={{ width: 25, height: 25 }}
          />
        </View>
        <View className="flex justify-center">
          <FixtureScore
            date={date}
            homeScore={homeScore}
            awayScore={awayScore}
          />
        </View>
        <View className="flex flex-row flex-1 gap-1">
          <Image
            source={{ uri: awayTeamLogo }}
            style={{ width: 25, height: 25 }}
          />
          <Text className="text-onSurface">{abreviateTeamName(awayTeam)}</Text>
        </View>
      </View>
    </View>
  );
}
