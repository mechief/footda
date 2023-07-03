import footdaApi from "./api";

import { MissingRequiredParamError, InvalidParamError } from "../errors/validationError";
import { NoResultError } from "../errors/footballAPIError";

import { CURRENT_SEASON } from "../constants/season";
import { isServiceLeague } from "../utils/league";

export const getStandings = async (leagueId, season = CURRENT_SEASON) => {
  if (!leagueId) {
    throw new MissingRequiredParamError('league');
  }
  
  if (!isServiceLeague(leagueId)) {
    throw new InvalidParamError('leagueId');
  }

  try {
    const res = await footdaApi('/standings/' + leagueId, {
      season: season,
    });

    if (res.data.meta.results === 0 || !res.data.datas[0]) {
      throw new NoResultError;
    }

    return res.data.datas[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}
