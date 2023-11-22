import { FootballFixtureDetailsData } from "./types";

const headers = {
  Origin: "https://www.premierleague.com",
};

export async function getFixtureDetails(
  fixtureId: string,
): Promise<FootballFixtureDetailsData | null> {
  const url =
    `https://footballapi.pulselive.com/football/fixtures/${fixtureId}?altIds=true`;
  try {
    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: FootballFixtureDetailsData = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
