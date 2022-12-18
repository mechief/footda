import React, { memo } from "react";
import styled from "styled-components";

const StandingTableTr = memo(({ teamData }) => {
  console.log('render Tr');
  return (
    <tr>
      <td>{teamData.rank}</td>
      <td>{teamData.team.name}</td>
      <td>{teamData.all.played}</td>
      <td>{teamData.all.win}</td>
      <td>{teamData.all.draw}</td>
      <td>{teamData.all.lose}</td>
      <td>{teamData.all.goals.for}</td>
      <td>{teamData.all.goals.against}</td>
      <td>{teamData.goalsDiff}</td>
      <td>{teamData.points}</td>
      <td>{teamData.form}</td>
    </tr>
  );
});

export default StandingTableTr;