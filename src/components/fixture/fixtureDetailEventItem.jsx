import React from "react";
import styled from "styled-components";

import TeamName from "./teamName";

const FixtureDetailEventItem = ({ event }) => {

  const showEventTextByType = () => {
    if (event.type === 'Goal' && event.comments === 'Penalty Shootout') {
      if (event.detail === 'Penalty') {
        return <>성공! <TeamName team={event.team} />의 {event.player.name}</>;
      } else {
        return <>실패! <TeamName team={event.team} />의 {event.player.name}</>;
      }
    }

    switch (event.type) {
      case 'Goal':
        return `득점! ${event.player.name} 선수의 골.` + (event.assist.id ? ` ${event.assist.name} 선수의 도움.` : '');

      case 'subst':
        return `선수교체. ${event.player.name} 선수가 나오고 ${event.assist.name} 선수가 투입되었습니다.`;

      case 'Card':
        return `${event.player.name} 선수 ${event.detail === 'Yellow Card' ? '경고를 받습니다.' : '퇴장입니다.'}`;

      case 'Var':
        return `${event.player.name} 선수의 플레이에 대하여 VAR 확인을 합니다.`;
    
      default:
        break;
    }
  }

  const printTime = () => {
    if (event.type === 'Goal' && event.comments === 'Penalty Shootout') {
      return '승부차기';
    }
    return `${event.time.elapsed}${event.time.extra ? '+' + event.time.extra : ''}\``;
  }

  return (
    <EventItemWrapper>
      <EventTime>{printTime()}</EventTime>
      <span>{showEventTextByType()}</span>
    </EventItemWrapper>
  );
};

const EventItemWrapper = styled.li`
  display: flex;
  padding: 4px 0;
  font-size: 13px;
`;

const EventTime = styled.span`
  display: inline-block;
  min-width: 3.5em;
  padding-right: 0.3em;
  text-align: right;
`;

export default FixtureDetailEventItem;