import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import ErrorBoundary from "../components/error/errorBoundary";

import StandingLeagues from "../components/standing/standingLeagues";
import StandingData from "../components/standing/standingData";

const Standing = () => {
  const leagueId = Number(useParams().id) || 39;
  
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

const StandingWrapper = styled.section`
  padding: 60px 20px;
`;

const StandingTitle = styled.h2`
  margin-bottom: 40px;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
`;

export default Standing;