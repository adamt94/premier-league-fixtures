import { Image, Text, View } from "react-native";

type HeaderProps = {
  homeTeamName: string;
  awayTeamName: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  homeScore?: number | null;
  awayScore?: number | null;
  date: string;
  league: string;
  showScore?: boolean;
  clock?: string;
};

const Header = ({
  homeTeamName,
  awayTeamName,
  homeTeamLogo,
  awayTeamLogo,
  homeScore,
  awayScore,
  showScore = false,
  league,
  clock,
}: HeaderProps) => {
  return (
    <View className="flex flex-col items-center justify-center">
      <View className="flex flex-row justify-between w-full p-2">
        <Text className="text-lg text-tertiary dark:text-tertiaryDark text-left">
          {league}
        </Text>
        <View className="bg-tertiaryContainer p-1 px-3 rounded-full">
          <Text className="text-sm text-on text-onTertiaryContainer dark:text-onTertiaryContainerDark text-left">
            {clock?.replace(/0{2}$/, "")}
          </Text>
        </View>
      </View>
      <View className="flex flex-row w-full justify-evenly items-center">
        <View className="flex flex-col  items-center p-4 gap-2 w-1/3">
          <Image
            className=""
            source={{ uri: homeTeamLogo }}
            style={{ width: 45, height: 45 }}
          />
          <Text className="text-lg text-onSurface dark:text-onSurfaceDark">
            {homeTeamName}
          </Text>
        </View>
        <View className="flex justify-center">
          {!showScore && (
            <Text className="text-base text-onSurface dark:text-onSurfaceDark">
              vs
            </Text>
          )}
          {showScore && (
            <View className="flex flex-row items-center gap-10">
              <Text className="text-4xl text-outline dark:text-outlineDark">
                {homeScore}
              </Text>
              <Text className="text-4xl text-outline dark:text-outlineDark">
                -
              </Text>

              <Text className="text-4xl text-outline dark:text-outlineDark">
                {awayScore}
              </Text>
            </View>
          )}
        </View>
        <View className="flex flex-col items-center p-4 gap-2 w-1/3">
          <Image
            className=""
            source={{ uri: awayTeamLogo }}
            style={{ width: 45, height: 45 }}
          />
          <Text className="text-lg text-center text-onSurface dark:text-onSurfaceDark">
            {awayTeamName}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
