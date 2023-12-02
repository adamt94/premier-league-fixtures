import { FootballFixtureData } from "./types";

const url =
  "https://footballapi.pulselive.com/football/fixtures?comps=1&page=0&pageSize=800&compSeasons=578&sort=asc&altIds=true";
const headers = {
  Origin: "https://www.premierleague.com",
};

export async function getFixtures(): Promise<FootballFixtureData | null> {
  try {
    const response = await fetch(url, { method: "GET", headers });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: FootballFixtureData = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
