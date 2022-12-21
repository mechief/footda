import React from "react";

const TopPlayerTableTr = ({ playerData, rank }) => {
  const subst = playerData.statistics[0].games.appearences - playerData.statistics[0].games.lineups;
  return (
    <tr>
      <td>{rank}</td>
      <td>{playerData.player.name}</td>
      <td>
        {playerData.statistics[0].games.appearences}&nbsp;
        {subst > 0 && `(${subst})`}
      </td>
      <td>{playerData.statistics[0].goals.total ?? 0}</td>
      <td>{playerData.statistics[0].goals.assists ?? 0}</td>
      <td>{playerData.statistics[0].goals.total + playerData.statistics[0].goals.assists ?? 0}</td>
      <td>{playerData.statistics[0].games.minutes}</td>
      <td>{playerData.statistics[0].cards.yellow}</td>
      <td>{playerData.statistics[0].cards.red}</td>
    </tr>
  );
}

export default TopPlayerTableTr;