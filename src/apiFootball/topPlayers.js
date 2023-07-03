import footballApi from "./api";

import { MissingRequiredParamError, InvalidParamError } from "../errors/validationError";
import { NoResultError } from "../errors/footballAPIError";

import { isServiceLeague } from "../utils/league";
import { getCurrentSeason } from "../utils/season";

export const getTopPlayers = async (leagueId) => {
  if (!leagueId) {
    throw new MissingRequiredParamError('leagueId');
  }

  if (!isServiceLeague(leagueId)) {
    throw new InvalidParamError('leagueId');
  }

  const season = getCurrentSeason(leagueId);

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
        throw new NoResultError;
      }
      
      return [res[0].data.response, res[1].data.response];
    }).catch((err) => {
      console.error(err);
      throw err;
    });

  return promises;
}