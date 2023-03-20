import footballApi, { FOOTBALL_API_TIMEZONE } from "../apiFootball/api";
import { getServiceLeagueIds } from "../service/apiFootballService";
import { CURRENT_SEASON } from "./seasons";

import { MissingRequiredParamError } from "../errors/validationError";
import { NoResultNotFoundError } from "../errors/footballAPIError";

export const getFixture = async (fixtureId) => {
  if (!fixtureId) {
    throw new MissingRequiredParamError('fixtureId');
  }
  
  const res = await footballApi('/fixtures', {
    id: fixtureId,
    timezone: FOOTBALL_API_TIMEZONE,
  });
  
  if (res.data.results === 0) {
    throw new NoResultNotFoundError;
  }

  return res.data.response[0];
}

export const getLiveFixtures = async () => {
  const arrLeagues = getServiceLeagueIds({type: 'league'});
  
  const res = await footballApi('/fixtures', {
    live: arrLeagues.join('-'),
    season: CURRENT_SEASON,
    timezone: FOOTBALL_API_TIMEZONE
  });

  if (res.data.results === 0) {
    return false;
  }

  let fixtures = res.data.response;

  // 경기일자 기준으로 재정렬
  fixtures.sort((a, b) => a.fixture.timestamp - b.fixture.timestamp);

  return fixtures;
}