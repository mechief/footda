import React, { useState, useEffect, memo } from "react";
import styled, { css } from "styled-components";

import { IconGoal, IconRedCard } from "../icons/fixtureIcons";

const FixtureEventSummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 50%;
  padding: 0 80px;
  ${props => props.isHome && css`
    align-items: flex-end;  
  `}
`;

const EventSummaryItem = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 2px 0;
  font-size: 13px;
  color: #555;
  ${props => props.isHome && css`
    flex-direction: row-reverse;
  `}
`;

const EventSummaryTime = styled.span`
  display: inline-block;
  min-width: 3em;
  margin-right: 2px;
`;

const FixtureEventSummary = memo(({ events, isHome = false }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);

  // 이벤트를 종류별로 분할
  useEffect(() => {
    setFilteredEvents(() => {
      return events.filter(v => {
        return v.type === 'Goal' || v.detail === 'Red Card';
      });
    });
  }, [events]);

  return (
    <FixtureEventSummaryWrapper isHome={isHome}>
      {
        filteredEvents.length > 0 &&
        filteredEvents.map(v => {
          return (
            <EventSummaryItem key={`${v.player.id}_${v.time.elapsed}`} isHome={isHome}>
              { v.type === 'Goal' &&
                <IconGoal alt="골" />
              }
              { v.type === 'Card' && v.detail === 'Red Card' &&
                <IconRedCard alt="퇴장" />
              }
              <span>
                <EventSummaryTime>{v.time.elapsed}{v.time.extra ? '+' + v.time.extra : ''}`</EventSummaryTime>
                <span>{v.player.name}</span>
              </span>
            </EventSummaryItem>
          )
        })
      }
    </FixtureEventSummaryWrapper>
  );
});

export default FixtureEventSummary;