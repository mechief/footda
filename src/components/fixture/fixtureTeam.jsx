import React, { memo } from "react";
import styled from "styled-components";

const Logo = styled.img`
  width: 20px;
`;

const FixtureTeam = memo(({ team }) => {
  return (
    <span>
      <Logo src={team.logo} />
      <span>{team.name}</span>
    </span>
  );
});

export default FixtureTeam;