import React, { memo } from "react";
import styled from "styled-components";

import { getServiceLeagueIds } from "../../service/apiFootballService";
import StandingLeaguesItem from "./standingLeaguesItem";

const serviceLeagueIds = getServiceLeagueIds({type: 'league'});

const StandingLeaguesList = styled.nav`
  display: flex;
  justify-content: center;
  align-items: bottom;
  gap: 0 30px;
  margin-bottom: 50px;
`;

const StandingLeagues = memo(() => {
  return (
    <StandingLeaguesList>
      { serviceLeagueIds.map(leagueId => 
        <StandingLeaguesItem 
          key={`league_${leagueId}`}
          leagueId={leagueId}
        />
      )}
    </StandingLeaguesList>
  );
});

export default StandingLeagues;