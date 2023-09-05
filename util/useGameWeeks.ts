import { useEffect, useState } from "react";

type GameWeek = {
    totalGameweeks: number;
    fixturesForSelectedWeek: Fixture[];
  };

  const useGameWeeks = (fixtures: Fixture[], selectedWeek: number): GameWeek => {
    const [totalGameweeks, setTotalGameweeks] = useState<number>(0);
    const [fixturesForSelectedWeek, setFixturesForSelectedWeek] = useState<Fixture[]>([]);
  
    useEffect(() => {
      const sortedFixtures = fixtures.sort(
        (a, b) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime()
      );
  
      const gameWeeks: Fixture[][] = [];
  
      sortedFixtures.forEach((fixture) => {
        const fixtureDate = new Date(fixture.fixture.date);
  
        let gameWeek = gameWeeks.find(
          (gameWeek) =>
            new Date(gameWeek[0].fixture.date).getMonth() === fixtureDate.getMonth() &&
            new Date(gameWeek[0].fixture.date).getFullYear() === fixtureDate.getFullYear() &&
            Math.abs(new Date(gameWeek[0].fixture.date).getDate() - fixtureDate.getDate()) <= 7
        );
  
        if (!gameWeek) {
          gameWeek = [];
          gameWeeks.push(gameWeek);
        }
  
        gameWeek.push(fixture);
      });
  
      setTotalGameweeks(gameWeeks.length);
  
      const selectedWeekFixtures = gameWeeks[selectedWeek - 1] || [];
      setFixturesForSelectedWeek(selectedWeekFixtures);
    }, [fixtures, selectedWeek]);
  
    return { totalGameweeks, fixturesForSelectedWeek };
  };
  
  export default useGameWeeks;