import React, { memo } from "react";
import styled from "styled-components";

const PenaltyScore = styled.div`
  display: inline-block;
  padding-top: 6px;
  font-size: 14px;
  color: #555;
`;

const FixtureScore = memo(({ goals, score, shortStatus }) => {
  return (
    <>
      <div>{goals.home + ' : ' + goals.away}</div>
      {
        shortStatus === 'P' || shortStatus === 'PEN'
          && score?.penalty?.home && score?.penalty?.away 
          && <PenaltyScore>
            {score.penalty.home} : {score.penalty.away}
          </PenaltyScore>
      }
    </>
  );
});

export default FixtureScore;