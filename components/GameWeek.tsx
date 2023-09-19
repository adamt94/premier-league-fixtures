import React, { useEffect, useRef } from "react";
import { Dimensions, Text, View } from "react-native";
import Fixture from "./Fixture";
import { isSameDay } from "../util/dateFormat";
import useAllGameWeeks from "../util/useAllGameWeeks";
import Carousel from "react-native-reanimated-carousel";

type GameWeekProps = {
  fixtures: Fixture[];
};

export const GameWeek = ({ fixtures }: GameWeekProps) => {
  const { width, height } = Dimensions.get("window");
  const { fixturesByGameWeeks, totalGameweeks, currentGameWeek } =
    useAllGameWeeks(fixtures);
  const carouselRef: any = useRef(null);

  if (totalGameweeks === 0 || currentGameWeek === -1) {
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
                {fixturesByGameWeeks[index]?.length &&
                  fixturesByGameWeeks[index].map((fixture, findex) => {
                    const previousFixture =
                      findex > 0
                        ? fixturesByGameWeeks[index][findex - 1]
                        : undefined;
                    const sameDay =
                      previousFixture &&
                      isSameDay(fixture.date, previousFixture.date);

                    return (
                      <Fixture
                        key={findex}
                        date={fixture.date}
                        showDate={!sameDay}
                        homeTeam={fixture.homeTeam}
                        awayTeam={fixture.awayTeam}
                        homeScore={fixture.homeScore}
                        awayScore={fixture.awayScore}
                        homeTeamLogo={fixture.homeTeamLogo}
                        awayTeamLogo={fixture.awayTeamLogo}
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
