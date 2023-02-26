import React, { memo } from "react";

import { getLeagueNameKr } from "../../service/apiFootballService";
import { getFormattedRound } from "../../service/footballFunctions";

const FixtureLeague = memo(({ league }) => {
  return (
    <div>
      <span>{getLeagueNameKr(league.id) || league.name} </span>
      { league.round && 
        <span>{getFormattedRound(league.round)}</span>
      }
    </div>
  );
});

export default FixtureLeague;