import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import PlayerIcon from "../svg/PlayerIcon";

type NumberCircleProps = {
  number: number;
  borderColor: string;
  backgroundColor: string;
  textColor: string;
  playerName: string;
  subbed: boolean;
  yellowCard: boolean;
  redCard: boolean;
  goal: boolean;
};

const LineUpPlayer = ({
  number,
  borderColor,
  backgroundColor,
  textColor,
  playerName,
  subbed,
  yellowCard,
  redCard,
  goal,
}: NumberCircleProps) => {
  return (
    <View className="flex p-1  relative items-center w-1/5">
      <PlayerIcon
        borderColor={borderColor}
        backgroundColor={backgroundColor}
        size={30}
      >
        <Text style={{ color: textColor }}>{number}</Text>
      </PlayerIcon>
      {redCard && (
        <Ionicons
          name="tablet-portrait"
          style={{ position: "absolute", top: 5, left: 10 }}
          size={15}
          color="red"
        />
      )}
      {yellowCard && (
        <Ionicons
          name="tablet-portrait"
          style={{ position: "absolute", top: 5, left: 10 }}
          size={15}
          color="yellow"
        />
      )}

      {goal && (
        <View className="absolute" style={{ left: 5, bottom: 20 }}>
          <Ionicons name="football" size={20} />
        </View>
      )}

      {subbed && (
        <View className="absolute" style={{ right: 5, bottom: 20 }}>
          <Ionicons name="chevron-down" size={20} color="red" />
        </View>
      )}

      <Text className="font-bold text-xs pt-2" style={{ color: "white" }}>
        {playerName}
      </Text>
    </View>
  );
};

export default LineUpPlayer;
