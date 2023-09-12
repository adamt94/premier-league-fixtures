import React, { useState, useEffect, useRef } from "react";
import { Button, Dimensions, Text, View, useColorScheme } from "react-native";
import Fixture from "./Fixture";
import { findClosestDateIndex, isSameDay } from "../util/dateFormat";
import { ScrollView } from "react-native-gesture-handler";
import useAllGameWeeks from "../util/useAllGameWeeks";
import Carousel from "react-native-reanimated-carousel";

type GameWeekProps = {
  fixtures: Fixture[];
};

export const GameWeek = ({ fixtures }: GameWeekProps) => {
  const { width, height } = Dimensions.get("window");
  const { fixturesForWeeks, totalGameweeks } = useAllGameWeeks(fixtures);
  const carouselRef: any = useRef(null);

  useEffect(() => {
    const gameWeekDates: string[] = fixturesForWeeks.map((week) => {
      return week[0].date;
    });
    const currentWeekIndex = findClosestDateIndex(gameWeekDates);
    if (currentWeekIndex !== -1 && carouselRef.current) {
      carouselRef.current.scrollTo({
        index: currentWeekIndex - 1,
        animated: false,
      });
    }
  }, [fixturesForWeeks, carouselRef]);
  return (
    <View key="1" className="flex ">
      <Carousel
        ref={carouselRef}
        loop={true}
        vertical={false}
        width={width}
        height={height}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        windowSize={5}
        defaultIndex={0}
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
                  {fixturesForWeeks[index]?.length &&
                    fixturesForWeeks[index].map((fixture, findex) => {
                      const previousFixture =
                        findex > 0
                          ? fixturesForWeeks[index][findex - 1]
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
    </View>
  );
};
