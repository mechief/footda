import React from "react";

const TopPlayerTableTr = ({ playerData, rank }) => {
  const stat = playerData.statistics[0];
  const subst = stat.games.appearences - stat.games.lineups;
  return (
    <tr>
      <td>{rank}</td>
      <td>{playerData.player.name}</td>
      <td>
        {stat.games.appearences}&nbsp;
        {subst > 0 && `(${subst})`}
      </td>
      <td>{stat.goals.total ?? 0}</td>
      <td>{stat.goals.assists ?? 0}</td>
      <td>{stat.goals.total + stat.goals.assists ?? 0}</td>
      <td>{stat.games.minutes}</td>
      <td>{stat.cards.yellow}</td>
      <td>{stat.cards.red}</td>
    </tr>
  );
}

export default TopPlayerTableTr;