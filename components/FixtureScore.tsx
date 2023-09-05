import { View, Text, Image } from "react-native";
import { formatDate, getHoursMins } from "../util/dateFormat";

type FixtureProps = {
  date: string;
  homeScore: number | null;
  awayScore: number | null;
};

export default function FixtureScore({
  date,
  homeScore,
  awayScore,
}: FixtureProps) {
  return (
    <View className="flex flex-row items-center justify-center w-16 bg-primaryContainer h-7 rounded-full">
      {homeScore === null || awayScore === null ? (
        <Text className="text-onPrimaryContainer"> {getHoursMins(date)} </Text>
      ) : (
        <Text className="text-onPrimaryContainer">
          {homeScore} - {awayScore}
        </Text>
      )}
    </View>
  );
}
