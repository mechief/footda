import React from "react";

const LeagueStatGoalkeeper = ({ leagueStat }) => {
  return (
    <div>
      <span>경기(선발): {leagueStat.appearences}({leagueStat.lineups})</span>
      <span>출장시간: {leagueStat.minutes}</span>
      <span>실점: {leagueStat.conceded}</span>
      <span>선방: {leagueStat.saves}</span>
    </div>
  )
}

export default LeagueStatGoalkeeper;