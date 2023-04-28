import React, { memo } from "react";
import styled, { css } from "styled-components";

import StandingFormItem from "./standingFormItem";
import TeamName from "../fixture/teamName";

const StandingTr = styled.tr`
  ${(props) => props.ruleHighlight === 'demotion' && css`
    & td {
      background: #eec5d2 !important;
    }
  `}
  ${(props) => props.ruleHighlight === 'ChampionsLeague' && css`
    & td {
      background: #d5ddf1 !important;
    }
  `}
  ${(props) => props.ruleHighlight === 'EuropaLeague' && css`
    & td {
      background: #d6eed5 !important;
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
      <td><TeamName team={teamData.team} /></td>
      <td>{teamData.all.played}</td>
      <td>{teamData.all.win}</td>
      <td>{teamData.all.draw}</td>
      <td>{teamData.all.lose}</td>
      <td>{teamData.all.goals.for}</td>
      <td>{teamData.all.goals.against}</td>
      <td>{teamData.goalsDiff}</td>
      <td>{teamData.points}</td>
      <td>
        {teamData.form.split('').map((matchResult, i) => 
          <StandingFormItem key={`standingForm_${teamData.team.id}_${i}`} matchResult={matchResult} />
        )}
      </td>
    </StandingTr>
  );
});

export default StandingTableTr;