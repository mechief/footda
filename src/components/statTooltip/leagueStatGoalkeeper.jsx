import React from "react";

const LeagueStatGoalkeeper = ({ leagueStat, leagueName }) => {
  return (
    <tr>
      <td>{leagueName}</td>
      <td>{leagueStat.appearences}({leagueStat.lineups})</td>
      <td>{leagueStat.minutes}</td>
      <td>{leagueStat.conceded}</td>
      <td>{leagueStat.saves}</td>
    </tr>
  )
}

export default LeagueStatGoalkeeper;