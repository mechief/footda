import React, { memo } from "react";
import styled from "styled-components";

import { FIXTURE_STATUS } from "../../service/apiFootballService";

const PenaltyScore = styled.div`
  display: inline-block;
  padding-top: 6px;
  font-size: 14px;
  color: #555;
`;

const WinnerScore = styled.strong`
  font-weight: 700;
  color: #3b87bb;
`;

const FixtureScore = memo(({ goals, score, shortStatus }) => {

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
      <div>{showBasicScore()}</div>
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