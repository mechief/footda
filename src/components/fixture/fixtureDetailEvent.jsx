import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import FixtureDetailEventItem from "./fixtureDetailEventItem";

const EventWrapper = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  padding: 20px;
`;

const FixtureDetailEvent = () => {
  const events = useSelector((state) => state.currentFixture.events);

  return (
    <EventWrapper>
      {events.map((event, i) => 
        <FixtureDetailEventItem key={`event_${i}_${event.time.elapsed}`} event={event} />
      )}
    </EventWrapper>
  );
};

export default FixtureDetailEvent;