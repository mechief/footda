import React from "react";

const LeagueStatFieldPlayer = ({ leagueStat }) => {
  return (
    <div>
      <span>경기(선발): {leagueStat.appearences}({leagueStat.lineups})</span>
      <span>출장시간: {leagueStat.minutes}</span>
      <span>득점: {leagueStat.goal}</span>
      <span>도움: {leagueStat.assists}</span>
    </div>
  )
}

export default LeagueStatFieldPlayer;