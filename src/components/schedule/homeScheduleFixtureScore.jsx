import React, { memo } from "react";
import styled from "styled-components";

import { FIXTURE_STATUS } from "../../service/apiFootballService";

const PenaltyScore = styled.span`
  display: inline-block;
  padding: 0 4px;
  font-size: 12px;
  color: #e14444;
`;

const WinnerScore = styled.strong`
  font-weight: 700;
  color: #3b87bb;
`;

const HomeScheduleFixtureScore = memo(({ goals, score, shortStatus }) => {

  const showBasicScore = () => {
    // 경기 종료 and 무승부 아닌 경우 승리 팀 강조 표시
    if (FIXTURE_STATUS[shortStatus]?.code === 0
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
      {
        shortStatus === 'P' || shortStatus === 'PEN'
          && score?.penalty?.home !== null && score?.penalty?.away !== null
          && <PenaltyScore>({score.penalty.home})</PenaltyScore>
      }
      {showBasicScore()}
      {
        shortStatus === 'P' || shortStatus === 'PEN'
          && score?.penalty?.home !== null && score?.penalty?.away !== null
          && <PenaltyScore>({score.penalty.away})</PenaltyScore>
      }
    </>
  );
});

export default HomeScheduleFixtureScore;