import React, { Suspense } from "react";
import { useParams } from "react-router-dom";

import ErrorBoundary from "../components/error/errorBoundary";

import StandingLeagues from "../components/standing/standingLeagues";
import StandingData from "../components/standing/standingData";

import {
  StandingWrapper,
  StandingTitle,
} from "../components/standing/standingStyled";

const Standing = () => {
  let leagueId = useParams().id;
  leagueId = leagueId ? +leagueId : 39;
  
  return (
    <StandingWrapper>
      <StandingTitle>순위</StandingTitle>
      <StandingLeagues />
      <ErrorBoundary key={leagueId} fallback={<div>순위를 불러오는 중 에러가 발생했습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <StandingData leagueId={leagueId} />
        </Suspense>
      </ErrorBoundary>
    </StandingWrapper>
  );
}

export default Standing;