import React, { memo } from "react";

const FixtureScore = memo(({ goals, score, shortStatus }) => {
  return (
    <span>
      <span>{goals.home} : {goals.away}</span>
      {
        shortStatus === 'P' || shortStatus === 'PEN'
          && score?.penalty?.home && score?.penalty?.away 
          && <span className="penalty-score">
            {score.penalty.home} : {score.penalty.away}
          </span>
      }
    </span>
  );
});

export default FixtureScore;