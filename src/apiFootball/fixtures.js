import footballApi, { FOOTBALL_API_TIMEZONE } from "../apiFootball/api";
import { CURRENT_LEAGUE } from "./leagues";
import { CURRENT_SEASON } from "./seasons";
import { getCurrentRound } from "./rounds";

export const getFixture = async (fixtureId) => {
  const res = await footballApi('/fixtures', {
    id: fixtureId,
    timezone: FOOTBALL_API_TIMEZONE,
  });

  if (res.data.results === 0) {
    return false;
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
  fixtures.sort((a, b) => {
    if (a.fixture.date > b.fixture.date) return 1;
    if (a.fixture.date == b.fixture.date) return 0;
    if (a.fixture.date < b.fixture.date) return -1;
  });

  return fixtures;
}