import React, { memo } from "react";
import styled from "styled-components";

import { getLeagueNameKr } from "../../service/apiFootballService";

import FixtureLeagueRound from "./fixtureLeagueRound";

const FixtureLeagueWrapper = styled.div`
  margin-bottom: 20px;
`;

const FixtureLeague = memo(({ league }) => {
  return (
    <div>
      <span>{getLeagueNameKr(league.id) || league.name} </span>
      { league.round && 
        <span><FixtureLeagueRound round={league.round} /></span>
      }
    </div>
  );
});

export default FixtureLeague;