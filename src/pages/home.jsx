import React from "react";
import styled from "styled-components";

import ErrorBoundary from "../components/error/errorBoundary";

import HomeSchedule from "../components/schedule/homeSchedule";

const ScheduleFixtureContainer = styled.div`
  padding: 20px 0;
`;

const Home = () => {
  return (
    <ScheduleFixtureContainer>
      <ErrorBoundary key='homeSchedule' fallback={<div>30일 이내에 예정된 경기가 없습니다.</div>}>
        <HomeSchedule />
      </ErrorBoundary>
    </ScheduleFixtureContainer>
  );
}

export default Home;