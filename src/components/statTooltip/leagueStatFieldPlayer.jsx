import React from "react";

const LeagueStatFieldPlayer = ({ leagueStat, leagueName }) => {
  return (
    <tr>
      <td>{leagueName}</td>
      <td>{leagueStat.appearences}({leagueStat.lineups})</td>
      <td>{leagueStat.minutes}</td>
      <td>{leagueStat.goal}</td>
      <td>{leagueStat.assists}</td>
    </tr>
  )
}

export default LeagueStatFieldPlayer;