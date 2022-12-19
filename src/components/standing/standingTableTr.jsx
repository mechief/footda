import React, { memo } from "react";
import styled, { css } from "styled-components";

const StandingTr = styled.tr`
  ${(props) => props.ruleHighlight === 'demotion' && css`
    & td {
      background: #eec5d2;
    }
  `}
  ${(props) => props.ruleHighlight === 'ChampionsLeague' && css`
    & td {
      background: #c5d1ee;
    }
  `}
  ${(props) => props.ruleHighlight === 'EuropaLeague' && css`
    & td {
      background: #c6eec5;
    }
  `}
`;

const StandingTableTr = memo(({ teamData, leagueRule }) => {
  const matchLeagueRule = leagueRule.find((ruleItem) => {
    return ruleItem.ranks.includes(teamData.rank);
  });

  const ruleHighlight = matchLeagueRule 
    ? (matchLeagueRule.type === 'continental'
      ? matchLeagueRule.detail
      : matchLeagueRule.type)
    : false;

  return (
    <StandingTr ruleHighlight={ruleHighlight}>
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
    </StandingTr>
  );
});

export default StandingTableTr;