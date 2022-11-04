import React, { memo } from "react";
import { Link } from "react-router-dom";

import FixtureDate from "../fixture/fixtureDate";
import FixtureLeagueRound from "../fixture/fixtureLeagueRound";
import FixtureStatus from "../fixture/fixtureStatus";
import FixtureTeam from "../fixture/fixtureTeam";

const ScheduleFixture = memo(({ fixture }) => {
  return (
    <div>
      <Link to={'/fixture/' + fixture.fixture.id}>
        {
          fixture.fixture?.status?.short &&
          <FixtureStatus shortStatus={fixture.fixture.status.short} />
        }
        <span>
          <span>{fixture.league?.name}</span>
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
          <FixtureTeam team={fixture.teams.home} />
        }
        <span>
          {
            FIXTURE_STATUS[fixture.fixture.status.short]?.code >= 0
              && fixture.goals?.home
              && fixture.goals?.away
              && <FixtureScore goals={fixture.goals} score={fixture.score} shortStatus={fixture.fixture.status.short} />
          }
        </span>
        {
          fixture.teams?.away?.id &&
          <FixtureTeam team={fixture.teams.away} />
        }
      </Link>
    </div>
  );
});

export default ScheduleFixture;