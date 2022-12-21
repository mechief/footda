import footballApi from "./api";
import { getDataByPromise } from "./actions";
import { CURRENT_SEASON } from "./seasons";

const getTopScorers = async (leagueId, season = CURRENT_SEASON) => {
  if (leagueId === undefined) {
    throw new Error('league 파라미터 없음');
  }

  try {
    const res = await footballApi('/players/topscorers', {
      league: leagueId,
      season: season,
    });

    return res.data.results > 0 ? res.data.response : new Error('데이터를 불러오지 못했습니다');
  } catch (err) {
    console.error(err);
  }
}

const getTopAssists = async (leagueId, season = CURRENT_SEASON) => {
  if (leagueId === undefined) {
    throw new Error('league 파라미터 없음');
  }

  try {
    const res = await footballApi('/players/topassists', {
      league: leagueId,
      season: season,
    });

    return res.data.results > 0 ? res.data.response : new Error('데이터를 불러오지 못했습니다');
  } catch (err) {
    console.error(err);
  }
}

export const getTopPlayers = async (leagueId, season = CURRENT_SEASON) => {
  let promises = await Promise.all([
      getDataByPromise(getTopScorers, leagueId, season),
      getDataByPromise(getTopAssists, leagueId, season),
    ]).then((res) => {
      return res;
    }).catch((err) => {
      console.error(err);
    });

  return promises;
}