import React, { memo } from "react";
import styled, { css } from "styled-components";

// import { getTeamLogoURL } from "../../utils/football";

import TeamName from "../fixture/teamName";
import { DummyTeamLogo } from "../icons/footballIcons";

const ScheduleTeam = memo(({ team, isHome = false, isWinner = false, align }) => {
  return (
    <FixtureTeamWrapper isHome={isHome}>
      { isWinner && align === 'right' &&
        <WinnerDot />
      }
      {/* <TeamLogo src={getTeamLogoURL(team.id)} /> */}
      <DummyTeamLogo size="20px" />
      <StyledTeamName><TeamName team={team} /></StyledTeamName>
      { isWinner && align !== 'right' &&
        <WinnerDot />
      }
    </FixtureTeamWrapper>
  );
});

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

const StyledTeamName = styled.span`
  display: inline-block;
  line-height: 1.2;
  font-size: 14px;
  font-weight: 400;
  color: #222;
`;

// const TeamLogo = styled.img`
//   display: inline-block;
//   width: 20px;
//   box-sizing: content-box;
// `;

export default ScheduleTeam;