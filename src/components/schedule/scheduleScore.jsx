import React, { memo } from "react";
import styled from "styled-components";

import { FIXTURE_STATUS } from "../../service/apiFootballService";

const ScoreWrapper = styled.span`
  flex: 0 0 40px;
`
const PenaltyScore = styled.span`
  display: inline-block;
  padding: 0 4px;
  font-size: 12px;
  color: #e14444;
`;

const ScheduleScore = memo(({ goals, score, shortStatus, homeaway }) => {
  return (
    <ScoreWrapper>
      { shortStatus && FIXTURE_STATUS[shortStatus]?.code >= 0
        ? <>
          { shortStatus === 'P' || shortStatus === 'PEN'
            && score?.penalty?.home !== null && score?.penalty?.away !== null
            && <PenaltyScore>({score.penalty[homeaway]})</PenaltyScore>
          }
          {goals[homeaway]}
        </>
        : '-'
      }
    </ScoreWrapper>
  );
});

export default ScheduleScore;