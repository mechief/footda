import footballApi from "../apiFootball/api";

import { CURRENT_SEASON } from "./seasons";

export const getIsAvailableSeason = async (playerId, CURRENT_SEASON) => {
  const res = await footballApi('/players/seasons', {
    id: playerId,
  });

  if (res.data.results === 0) {
    return false;
  }

  return res.data.response.includes(CURRENT_SEASON);
}

export const getPlayerTooltipStat = async (playerId) => {
  const res = await footballApi('/players', {
    id: playerId,
    season: CURRENT_SEASON,
  });

  if (res.data.results === 0) {
    return false;
  }

  return res.data.response[0];
}