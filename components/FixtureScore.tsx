import { View, Text } from "react-native";
import { getHoursMins } from "../util/dateFormat";

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
    <View
      className={`flex flex-row items-center justify-center bg-primaryContainerDark dark:bg-primaryContainerDark w-16 h-7 rounded-full`}
    >
      {homeScore === null || awayScore === null ? (
        <Text className="text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          {getHoursMins(date)}{" "}
        </Text>
      ) : (
        <Text className="text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          {homeScore} - {awayScore}
        </Text>
      )}
    </View>
  );
}
