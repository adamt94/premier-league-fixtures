import data from "../assets/data/fixtures.json";
import { GameWeek } from "../components/GameWeek";
import { View } from "../components/Themed";

export default function FixturesScreen() {
  const fixtures = data as unknown as Fixture[];

  return (
    <View className="bg-surfaceContainer">
      <GameWeek fixtures={fixtures} />
    </View>
  );
}
