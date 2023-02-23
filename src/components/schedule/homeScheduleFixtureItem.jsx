import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { FIXTURE_STATUS, getLeagueNameForList } from "../../service/apiFootballService";

import FixtureDate from "../fixture/fixtureDate";
import FixtureLeagueRound from "../fixture/fixtureLeagueRound";
import FixtureScore from "../fixture/fixtureScore";
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

const FixtureInfo = styled.span`
  flex: 0 0 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 10px;
  justify-content: flex-start;
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
  flex: 1 0 auto;
  text-align: center;
`;

const LeagueName = styled.span`
  flex: 0 0 150px;
  text-align: right;
  color: #777;
`;

const HomeScheduleFixtureItem = memo(({ fixture }) => {
  return (
    <ItemWrapper>
      <Link to={'/fixture/' + fixture.fixture.id}>
        <ItemInner>
          <FixtureInfo>
            { fixture.fixture?.date && 
              <FixtureDate date={fixture.fixture.date} onlyTime={true} />
            }
            { fixture.fixture?.status?.short &&
              FIXTURE_STATUS[fixture.fixture.status.short]?.text
            }
          </FixtureInfo>
          <TeamsAndScore>
            { fixture.teams?.home?.id &&
              <HomeScheduleFixtureTeam team={fixture.teams.home} isHome={true} />
            }
            <ScoreWrapper>
              { FIXTURE_STATUS[fixture.fixture.status.short]?.code >= 0
                ? <FixtureScore goals={fixture.goals} score={fixture.score} shortStatus={fixture.fixture.status.short} />
                : 'vs'
              }
            </ScoreWrapper>
            { fixture.teams?.away?.id &&
              <HomeScheduleFixtureTeam team={fixture.teams.away} />
            }
          </TeamsAndScore>
          <LeagueName>
            <span>{getLeagueNameForList(fixture.league?.id)}</span>
            { fixture.league?.round && 
              <span>&nbsp;<FixtureLeagueRound round={fixture.league.round} /></span>
            }
          </LeagueName>
        </ItemInner>
      </Link>
    </ItemWrapper>
  );
});

export default HomeScheduleFixtureItem;