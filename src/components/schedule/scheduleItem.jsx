import React, { memo } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import styled from "styled-components";

import { FIXTURE_STATUS, getLeagueNameForList } from "../../service/apiFootballService";

import FixtureLeagueRound from "../fixture/fixtureLeagueRound";
import ScheduleTeam from "./scheduleTeam";
import ScheduleScore from "./scheduleScore";

const ItemWrapper = styled.div`
  margin-bottom: 2px;
  background: #f1f1f1;
  &:hover {
    background: #f5f5f5;
  }
`;

const ItemInner = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: stretch;
  padding: 4px 10px;
  gap: 0 10px;
  font-size: 13px;
`;

const Time = styled.span`
  display: inline-block;
  margin-right: 10px;
`;

const LeagueAndRound = styled.div`
  margin-top: 6px;
  color: #777;
`;

const TeamsAndScore = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
`;

const TeamItem = styled.div`
  display: flex;
  gap: 0 10px;
  & > span:first-child {
    justify-content: flex-end;
  }
`;

const ScheduleItem = memo(({ fixture }) => {
  if (fixture.fixture.id == '971764') {
    console.log(fixture);
  }
  return (
    <ItemWrapper>
      <Link to={'/fixture/' + fixture.fixture.id}>
        <ItemInner>
          <div>
            <div>
              { fixture.fixture?.date && 
                <Time>{dayjs(fixture.fixture.date).format('HH:mm')}</Time>
              }
              { fixture.fixture?.status?.short &&
                FIXTURE_STATUS[fixture.fixture.status.short]?.text
              }
            </div>
            <LeagueAndRound>
              <span>{getLeagueNameForList(fixture.league?.id)}</span>
              { fixture.league?.round && 
                <span>&nbsp;<FixtureLeagueRound round={fixture.league.round} /></span>
              }
            </LeagueAndRound>
          </div>
          <TeamsAndScore>
            <TeamItem>
              { fixture.teams?.home?.id &&
                <ScheduleTeam team={fixture.teams.home} isWinner={fixture.teams?.home?.winner} />
              }
              <ScheduleScore 
                goals={fixture.goals} 
                score={fixture.score} 
                shortStatus={fixture.fixture?.status?.short} 
                homeaway='home'
              />
            </TeamItem>
            <TeamItem>
              { fixture.teams?.away?.id &&
                <ScheduleTeam team={fixture.teams.away} isWinner={fixture.teams?.away?.winner} />
              }
              <ScheduleScore 
                goals={fixture.goals} 
                score={fixture.score} 
                shortStatus={fixture.fixture?.status?.short} 
                homeaway='away'
              />
            </TeamItem>
          </TeamsAndScore>
        </ItemInner>
      </Link>
    </ItemWrapper>
  );
});

export default ScheduleItem;