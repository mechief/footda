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
  gap: 0 5px;
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
  box-sizing: content-box;
`;

const ScheduleTeam = memo(({ team, isHome = false, isWinner = false, align }) => {
  return (
    <FixtureTeamWrapper isHome={isHome}>
      { isWinner && align === 'right' &&
        <WinnerDot />
      }
      <TeamLogo src={getTeamLogoURL(team.id)} />
      <TeamName>{team.name}</TeamName>
      { isWinner && align !== 'right' &&
        <WinnerDot />
      }
    </FixtureTeamWrapper>
  );
});

export default ScheduleTeam;