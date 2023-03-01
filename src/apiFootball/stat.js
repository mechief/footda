import footballApi from "../apiFootball/api";
import { CURRENT_SEASON } from "./seasons";

import { MissingRequiredParamError } from "../errors/validationError";
import { NoResultError } from "../errors/footballAPIError";

export const getIsAvailableSeason = async (playerId, CURRENT_SEASON) => {
  if (!playerId) {
    throw new MissingRequiredParamError('playerId');
  }

  const res = await footballApi('/players/seasons', {
    id: playerId,
  });

  if (res.data.results === 0) {
    throw new NoResultError;
  }

  return res.data.response.includes(CURRENT_SEASON);
}

export const getPlayerSeasonStat = async (playerId) => {
  if (!playerId) {
    throw new MissingRequiredParamError('playerId');
  }
  
  const res = await footballApi('/players', {
    id: playerId,
    season: CURRENT_SEASON,
  });

  if (res.data.results === 0) {
    throw new NoResultError;
  }

  return res.data.response[0];
}