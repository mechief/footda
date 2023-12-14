import footdaApi from "./api";

import { MissingRequiredParamError, InvalidParamError } from "../errors/validationError";
import { NoResultError } from "../errors/footballAPIError";

import { isServiceLeague } from "../utils/league";
import { getCurrentSeason } from "../utils/season";

export const getTopPlayers = async (leagueId) => {
  if (!leagueId) {
    throw new MissingRequiredParamError('league');
  }
  
  if (!isServiceLeague(leagueId)) {
    throw new InvalidParamError('leagueId');
  }

  try {
    const res = await footdaApi('/top-players/' + leagueId, {
      season: getCurrentSeason(leagueId),
    });

    if (res.data.meta.results === 0) {
      throw new NoResultError;
    }

    return res.data.datas;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
