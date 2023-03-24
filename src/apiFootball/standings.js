import footballApi from "./api";

import { MissingRequiredParamError, InvalidParamError } from "../errors/validationError";
import { NoResultError } from "../errors/footballAPIError";

import { CURRENT_SEASON } from "../constants";
import { isServiceLeague } from "../service/apiFootballService";

export const getStandings = async (leagueId, season = CURRENT_SEASON) => {
  if (!leagueId) {
    throw new MissingRequiredParamError('league');
  }
  
  if (!isServiceLeague(leagueId)) {
    throw new InvalidParamError('leagueId');
  }

  try {
    const res = await footballApi('/standings', {
      league: leagueId,
      season: season,
    });

    if (res.data.results === 0 || !res.data.response[0]?.league?.standings[0]) {
      throw new NoResultError;
    }

    return res.data.response[0]?.league?.standings[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}
