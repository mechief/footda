import { 
  SEASON_BASIC,
  SEASON_EUROPE,
  SEASON_EUROPE_CONTINENTAL,
  SEASON_ASIA,
  SEASON_ASIA_CONTINENTAL,
} from "../constants/season";

import { getLeagueType, getLeagueRegion } from "./league";

const seasonMap = {
  europe: {
    league: SEASON_EUROPE,
    cup: SEASON_EUROPE,
    continental: SEASON_EUROPE_CONTINENTAL,
  },
  asia: {
    league: SEASON_ASIA,
    cup: SEASON_ASIA,
    continental: SEASON_ASIA_CONTINENTAL,
  }
}

export const getCurrentSeason = (leagueId = null) => {
  if (!leagueId) {
    return SEASON_BASIC;
  }
  
  const type = getLeagueType(leagueId);
  const region = getLeagueRegion(leagueId);

  return seasonMap[region][type];
}