import React, { memo } from "react";
import styled from "styled-components";

import { getServiceLeagueIds } from "../../utils/league";

import TopPlayerLeaguesItem from "./topPlayerLeaguesItem";

const serviceLeagueIds = getServiceLeagueIds({type: 'league'});

const TopPlayerLeaguesList = styled.nav`
  display: flex;
  justify-content: center;
  align-items: bottom;
  gap: 0 30px;
  margin-bottom: 50px;
`;

const TopPlayerLeagues = memo(() => {
  return (
    <TopPlayerLeaguesList>
      { serviceLeagueIds.map(leagueId => 
        <TopPlayerLeaguesItem 
          key={`league_${leagueId}`}
          leagueId={leagueId}
        />
      )}
    </TopPlayerLeaguesList>
  );
});

export default TopPlayerLeagues;