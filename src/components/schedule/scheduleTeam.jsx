import React, { memo } from "react";
import styled, { css } from "styled-components";

import { getTeamLogoURL } from "../../service/footballFunctions";

const FixtureTeamWrapper = styled.span`
  flex: 1 1 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
  ${props => props.isHome && css`
    flex-direction: row-reverse;
  `}
`;

const WinnerDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #eaaaaa;
  border-radius: 50%;
`;

const TeamName = styled.span`
  display: inline-block;
  line-height: 1.2;
  font-size: 14px;
  font-weight: 500;
  color: #222;
`;

const TeamLogo = styled.img`
  display: inline-block;
  width: 20px;
  padding: 0 5px;
  box-sizing: content-box;
`;

const ScheduleTeam = memo(({ team, isHome = false, isWinner = false }) => {
  return (
    <FixtureTeamWrapper isHome={isHome}>
      { isWinner &&
        <WinnerDot />
      }
      <TeamLogo src={getTeamLogoURL(team.id)} />
      <TeamName>{team.name}</TeamName>
    </FixtureTeamWrapper>
  );
});

export default ScheduleTeam;