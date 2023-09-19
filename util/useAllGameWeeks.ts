import { useEffect, useState } from "react";
import { gameWeekSchedule } from "../constants/gameWeekSchedule";
import { findCurrentGameWeek, getFixtureGameWeekIndex } from "./dateFormat";

type GameWeek = {
  totalGameweeks: number;
  fixturesByGameWeeks: Fixture[][];
  currentGameWeek: number;
};

const useAllGameWeeks = (fixtures: Fixture[]): GameWeek => {
  const [totalGameweeks, setTotalGameweeks] = useState<number>(0);
  const [fixturesByGameWeeks, setFixturesByGameWeeks] = useState<Fixture[][]>(
    []
  );
  const [currentGameWeek, setCurrentGameWeek] = useState<number>(-1);

  useEffect(() => {
    const sortedFixtures = fixtures.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const gameWeeks: Fixture[][] = [];

    sortedFixtures.forEach((fixture) => {
      const gameWeekIndex = getFixtureGameWeekIndex(fixture.date);
      if (!gameWeeks[gameWeekIndex]) {
        gameWeeks[gameWeekIndex] = [];
      }
      gameWeeks[gameWeekIndex].push(fixture);
    });

    const gameWeekDates: string[] = gameWeeks.map((week) => {
      return week[0].date;
    });

    const currentGameWeek = findCurrentGameWeek(gameWeekDates);
    setTotalGameweeks(gameWeeks.length);
    setFixturesByGameWeeks(gameWeeks);
    setCurrentGameWeek(currentGameWeek);
  }, [fixtures]);

  return { totalGameweeks, fixturesByGameWeeks, currentGameWeek };
};

export default useAllGameWeeks;
