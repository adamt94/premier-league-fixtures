import { useEffect, useState } from "react";
import { findCurrentGameWeek, getFixtureGameWeekIndex } from "./dateFormat";
import { Fixture } from "../api/types";

type GameWeek = {
  totalGameweeks: number;
  fixturesByGameWeeks: Map<number, Fixture[]>;
  currentGameWeek: number;
};

const useAllGameWeeks = (fixtures: Fixture[]): GameWeek => {
  const [totalGameweeks, setTotalGameweeks] = useState<number>(
    fixtures[0].gameweek.competitionPhase.gameweekRange[1],
  );
  const [fixturesByGameWeeks, setFixturesByGameWeeks] = useState<
    Map<number, Fixture[]>
  >(new Map());
  const [currentGameWeek, setCurrentGameWeek] = useState<number>(0);

  useEffect(() => {
    const gameWeeks: Map<number, Fixture[]> = new Map();

    for (let i = 0; i < fixtures.length; i++) {
      const fixturesGameWeek = fixtures[i].gameweek.gameweek as number;
      const currentItems = gameWeeks.get(fixturesGameWeek) || [];
      currentItems.push(fixtures[i]);
      gameWeeks.set(fixturesGameWeek, currentItems);
    }
    setFixturesByGameWeeks(gameWeeks);
  }, [fixtures, totalGameweeks]);

  useEffect(() => {
    const datesStrings = fixtures.map((fixture) => fixture.kickoff.millis);
    const currentGameWeek = findCurrentGameWeek(datesStrings);
    setCurrentGameWeek(fixtures[currentGameWeek].gameweek.gameweek as number);
  }, [fixtures]);

  return { totalGameweeks, fixturesByGameWeeks, currentGameWeek };
};

export default useAllGameWeeks;
