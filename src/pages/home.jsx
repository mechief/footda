import React from "react";
import styled from "styled-components";

import ErrorBoundary from "../components/error/errorBoundary";

import HomeScheduleFixture from "../components/schedule/homeScheduleFixture";

const ScheduleFixtureContainer = styled.div`
  padding: 20px 0;
`;

const Home = () => {
  return (
    <ScheduleFixtureContainer>
      <ErrorBoundary key='homeScheduleFixture' fallback={<div>일정을 불러오는 중 오류가 발생했습니다.</div>}>
        <HomeScheduleFixture />
      </ErrorBoundary>
    </ScheduleFixtureContainer>
  );
}

export default Home;