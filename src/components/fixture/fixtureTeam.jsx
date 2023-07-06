import React, { memo } from "react";
import styled, { css } from "styled-components";

import TeamName from "./teamName";
import { DummyTeamLogo } from "../icons/footballIcons";

const FixtureTeam = memo(({ team, isHome = false }) => {
  return (
    <FixtureTeamColumn isHome={isHome}>
      <StyledTeamName><TeamName team={team} /></StyledTeamName>
      {/* <TeamLogo src={team.logo} /> */}
      <DummyTeamLogoCustom size="42px" />
    </FixtureTeamColumn>
  );
});

const FixtureTeamColumn = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  width: 50%;
  padding: 0 0 0 80px;
  ${props => props.isHome && css`
    flex-direction: row-reverse;
    padding: 0 80px 0 0;
  `}
`;

const StyledTeamName = styled.span`
  display: inline-block;
  line-height: 1.2;
  font-size: 28px;
  font-weight: 500;
  color: #222;
`;

// const TeamLogo = styled.img`
//   display: inline-block;
//   width: 42px;
//   padding: 0 15px;
//   box-sizing: content-box;
// `;

const DummyTeamLogoCustom = styled(DummyTeamLogo)`
  padding: 0 15px;
  box-sizing: content-box;
`;

export default FixtureTeam;