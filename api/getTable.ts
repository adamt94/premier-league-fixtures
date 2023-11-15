import { FootballFixtureData, FootballTablesData } from "./types";

const url =
  "https://footballapi.pulselive.com/football/standings?comps=1&page=0&pageSize=800&compSeasons=578&sort=asc&altIds=true";
const headers = {
  Origin: "https://www.premierleague.com",
};

export async function getTable(): Promise<FootballTablesData | null> {
  try {
    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: FootballTablesData = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
