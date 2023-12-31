export type Team = {
  name: string;
  club: {
    name: string;
    shortName: string;
    abbr: string;
    id: number;
  };
  teamType: string;
  shortName: string;
  id: number;
  altIds: {
    opta: string;
  };
};

export type Ground = {
  name: string;
  city: string;
  source: string;
  id: number;
};

export type Gameweek = {
  id: number;
  compSeason: {
    label: string;
    competition: {
      abbreviation: string;
      description: string;
      level: string;
      source: string;
      id: number;
      altIds: {
        opta: string;
      };
    };
    id: number;
  };
  gameweek: number;
  competitionPhase: {
    id: number;
    type: string;
    gameweekRange: [number, number];
  };
};

export type Kickoff = {
  completeness: number;
  millis: number;
  label: string;
};

export type ProvisionalKickoff = {
  completeness: number;
  millis: number;
  label: string;
};

export type Fixture = {
  gameweek: Gameweek;
  kickoff: Kickoff;
  provisionalKickoff: ProvisionalKickoff;
  teams: [{ team: Team; score?: number }, { team: Team; score?: number }];
  replay: boolean;
  ground: Ground;
  neutralGround: boolean;
  status: string;
  phase: string;
  fixtureType: string;
  extraTime: boolean;
  shootout: boolean;
  goals: any[]; // Define a more specific export type for goals if needed
  penaltyShootouts: any[]; // Define a more specific export type for penaltyShootouts if needed
  behindClosedDoors: boolean;
  id: number;
  altIds: {
    opta: string;
  };
};

export type FootballFixtureData = {
  pageInfo: {
    page: number;
    numPages: number;
    pageSize: number;
    numEntries: number;
  };
  content: Fixture[];
};

////// TABLE TYPES///////

export type Entry = {
  team: Team;
  position: number;
  startingPosition: number;
  overall: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalsDifference: number;
    points: number;
  };
  home: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalsDifference: number;
    points: number;
    position: number;
  };
  away: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalsDifference: number;
    points: number;
    position: number;
  };
  annotations: {
    type: string;
    destination: string;
  }[];
  form: {
    gameweek: Gameweek;
    kickoff: Kickoff;
    teams: {
      team: Team;
      score: number;
    }[];
    replay: boolean;
    ground: Ground;
    neutralGround: boolean;
    status: string;
    phase: string;
    outcome: string;
    attendance: number;
    clock: {
      secs: number;
      label: string;
    };
    fixtureType: string;
    extraTime: boolean;
    shootout: boolean;
    behindClosedDoors: boolean;
    id: number;
    altIds: {
      opta: string;
    };
  }[];
  next: {
    gameweek: Gameweek;
    kickoff: Kickoff;
    teams: {
      team: Team;
    }[];
    replay: boolean;
    ground: Ground;
    neutralGround: boolean;
    status: string;
    phase: string;
    fixtureType: string;
    extraTime: boolean;
    shootout: boolean;
    behindClosedDoors: boolean;
    id: number;
    altIds: {
      opta: string;
    };
  };
  ground: Ground;
};

export type CompSeason = {
  label: string;
  competition: {
    abbreviation: string;
    description: string;
    level: string;
    source: string;
    id: number;
    altIds: {
      opta: string;
    };
  };
  id: number;
};

export type FootballTablesData = {
  compSeason: CompSeason;
  live: boolean;
  dynamicallyGenerated: boolean;
  tables: [{ entries: Entry[]; gameWeek: number }];
};

/// FIXTURE DETAILS TYPES ///

type MatchOfficial = {
  matchOfficialId: number;
  role: string;
  birth: {};
  name: {
    display: string;
    first: string;
    last: string;
  };
  id: number;
};

export type Player = {
  matchPosition: string;
  matchShirtNumber: number;
  captain: boolean;
  playerId: number;
  info: {
    position: string;
    shirtNum: number;
    positionInfo: string;
  };
  nationalTeam: {
    isoCode: string;
    country: string;
    demonym: string;
  };
  birth: {
    date: {
      millis: number;
      label: string;
    };
    country: {
      isoCode: string;
      country: string;
      demonym: string;
    };
    place: string;
  };
  age: string;
  name: {
    display: string;
    first: string;
    last: string;
  };
  id: number;
  altIds: {
    opta: string;
  };
};

export type TeamList = {
  teamId: number;
  lineup: Player[];
  substitutes: Player[];
  formation: {
    label: string;
    players: number[][];
  };
};

export type Event = {
  clock: {
    secs: number;
    label: string;
  };
  phase: string;
  type: string;
  time: {
    millis: number;
    label: string;
  };
  score: {
    homeScore: number;
    awayScore: number;
  };
  id?: number;
  personId?: number;
  teamId?: number;
  assistId?: number;
  description?: string;
};

export type FootballFixtureDetailsData = {
  gameweek: Gameweek;
  kickoff: Kickoff;
  provisionalKickoff: Kickoff;
  teams: [{ team: Team; score: number }, { team: Team; score: number }];
  replay: boolean;
  ground: Ground;
  neutralGround: boolean;
  status: string;
  phase: string;
  outcome: string;
  clock: {
    secs: number;
    label: string;
  };
  fixtureType: string;
  extraTime: boolean;
  shootout: boolean;
  matchOfficials: MatchOfficial[];
  halfTimeScore: {
    homeScore: number;
    awayScore: number;
  };
  teamLists: TeamList[];
  events: Event[];
  penaltyShootouts: any[]; // You can define a type for penaltyShootouts if needed
  behindClosedDoors: boolean;
  id: number;
  altIds: {
    opta: string;
  };
};
