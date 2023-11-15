import { Text, View } from "react-native";
import { getHoursMins } from "../util/dateFormat";

type FixtureProps = {
  date: number;
  homeScore: number | null;
  awayScore: number | null;
  showScore?: boolean;
};

export default function FixtureScore({
  date,
  homeScore,
  awayScore,
  showScore = false,
}: FixtureProps) {
  return (
    <View
      className={`flex flex-row items-center justify-center bg-primaryContainer dark:bg-primaryContainerDark w-16 h-7 rounded-full`}
    >
      {showScore
        ? (
          <Text className="text-onPrimaryContainer dark:text-onPrimaryContainerDark">
            {homeScore} - {awayScore}
          </Text>
        )
        : (
          <Text className="text-onPrimaryContainer dark:text-onPrimaryContainerDark">
            {getHoursMins(date)}
            {" "}
          </Text>
        )}
    </View>
  );
}
