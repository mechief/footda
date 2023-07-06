import React, { memo } from "react";
import styled from "styled-components";

import PenaltyScore from "./penaltyScore";

const FixtureScore = memo(({ goals, score, shortStatus }) => {
  return (
    <>
      <div>{goals.home + ' : ' + goals.away}</div>
      <StyledPenaltyScore score={score} shortStatus={shortStatus}>
        {score.penalty.home} : {score.penalty.away}
      </StyledPenaltyScore>
    </>
  );
});

const StyledPenaltyScore = styled(PenaltyScore)`
  display: inline-block;
  padding-top: 6px;
  font-size: 14px;
  color: #555;
`;

export default FixtureScore;