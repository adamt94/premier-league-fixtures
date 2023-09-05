import React, { useState, useEffect, useRef } from "react";
import { Button, Dimensions, Text, View } from "react-native";
import Fixture from "./Fixture";
import useGameWeeks from "../util/useGameWeeks";
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
      return week[0].fixture.date;
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
                <Text className="text-onPrimaryFixed text-xl pt-6">
                  Gameweek {index + 1}
                </Text>

                <ScrollView className="w-full">
                  {fixturesForWeeks[index].map((fixture, findex) => {
                    const previousFixture =
                      findex > 0
                        ? fixturesForWeeks[index][findex - 1]
                        : undefined;
                    const sameDay =
                      previousFixture &&
                      isSameDay(
                        fixture.fixture.date,
                        previousFixture.fixture.date
                      );

                    return (
                      <Fixture
                        key={fixture.fixture.id}
                        date={fixture.fixture.date}
                        showDate={!sameDay}
                        homeTeam={fixture.teams.home.name}
                        awayTeam={fixture.teams.away.name}
                        homeScore={fixture.goals.home}
                        awayScore={fixture.goals.away}
                        homeTeamLogo={fixture.teams.home.logo}
                        awayTeamLogo={fixture.teams.away.logo}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </>
          );
        }}
      />
    </View>
  );
};
