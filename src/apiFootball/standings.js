import footballApi from "./api";
import { CURRENT_SEASON } from "./seasons";

export const getStandings = async (leagueId, season = CURRENT_SEASON) => {
  if (leagueId === undefined) {
    throw new Error('league 파라미터 없음');
  }

  try {
    const res = await footballApi('/standings', {
      league: leagueId,
      season: season,
    });

    return res.data.results > 0 ? res.data.response[0] : new Error('데이터를 불러오지 못했습니다');
  } catch (err) {
    console.error(err);
  }
}
