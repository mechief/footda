import React, { memo } from "react";
import styled from "styled-components";

import { getLeagueNameKr } from "../../service/apiFootballService";
import { getFormattedRound } from "../../service/footballFunctions";

const StyledFixtureLeague = styled.h2`
  font-size: 16px;
  font-weight: 400;
`;

const FixtureLeague = memo(({ league }) => {
  return (
    <StyledFixtureLeague>
      <span>{getLeagueNameKr(league.id) || league.name} </span>
      { league.round && 
        <span>{getFormattedRound(league.round)}</span>
      }
    </StyledFixtureLeague>
  );
});

export default FixtureLeague;