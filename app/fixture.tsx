import { useColorScheme } from "react-native";
import data from "../assets/data/fixtures.json";
import { GameWeek } from "../components/GameWeek";
import { View } from "../components/Themed";

export default function FixturesScreen() {
  const fixtures = data as unknown as Fixture[];
  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? "bg-surfaceContainerDark" : "bg-surfaceContainer";
  return (
    <View className={bgColor}>
      <GameWeek fixtures={fixtures} />
    </View>
  );
}
