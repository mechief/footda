import React, { useMemo, memo } from "react";
import styled, { css } from "styled-components";

import { IconGoal, IconRedCard } from "../icons/fixtureIcons";

const FixtureEventSummary = memo(({ events, isHome = false }) => {
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      return event.detail === 'Red Card' || (event.type === 'Goal' && event.comments !== 'Penalty Shootout');
    });
  }, [events]);

  const penaltyShootout = useMemo(() => {
    return events.filter(event => event.type === 'Goal' && event.comments === 'Penalty Shootout');
  }, [events]);

  const renderTypeIcon = (event) => {
    if (event.type === 'Goal') {
      return <IconGoal alt="골" />;
    }
    if (event.type === 'Card' && event.detail === 'Red Card') {
      return <IconRedCard alt="퇴장" />;
    }
  }

  const printExtraTime = (time) => {
    return time.extra ? '+' + time.extra : '';
  }

  const renderOwnGoalText = (event) => {
    if (event.type === 'Goal' && event.detail === 'Own Goal') {
      return <span> (자책)</span>;
    }
  }

  return (
    <FixtureEventSummaryWrapper isHome={isHome}>
      { filteredEvents.map(v => 
        <EventSummaryItem key={`${v.player.id}_${v.time.elapsed}`} isHome={isHome}>
          {renderTypeIcon(v)}
          <span>
            <EventSummaryTime isHome={isHome}>{v.time.elapsed}{printExtraTime(v.time)}`</EventSummaryTime>
            <span>{v.player.name}</span>
            {renderOwnGoalText(v)}
          </span>
        </EventSummaryItem>
      )}
      { penaltyShootout.length > 0 &&
        <StyledPenaltyShootout isHome={isHome}>
          <div>승부차기</div>
          { penaltyShootout.map((v, i) => 
            <span key={`penaltyShootout_${v.player.id}_${i}`}>{v.detail === 'Penalty' ? 'O' : 'X'}</span>
          )}
        </StyledPenaltyShootout>
      }
    </FixtureEventSummaryWrapper>
  );
});

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
  margin-right: 2px;
  ${props => !props.isHome && css`
    min-width: 3em;
  `}
`;

const StyledPenaltyShootout = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: #777;
  ${props => props.isHome && css`
    text-align: right;
  `}
`;

export default FixtureEventSummary;