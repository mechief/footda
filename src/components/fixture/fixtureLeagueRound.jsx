import React, { memo } from "react";

const FixtureLeagueRound = memo(({ round }) => {
  let formattedRound = round;

  if (round.includes('Regular Season')) {
    formattedRound = round.substring(round.indexOf('-') + 1).trim() + 'R';
  } else if (round === 'Knockout Round Play-offs') {
    formattedRound = '토너먼트 P/O';
  } else if (/Round of \d+/i.test(round)) {
    formattedRound = round.replace('Round of ', '') + '강';
  }

  return formattedRound;
});

export default FixtureLeagueRound;