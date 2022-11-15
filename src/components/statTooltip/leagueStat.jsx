import React from "react";

import LeagueStatGoalkeeper from "./leagueStatGoalkeeper";
import LeagueStatFieldPlayer from "./leagueStatFieldPlayer";

import { getLeagueNameKr } from "../../service/apiFootballService";

const LeagueStat = ({ leagueStat, position, isSeasonTotal = false }) => {
  const showLeagueStatByPosition = () => {
    if (position == 'Goalkeeper') {
      return <LeagueStatGoalkeeper leagueStat={leagueStat}></LeagueStatGoalkeeper>
    }
    return <LeagueStatFieldPlayer leagueStat={leagueStat}></LeagueStatFieldPlayer>
  }

  return (
    <div>
      <span>{isSeasonTotal ? '시즌 종합 기록' : getLeagueNameKr(leagueStat.leagueId)}</span>
      {showLeagueStatByPosition()}
    </div>
  );
}

export default LeagueStat;