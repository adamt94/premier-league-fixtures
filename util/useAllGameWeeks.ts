import { useEffect, useState } from "react";
import { gameWeekSchedule } from "../constants/gameWeekSchedule";
import { getGameWeek } from "./dateFormat";

type GameWeek = {
  totalGameweeks: number;
  fixturesForWeeks: Fixture[][];
};

const useAllGameWeeks = (fixtures: Fixture[]): GameWeek => {
  const [totalGameweeks, setTotalGameweeks] = useState<number>(0);
  const [fixturesForWeeks, setFixturesForWeeks] = useState<Fixture[][]>([]);

  useEffect(() => {
    const sortedFixtures = fixtures.sort(
      (a, b) =>
        new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime()
    );

    const gameWeeks: Fixture[][] = [];

    sortedFixtures.forEach((fixture) => {
      const gameWeekIndex = getGameWeek(fixture.fixture.date);
      if (!gameWeeks[gameWeekIndex]) {
        gameWeeks[gameWeekIndex] = [];
      }
      gameWeeks[gameWeekIndex].push(fixture);
    });

    setTotalGameweeks(gameWeeks.length);
    setFixturesForWeeks(gameWeeks);
  }, [fixtures]);

  return { totalGameweeks, fixturesForWeeks };
};

export default useAllGameWeeks;
