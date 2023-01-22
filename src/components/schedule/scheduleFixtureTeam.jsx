import React, { memo } from "react";
import styled, { css } from "styled-components";

import { getTeamLogoURL } from "../../service/footballFunctions";

const FixtureTeamWrapper = styled.span`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  ${props => props.isHome && css`
    flex-direction: row-reverse;
  `}
`;

const TeamName = styled.span`
  display: inline-block;
  line-height: 1.2;
  font-size: 16px;
  font-weight: 500;
  color: #222;
`;

const TeamLogo = styled.img`
  display: inline-block;
  width: 20px;
  padding: 0 5px;
  box-sizing: content-box;
`;

const ScheduleFixtureTeam = memo(({ team, isHome = false }) => {
  return (
    <FixtureTeamWrapper isHome={isHome}>
      <TeamName>{team.name}</TeamName>
      <TeamLogo src={getTeamLogoURL(team.id)} />
    </FixtureTeamWrapper>
  );
});

export default ScheduleFixtureTeam;