import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export type TableTeam = {
  position: number;
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  icon: string;
  startingPosition: number;
};
type TableProps = {
  teams: TableTeam[];
};

const ClubComponent = ({
  name,
  image,
  pos,
  prevPos,
}: {
  name: string;
  image: string;
  pos: number;
  prevPos: number;
}) => {
  let icon = "ellipse";
  let color = "grey";
  let size = 8;
  if (pos < prevPos) {
    icon = "chevron-up-outline";
    color = "green";
    size = 15;
  }
  if (pos > prevPos) {
    icon = "chevron-down-outline";
    color = "red";
    size = 15;
  }

  return (
    <View className="flex flex-row items-center justify-evenly">
      <Ionicons name={icon} size={size} color={color} />
      <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />

      <Text className="text-onSurfaceVariant dark:text-onSurfaceVariantDark">
        {name}
      </Text>
    </View>
  );
};

const Table = ({ teams }: TableProps) => {
  return (
    <View className="flex items-center w-full">
      <View className="flex-row p-2 px-0">
        <Text className="text-onSurface dark:text-onSurfaceDark w-1/12 text-center">
          Pos
        </Text>
        <Text className="text-onSurface dark:text-onSurfaceDark w-4/12 text-center">
          Club
        </Text>
        <Text className="text-onSurface dark:text-onSurfaceDark w-1/12 text-center">
          PL
        </Text>
        <Text className="text-onSurface dark:text-onSurfaceDark w-1/12 text-center">
          W
        </Text>
        <Text className="text-onSurface dark:text-onSurfaceDark w-1/12 text-center">
          D
        </Text>
        <Text className="text-onSurface dark:text-onSurfaceDark w-1/12 text-center">
          L
        </Text>
        <Text className="text-onSurface dark:text-onSurfaceDark w-1/12 text-center">
          Pts
        </Text>
      </View>
      {teams.map((team, index) => (
        <View className="flex w-full items-center" key={index}>
          <View key={index} className="flex-row text-center p-2 px-0">
            <Text className="text-onSurfaceVariant dark:text-onSurfaceDark w-1/12 text-center">
              {team.position}
            </Text>
            <View className="text-onSurfaceVariant dark:text-onSurfaceDark w-4/12 text-center">
              <ClubComponent
                name={team.name}
                image={team.icon}
                pos={team.position}
                prevPos={team.startingPosition}
              />
            </View>
            <Text className="text-onSurfaceVariant dark:text-onSurfaceDark w-1/12 text-center">
              {team.played}
            </Text>

            <Text className="text-onSurfaceVariant dark:text-onSurfaceDark w-1/12 text-center">
              {team.wins}
            </Text>
            <Text className="text-onSurfaceVariant dark:text-onSurfaceDark w-1/12 text-center">
              {team.draws}
            </Text>
            <Text className="text-onSurfaceVariant dark:text-onSurfaceDark w-1/12 text-center">
              {team.losses}
            </Text>
            <Text className="text-onSurfaceVariant dark:text-onSurfaceDark w-1/12 text-center">
              {team.points}
            </Text>
          </View>
          {(index == 0 || index === 3 || index === 4) && (
            <View className="border-primaryContainer dark:border-primaryContainerDark border border-1 w-full">
            </View>
          )}
          {index === 16 && (
            <View className="border-errorContainer dark:border-errorContainerDark border border-1 w-full">
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default Table;
