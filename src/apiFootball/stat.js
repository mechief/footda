import footballApi from "../apiFootball/api";

import { MissingRequiredParamError } from "../errors/validationError";
import { NoResultError } from "../errors/footballAPIError";

import { SEASON_BASIC } from "../constants/season";

export const getPlayerSeasonStat = async (playerId, season = SEASON_BASIC) => {
  if (!playerId) {
    throw new MissingRequiredParamError('playerId');
  }
  
  const res = await footballApi('/players', {
    id: playerId,
    season: season,
  });

  if (res.data.results === 0) {
    throw new NoResultError;
  }

  return res.data.response[0];
}