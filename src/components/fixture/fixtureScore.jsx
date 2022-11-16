import React, { memo } from "react";
import styled from "styled-components";

const FixtureScoreWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 160px;
  margin-left: -80px;
  text-align: center;
  line-height: 42px;
  font-size: 28px;
  font-weight: 700;
  color: #222;
  letter-spacing: 5px;
`;

const PenaltyScore = styled.div`
  display: inline-block;
  padding-top: 6px;
  font-size: 14px;
  color: #555;
`;

const FixtureScore = memo(({ goals, score, shortStatus }) => {
  return (
    <FixtureScoreWrapper>
      <div>{goals.home} : {goals.away}</div>
      {
        shortStatus === 'P' || shortStatus === 'PEN'
          && score?.penalty?.home && score?.penalty?.away 
          && <PenaltyScore>
            {score.penalty.home} : {score.penalty.away}
          </PenaltyScore>
      }
    </FixtureScoreWrapper>
  );
});

export default FixtureScore;