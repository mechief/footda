import { SERVICE_LEAGUES, LEAGUE_RULES } from "../constants/league";

export const isServiceLeague = (leagueId) => {
  return SERVICE_LEAGUES.has(+leagueId);
}

export const getLeagueNameKr = (leagueId) => {
  if (!isServiceLeague(leagueId)) {
    return null;
  }
  return SERVICE_LEAGUES.get(+leagueId).nameKr;
}

export const getLeagueNameForList = (leagueId) => {
  if (!isServiceLeague(leagueId)) {
    return null;
  }

  return SERVICE_LEAGUES.get(+leagueId).nameShort || SERVICE_LEAGUES.get(+leagueId).nameKr;
}

export const getLeagueType = (leagueId) => {
  if (!isServiceLeague(leagueId)) {
    return null;
  }
  
  return SERVICE_LEAGUES.get(+leagueId).type;
}

export const getLeagueRegion = (leagueId) => {
  if (!isServiceLeague(leagueId)) {
    return null;
  }
  
  return SERVICE_LEAGUES.get(+leagueId).region;
}

export const getLeagueColor = (leagueId) => {
  if (!isServiceLeague(leagueId)) {
    return null;
  }

  const leagueData = SERVICE_LEAGUES.get(+leagueId);
  return leagueData.color ?? null;
}

export const getServiceLeagueIds = ({type, country} = {}) => {
  if (type && country) {
    return Array.from(SERVICE_LEAGUES.keys()).filter(leagueId => {
      return SERVICE_LEAGUES.get(leagueId).type === type
        && SERVICE_LEAGUES.get(leagueId).country === country;
    });
  } else if (type) {
    return Array.from(SERVICE_LEAGUES.keys()).filter(leagueId => {
      return SERVICE_LEAGUES.get(leagueId).type === type;
    });
  } else if (country) {
    return Array.from(SERVICE_LEAGUES.keys()).filter(leagueId => {
      return SERVICE_LEAGUES.get(leagueId).country === country;
    });
  }

  return Array.from(SERVICE_LEAGUES.keys());
}

export const getLeagueRule = (leagueId) => {
  const id = ''+leagueId;

  if (!isServiceLeague(id)) {
    return null;
  }

  return LEAGUE_RULES[id];
}