import React, { memo } from "react";
import styled from "styled-components";

// import { getTeamLogoURL } from "../../utils/football";
import TeamName from "../fixture/teamName";
import { DummyTeamLogo } from "../icons/footballIcons";

const LiveSidebarFixtureTeam = memo(({ team }) => {
  return (
    <FixtureTeamWrapper>
      {/* <TeamLogo src={getTeamLogoURL(team.id)} /> */}
      <DummyTeamLogoCustom size="28px" />
      <StyledTeamName><TeamName team={team} /></StyledTeamName>
    </FixtureTeamWrapper>
  );
});

const FixtureTeamWrapper = styled.span`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-contents: center;
  align-items: center;
  flex: 0 0 calc(50% - 27px);
`;

// const TeamLogo = styled.img`
//   width: 28px;
//   margin-bottom: 2px;
// `;

const DummyTeamLogoCustom = styled(DummyTeamLogo)`
  margin-bottom: 2px;
`;

const StyledTeamName = styled.span`
  line-height: 1.2;
  font-size: 14px;
  color: #222;
`;

export default LiveSidebarFixtureTeam;