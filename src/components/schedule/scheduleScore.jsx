import React, { memo } from "react";
import styled from "styled-components";

import { getFixtureStatusCode } from "../../utils/fixture";

import PenaltyScore from "../fixture/penaltyScore";

const ScheduleScore = memo(({ goals, score, shortStatus, homeaway }) => {
  return (
    <ScoreWrapper>
      { shortStatus && getFixtureStatusCode(shortStatus) >= 0
        ? <>
          <StyledPenaltyScore score={score} shortStatus={shortStatus}>
            ({score.penalty[homeaway]})
          </StyledPenaltyScore>
          {goals[homeaway]}
        </>
        : '-'
      }
    </ScoreWrapper>
  );
});

const ScoreWrapper = styled.span`
  flex: 0 0 40px;
`;

const StyledPenaltyScore = styled(PenaltyScore)`
  display: inline-block;
  padding: 0 4px;
  font-size: 12px;
  color: #e14444;
`;

export default ScheduleScore;