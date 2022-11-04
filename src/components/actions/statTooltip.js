import { createAsyncThunk } from "@reduxjs/toolkit";

import { isServiceLeague } from "../../service/apiFootballService";
import { getPlayerTooltipStat } from "../../apiFootball/stat";

export const initTooltip = createAsyncThunk('statTooltip/initTooltip', async (data) => {
  const playerStat = await getPlayerTooltipStat(data);

  playerStat.statistics = playerStat.statistics.filter(v => {
    return isServiceLeague(v.league.id);
  });
  
  console.log(playerStat);
  
  return playerStat;
});