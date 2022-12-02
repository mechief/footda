import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import FixtureDetailEventItem from "./fixtureDetailEventItem";

const FixtureDetailEvent = () => {
  const events = useSelector((state) => state.currentFixture.events);

  return (
    <>
      {events.map(event => 
        <FixtureDetailEventItem event={event} />
      )}
    </>
  );
};

export default FixtureDetailEvent;