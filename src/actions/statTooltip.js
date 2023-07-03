import { createAsyncThunk } from "@reduxjs/toolkit";

import { isServiceLeague } from "../utils/league";
import { getPlayerSeasonStat } from "../apiFootball/stat";

export const initTooltip = createAsyncThunk('statTooltip/initTooltip', async (data, { rejectWithValue }) => {
  try {
    const playerStat = await getPlayerSeasonStat(data);

    // 서비스 중인 리그만 수집
    playerStat.statistics = playerStat.statistics.filter(v => {
      return isServiceLeague(v.league.id);
    });

    playerStat.position = playerStat.statistics[0].games.position;

    // 시즌 종합 스탯
    playerStat.seasonTotal = {
      appearences: 0,
      lineups: 0,
      minutes: 0,
      goal: 0,
      penaltyGoal: 0,
      assists: 0,
      conceded: 0,
      saves: 0,
      yellow: 0,
      yellowred: 0,
      red: 0,
    };

    playerStat.statistics.forEach((leagueStat, i) => {
      playerStat.statistics[i].summary = {
        leagueId: leagueStat.league.id,
        appearences: leagueStat.games.appearences,
        lineups: leagueStat.games.lineups,
        minutes: leagueStat.games.minutes,
        goal: leagueStat.goals.total,
        penaltyGoal: leagueStat.penalty.scored,
        assists: leagueStat.goals.assists,
        conceded: leagueStat.goals.conceded,
        saves: leagueStat.goals.saves,
        yellow: leagueStat.cards.yellow,
        yellowred: leagueStat.cards.yellowred,
        red: leagueStat.cards.red,
      }
      // 시즌 종합 스탯 계산
      for (const key in playerStat.statistics[i].summary) {
        if (key === 'leagueId') continue;
        playerStat.seasonTotal[key] += playerStat.statistics[i].summary[key];
      }
    });
    
    return playerStat;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});