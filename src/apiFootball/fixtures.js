import footballApi, { FOOTBALL_API_TIMEZONE } from "../apiFootball/api";
import { getServiceLeagueIds } from "../service/apiFootballService";
import { CURRENT_LEAGUE } from "./leagues";
import { CURRENT_SEASON } from "./seasons";
import { getCurrentRound } from "./rounds";

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

export const getRoundFixtures = async () => {
  // const round = await getCurrentRound({league: CURRENT_LEAGUE, season: CURRENT_SEASON});
  const round = 'Regular Season - 14';

  if (!round) {
    throw new Error('경기 정보 로드 실패');
  }

  const res = await footballApi('/fixtures', {
    league: CURRENT_LEAGUE,
    season: CURRENT_SEASON,
    round: round,
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

export const getFixturesFromDate = async (date) => {
  if (!date) {
    const now = new Date();
    date = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
  }
  const res = await footballApi('/fixtures', {
    from: date,
    to: '2023-01-20',
    league: CURRENT_LEAGUE,
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