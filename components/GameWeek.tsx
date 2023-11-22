import React, { useEffect, useRef } from "react";
import { Dimensions, Text, View } from "react-native";
import { formatDate, isSameDay } from "../util/dateFormat";
import useAllGameWeeks from "../util/useAllGameWeeks";
import Carousel from "react-native-reanimated-carousel";
import { Fixture as FixtureType } from "../api/types";
import Fixture from "./Fixture";

type GameWeekProps = {
  fixtures: FixtureType[];
};

export const GameWeek = ({ fixtures }: GameWeekProps) => {
  const { width, height } = Dimensions.get("window");
  const { fixturesByGameWeeks, totalGameweeks, currentGameWeek } =
    useAllGameWeeks(fixtures);
  const carouselRef: any = useRef(null);

  if (
    totalGameweeks === 0 ||
    currentGameWeek === -1 ||
    !fixturesByGameWeeks ||
    fixturesByGameWeeks.size === 0
  ) {
    return null;
  }
  return (
    <Carousel
      ref={carouselRef}
      loop={true}
      vertical={false}
      width={width}
      height={height}
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
      windowSize={10}
      defaultIndex={currentGameWeek}
      autoPlay={false}
      data={[...new Array(totalGameweeks).keys()]}
      scrollAnimationDuration={1000}
      onSnapToItem={(index) => console.log("current index:", index)}
      renderItem={({ index }) => {
        return (
          <>
            <View key={index} className="flex flex-col items-center mb-16">
              <Text className="text-onSurfaceVariant dark:text-onSurfaceVariantDark text-lg pt-6">
                Gameweek {index + 1}
              </Text>

              <View className="w-full">
                {fixturesByGameWeeks.get(index + 1).map((item, gindex) => {
                  const previousFixture =
                    gindex > 0 ? fixturesByGameWeeks.get(index + 1) : null;
                  const sameDay = Boolean(
                    previousFixture &&
                    isSameDay(
                      previousFixture[gindex - 1].kickoff.millis,
                      item.kickoff.millis,
                    ),
                  );

                  return (
                    <Fixture
                      id={item.id}
                      key={gindex}
                      date={item.kickoff.millis}
                      showDate={!sameDay}
                      showScore={item.status !== "U"}
                      homeTeam={item.teams[0].team.shortName}
                      awayTeam={item.teams[1].team.shortName}
                      homeScore={item.teams[0].score || 0}
                      awayScore={item.teams[1].score || 0}
                      homeTeamLogo={`https://resources.premierleague.com/premierleague/badges/70/${item.teams[0].team.altIds.opta}.png`}
                      awayTeamLogo={`https://resources.premierleague.com/premierleague/badges/70/${item.teams[1].team.altIds.opta}.png`}
                    />
                  );
                })}
              </View>
            </View>
          </>
        );
      }}
    />
  );
};
