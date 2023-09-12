interface Fixture {
  date: string;
  league: string;
  leagueLogo: string;
  homeTeam: string;
  homeTeamLogo: string;
  awayTeam: string;
  awayTeamLogo: string;
  homeScore: number;
  awayScore: number;
  season: string;
}

type ApiFixture = {
  data: [
    {
      type: string;
      id: number;
      attributes: {
        date: string;
        league: string;
        leagueLogo: string;
        homeTeam: string;
        homeTeamLogo: string;
        awayTeam: string;
        awayTeamLogo: string;
        homeScore: number;
        awayScore: number;
        season: string;
      };
    }
  ];
};
