import React, { memo } from "react";
import styled, { css } from "styled-components";

const FixtureTeamWrapper = styled.span`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-contents: center;
  align-items: center;
  flex: 0 1 40%;
`;

const TeamLogo = styled.img`
  width: 28px;
  margin-bottom: 2px;
`;

const TeamName = styled.span`
  line-height: 1.2;
  font-size: 14px;
  color: #222;
`;

const LiveSidebarFixtureTeam = memo(({ team }) => {
  return (
    <FixtureTeamWrapper>
      <TeamLogo src={team.logo} />
      <TeamName>{team.name}</TeamName>
    </FixtureTeamWrapper>
  );
});

export default LiveSidebarFixtureTeam;