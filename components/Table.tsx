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
};
type TableProps = {
  teams: TableTeam[];
};

const ClubComponent = ({ name, image }: { name: string; image: string }) => {
  return (
    <View className="flex flex-row items-center justify-center gap-2">
      <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />

      <Text className="text-onSurface dark:text-onSurfaceDark">{name}</Text>
    </View>
  );
};

const Table = ({ teams }: TableProps) => {
  console.log(teams);
  return (
    <View className="flex bg-surfaceContainer dark:bg-surfaceContainerDark">
      <View className="flex-row p-1">
        <Text className="text-onSurface dark:text-onSurfaceDark w-2/12 text-center">
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
        <View key={index} className="flex-row text-center p-2">
          <Text className="text-onSurface dark:text-onSurfaceDark w-2/12 text-center">
            {team.position}
          </Text>
          <View className="text-onSurface dark:text-onSurfaceDark w-4/12 text-center">
            <ClubComponent name={team.name} image={team.icon} />
          </View>
          <Text className="text-onSurface dark:text-onSurfaceDark w-1/12 text-center">
            {team.played}
          </Text>
          <Text className="text-onSurface dark:text-onSurfaceDark w-1/12 text-center">
            {team.wins}
          </Text>
          <Text className="text-onSurface dark:text-onSurfaceDark w-1/12 text-center">
            {team.draws}
          </Text>
          <Text className="text-onSurface dark:text-onSurfaceDark w-1/12 text-center">
            {team.losses}
          </Text>
          <Text className="text-onSurface dark:text-onSurfaceDark w-1/12 text-center">
            {team.points}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  cell: {
    fontSize: 16,
  },
});

export default Table;
