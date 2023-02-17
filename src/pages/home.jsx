import React from "react";
import styled from "styled-components";

import ScheduleFixture from "../components/schedule/scheduleFixture";

const ScheduleFixtureContainer = styled.div`
  // max-width: 800px;
  padding: 40px 20px;
`;

const Home = () => {
  return (
    <ScheduleFixtureContainer>
      <ScheduleFixture />
    </ScheduleFixtureContainer>
  );
}

export default Home;