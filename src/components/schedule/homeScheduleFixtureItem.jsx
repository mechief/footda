import React, { memo } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import styled from "styled-components";

import { FIXTURE_STATUS, getLeagueNameForList } from "../../service/apiFootballService";

import FixtureLeagueRound from "../fixture/fixtureLeagueRound";
import HomeScheduleFixtureScore from "./homeScheduleFixtureScore";
import HomeScheduleFixtureTeam from "./homeScheduleFixtureTeam";

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
  align-items: center;
  padding: 4px 10px;
  gap: 0 10px;
  font-size: 13px;
`;

const TimeAndStatus = styled.span`
  flex: 0 0 150px;
`;

const Time = styled.span`
  display: inline-block;
  margin-right: 10px;
`;

const TeamsAndScore = styled.span`
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0 10px;
`;

const ScoreWrapper = styled.span`
  flex: 0 0 85px;
  text-align: center;
`;

const LeagueAndRound = styled.span`
  flex: 0 0 150px;
  text-align: right;
  color: #777;
`;

const HomeScheduleFixtureItem = memo(({ fixture }) => {
  return (
    <ItemWrapper>
      <Link to={'/fixture/' + fixture.fixture.id}>
        <ItemInner>
          <TimeAndStatus>
            { fixture.fixture?.date && 
              <Time>{dayjs(fixture.fixture.date).format('HH:mm')}</Time>
            }
            { fixture.fixture?.status?.short &&
              FIXTURE_STATUS[fixture.fixture.status.short]?.text
            }
          </TimeAndStatus>
          <TeamsAndScore>
            { fixture.teams?.home?.id &&
              <HomeScheduleFixtureTeam team={fixture.teams.home} isHome={true} />
            }
            <ScoreWrapper>
              { FIXTURE_STATUS[fixture.fixture.status.short]?.code >= 0
                ? <HomeScheduleFixtureScore goals={fixture.goals} score={fixture.score} shortStatus={fixture.fixture.status.short} />
                : 'vs'
              }
            </ScoreWrapper>
            { fixture.teams?.away?.id &&
              <HomeScheduleFixtureTeam team={fixture.teams.away} />
            }
          </TeamsAndScore>
          <LeagueAndRound>
            <span>{getLeagueNameForList(fixture.league?.id)}</span>
            { fixture.league?.round && 
              <span>&nbsp;<FixtureLeagueRound round={fixture.league.round} /></span>
            }
          </LeagueAndRound>
        </ItemInner>
      </Link>
    </ItemWrapper>
  );
});

export default HomeScheduleFixtureItem;