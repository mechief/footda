import footballApi from "./api";
import { CURRENT_SEASON } from "./seasons";
import { isServiceLeague } from "../service/apiFootballService";

const getTopScorers = async (leagueId, season = CURRENT_SEASON) => {
  if (leagueId === undefined) {
    throw new Error('league 파라미터 없음');
  }

  try {
    const res = await footballApi('/players/topscorers', {
      league: leagueId,
      season: season,
    });

    if (res.data.results === 0) {
      throw new Error('데이터를 불러오지 못했습니다');
    }

    return res.data.response;
  } catch (err) {
    console.error(err);
    throw err;
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

    if (res.data.results === 0) {
      throw new Error('데이터를 불러오지 못했습니다');
    }

    return res.data.response;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const getTopPlayers = async (leagueId, season = CURRENT_SEASON) => {
  if (leagueId === undefined) {
    throw new Error('league 파라미터 없음');
  }

  if (!isServiceLeague(leagueId)) {
    throw new Error('서비스 하지 않는 리그입니다.'); 
  }

  let promises = await Promise.all([
      footballApi('/players/topscorers', {
        league: leagueId,
        season: season,
      }),
      footballApi('/players/topassists', {
        league: leagueId,
        season: season,
      })
    ]).then((res) => {
      if (res[0].data.results === 0 || res[1].data.results === 0) {
        throw new Error('데이터를 불러오지 못했습니다');
      }
      
      return [res[0].data.response, res[1].data.response];
    }).catch((err) => {
      console.error(err);
      throw err;
    });

  return promises;
}