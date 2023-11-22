import { Dimensions, View } from "react-native";
import FootballPitch from "../svg/FootballPitch";
import LineUpPlayer from "./LineUpPlayer";
import { Text } from "../Themed";
import { Player, TeamList } from "../../api/types";

type Theme = {
  textColor: string;
  backgroundColor: string;
  borderColor: string;
};
type LineUpGraphicProps = {
  theme: Theme;
  awayTheme?: Theme;
  homeTeamLineUp?: TeamList;
  awayTeamLineUp?: TeamList;
};

type CreatePlayersProps = {
  theme: Theme;
  players: Player[];
};

const deviceWidth = Dimensions.get("window").width;

const CreatePlayers = ({ theme, players }: CreatePlayersProps) => {
  return (
    <View className="flex flex-row justify-center m-auto">
      {players.map((player) => {
        let displayName = player.name.display;
        if (displayName.split(" ").length > 1) {
          displayName = displayName.split(" ")[0].charAt(0) +
            "." +
            displayName.split(" ")[1];
        }
        return (
          <LineUpPlayer
            playerName={displayName}
            number={player.info.shirtNum}
            textColor={theme.textColor}
            borderColor={theme.borderColor}
            backgroundColor={theme.backgroundColor}
            subbed={false}
            yellowCard={false}
            redCard={false}
            goal={false}
          />
        );
      })}
    </View>
  );
};

export default function LineUpGraphic({
  theme,
  awayTheme = theme,
  homeTeamLineUp,
  awayTeamLineUp,
}: LineUpGraphicProps) {
  if (!homeTeamLineUp || !awayTeamLineUp) {
    return null;
  }

  const defenders = homeTeamLineUp.lineup.filter((player) => {
    return player.info.position === "D";
  });
  const goalkeeper = homeTeamLineUp.lineup.filter((player) => {
    return player.info.position === "G";
  });

  const midfielders = homeTeamLineUp.lineup.filter((player) => {
    return player.info.position === "M";
  });
  const strikers = homeTeamLineUp.lineup.filter((player) => {
    return player.info.position === "F";
  });

  const awayDefenders = awayTeamLineUp.lineup.filter((player) => {
    return player.info.position === "D";
  });
  const awayGoalkeeper = awayTeamLineUp.lineup.filter((player) => {
    return player.info.position === "G";
  });

  const awayMidfielders = awayTeamLineUp.lineup.filter((player) => {
    return player.info.position === "M";
  });
  const awayStrikers = awayTeamLineUp.lineup.filter((player) => {
    return player.info.position === "F";
  });

  const imageHeight = (deviceWidth * 111) / 74;

  return (
    <View
      className="surface relative"
      style={{ width: deviceWidth, height: imageHeight }}
    >
      <FootballPitch backgroundColor="#34a853" strokeColor="#79c388" />
      <View className="absolute top-0 left-0  w-full">
        <View className="flex flex-col ">
          <CreatePlayers theme={theme} players={goalkeeper} />
          <CreatePlayers theme={theme} players={defenders} />
          <CreatePlayers theme={theme} players={midfielders} />
          <CreatePlayers theme={theme} players={strikers} />
        </View>
      </View>
      <View className="absolute bottom-0 left-0  w-full ">
        <View className="flex flex-col ">
          <CreatePlayers theme={awayTheme} players={awayStrikers} />
          <CreatePlayers theme={awayTheme} players={awayMidfielders} />
          <CreatePlayers theme={awayTheme} players={awayDefenders} />
          <CreatePlayers theme={awayTheme} players={awayGoalkeeper} />
        </View>
      </View>
    </View>
  );
}
