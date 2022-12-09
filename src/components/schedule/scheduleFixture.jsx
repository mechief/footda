import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { FIXTURE_STATUS, getLeagueNameKr } from "../../service/apiFootballService";

import FixtureDate from "../fixture/fixtureDate";
import FixtureLeagueRound from "../fixture/fixtureLeagueRound";
import FixtureStatus from "../fixture/fixtureStatus";
import FixtureScore from "../fixture/fixtureScore";
import ScheduleFixtureTeam from "./scheduleFixtureTeam";

const ScheduleFixtureItem = styled.div``;

const ItemInner = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding: 3px 0;
  gap: 0 10px;
  font-size: 15px;
`;

const ScheduleFixture = memo(({ fixture }) => {
  return (
    <ScheduleFixtureItem>
      <Link to={'/fixture/' + fixture.fixture.id}>
        <ItemInner>
          {
            fixture.fixture?.status?.short &&
            <FixtureStatus shortStatus={fixture.fixture.status.short} />
          }
          <span>
            <span>{getLeagueNameKr(fixture.league?.id)}</span>
            {
              fixture.league?.round && 
              <FixtureLeagueRound round={fixture.league.round} />
            }
          </span>
          {
            fixture.fixture?.date && 
            <FixtureDate date={fixture.fixture.date} />
          }
          {
            fixture.teams?.home?.id &&
            <ScheduleFixtureTeam team={fixture.teams.home} />
          }
          <span>
            {
              FIXTURE_STATUS[fixture.fixture.status.short]?.code >= 0
                && <FixtureScore goals={fixture.goals} score={fixture.score} shortStatus={fixture.fixture.status.short} />
            }
          </span>
          {
            fixture.teams?.away?.id &&
            <ScheduleFixtureTeam team={fixture.teams.away} />
          }
        </ItemInner>
      </Link>
    </ScheduleFixtureItem>
  );
});

export default ScheduleFixture;