import React from "react";
import styled from "styled-components";

const EventItemWrapper = styled.li`
  padding: 4px 0;
  font-size: 13px;
`

const EventTime = styled.span`
  display: inline-block;
  min-width: 3.5em;
  padding-right: 0.3em;
  text-align: right;
`

const FixtureDetailEventItem = ({ event }) => {

  const showEventTextByType = () => {
    switch (event.type) {
      case 'Goal':
        return `득점! ${event.player.name} 선수의 골.` + (event.assist.id ? ` ${event.assist.name} 선수의 도움.` : '');

      case 'subst':
        return `선수교체. ${event.player.name} 선수가 나오고 ${event.assist.name} 선수가 투입되었습니다.`;

      case 'Card':
        return `${event.player.name} 선수 ${event.detail === 'Yellow Card' ? '경고를 받습니다.' : '퇴장입니다.'}`;
    
      default:
        break;
    }
  }

  return (
    <EventItemWrapper>
      <EventTime>{event.time.elapsed}{event.time.extra ? '+' + event.time.extra : ''}`</EventTime>
      <span>
        {showEventTextByType()}
      </span>
    </EventItemWrapper>
  );
};

export default FixtureDetailEventItem;