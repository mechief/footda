import React from "react";

import LeagueStatGoalkeeper from "./leagueStatGoalkeeper";
import LeagueStatFieldPlayer from "./leagueStatFieldPlayer";

import { getLeagueNameKr } from "../../service/apiFootballService";

const LeagueStat = ({ leagueStat, position, isSeasonTotal = false }) => {
  const showLeagueStatByPosition = (leagueName) => {
    if (position == 'Goalkeeper') {
      return <LeagueStatGoalkeeper leagueStat={leagueStat} leagueName={leagueName}></LeagueStatGoalkeeper>
    }
    return <LeagueStatFieldPlayer leagueStat={leagueStat} leagueName={leagueName}></LeagueStatFieldPlayer>
  }

  return (
    <>
      {showLeagueStatByPosition(isSeasonTotal ? '시즌 종합' : getLeagueNameKr(leagueStat.leagueId))}
    </>
  );
}

export default LeagueStat;