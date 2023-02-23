import React from "react";
import styled from "styled-components";

import HomeScheduleFixture from "../components/schedule/homeScheduleFixture";

const ScheduleFixtureContainer = styled.div`
  // max-width: 800px;
  padding: 40px 20px;
`;

const Home = () => {
  return (
    <ScheduleFixtureContainer>
      <HomeScheduleFixture />
    </ScheduleFixtureContainer>
  );
}

export default Home;