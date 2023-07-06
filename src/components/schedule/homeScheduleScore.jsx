import React, { memo } from "react";
import styled from "styled-components";

import { getFixtureStatusCode } from "../../utils/fixture";

import PenaltyScore from "../fixture/penaltyScore";

const HomeScheduleFixture = memo(({ goals, score, shortStatus }) => {

  const showBasicScore = () => {
    // 경기 종료 and 무승부 아닌 경우 승리 팀 강조 표시
    if (getFixtureStatusCode(shortStatus) === 0
        && goals.home !== goals.away) {
      if (goals.home > goals.away) {
        return <>
          <WinnerScore>{goals.home}</WinnerScore> {' : ' + goals.away}
        </>;
      } else {
        return <>
          {goals.home + ' : '} <WinnerScore>{goals.away}</WinnerScore>
        </>;
      }
    } else {
      return goals.home + ' : ' + goals.away;
    }
  }
 
  return (
    <>
      <StyledPenaltyScore score={score} shortStatus={shortStatus}>
        ({score.penalty.home})
      </StyledPenaltyScore>
      {showBasicScore()}
      <StyledPenaltyScore score={score} shortStatus={shortStatus}>
        ({score.penalty.away})
      </StyledPenaltyScore>
    </>
  );
});

const WinnerScore = styled.strong`
  font-weight: 700;
  color: #3b87bb;
`;

const StyledPenaltyScore = styled(PenaltyScore)`
  display: inline-block;
  padding: 0 4px;
  font-size: 12px;
  color: #e14444;
`;

export default HomeScheduleFixture;