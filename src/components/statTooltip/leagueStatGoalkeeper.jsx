import React from "react";

const LeagueStatGoalkeeper = ({ leagueStat, leagueName }) => {
  return (
    <tr>
      <td>{leagueName}</td>
      <td>경기(선발): {leagueStat.appearences}({leagueStat.lineups})</td>
      <td>출장시간: {leagueStat.minutes}</td>
      <td>실점: {leagueStat.conceded}</td>
      <td>선방: {leagueStat.saves}</td>
    </tr>
  )
}

export default LeagueStatGoalkeeper;