import React, { useEffect, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getFixture } from "../apiFootball/fixtures";
import { setFixtureId, setFixture } from "../slices/currentFixtureSlice";

import { FIXTURE_STATUS } from "../service/apiFootballService";

import FixtureDate from "../components/fixture/fixtureDate";
import FixtureLeague from "../components/fixture/fixtureLeague";
import FixtureStatus from "../components/fixture/fixtureStatus";
import FixtureEventSummary from "../components/fixture/fixtureEventSummary";
import FixtureTeam from "../components/fixture/fixtureTeam";
import FixtureScore from "../components/fixture/fixtureScore";
import FixtureDetail from "../components/fixture/fixtureDetail";
import Lineup from "../components/fixture/lineup";
import LineupNoData from "../components/fixture/lineupNoData";

import LiveSidebarButton from "../components/liveWidget/liveSidebarButton"
import LiveWidget from "../components/liveWidget/liveWidget";

import { 
  FixtureWrapper, 
  FixtureInfo, 
  FixtureSummary, 
  FixtureDetailSection,
  FixtureStatusWrapper,
  FixtureScoreWrapper,
} from "../components/fixture/fixtureStyled";

const Fixture = () => {
  const fixtureData = useLoaderData();
  const {id, date, status} = fixtureData.fixture;
  const {
    goals, league, lineups, players,
    score, statistics, events, teams,
  } = fixtureData;

  const dispatch = useDispatch();

  console.log(fixtureData);

  useEffect(() => {
    dispatch(setFixtureId(id));
    dispatch(setFixture(fixtureData));
  }, [id]);

  // 팀별 events filter
  const teamEvents = useMemo(() => {
    return {
      home: events.filter(v => {
        return v.team.id === teams.home.id;
      }),
      away: events.filter(v => {
        return v.team.id === teams.away.id;
      })
    }
  }, [events]);
  
  return (
    <>
      <LiveSidebarButton />
      {
        id != '' && date && (  
          <FixtureWrapper>
            <FixtureInfo>
              <div><FixtureDate date={date} /></div>
              { league?.id &&
                <FixtureLeague league={league} />
              }
              { status?.short && (
                <FixtureStatusWrapper>
                  <FixtureStatus shortStatus={status.short} />
                </FixtureStatusWrapper>
              )}
            </FixtureInfo>
            <FixtureSummary>
              { teams?.home?.id && teams?.away?.id && <>
                  <FixtureTeam team={teams.home} isHome={true} />
                  <FixtureTeam team={teams.away} />
                </>
              }
              { FIXTURE_STATUS[status?.short]?.code >= 0 && (
                <FixtureScoreWrapper>
                  <FixtureScore goals={goals} score={score} shortStatus={status.short} />
                </FixtureScoreWrapper>
              )}
              <FixtureEventSummary events={teamEvents.home} isHome={true} />
              <FixtureEventSummary events={teamEvents.away} />
            </FixtureSummary>
            <FixtureDetailSection>
              { lineups[0]?.team?.id 
                ? <Lineup lineup={lineups[0]} events={teamEvents.home} />
                : <LineupNoData />
              }
              <FixtureDetail />
              { lineups[1]?.team?.id
                ? <Lineup lineup={lineups[1]} events={teamEvents.away} />
                : <LineupNoData />
              }
            </FixtureDetailSection>
          </FixtureWrapper>
        )
      }
      <LiveWidget />
    </>
  );
}

export const fixtureLoader = async ({ params }) => {
  return await getFixture(params.id);
}

export default Fixture;