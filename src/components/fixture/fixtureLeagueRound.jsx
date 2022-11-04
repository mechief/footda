import React, { memo } from "react";

const FixtureLeagueRound = memo(({ round }) => {
  let formattedRound;

  if (round) {
    formattedRound = (round.includes('Regular Season')) ? round.substring(round.indexOf('-') + 1).trim() + 'R' : round;
  }

  return (
    <span>{formattedRound}</span>
  );
});

export default FixtureLeagueRound;