import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getFixture } from "../apiFootball/fixtures";
import { setFixtureId, setFixture } from "../slices/currentFixtureSlice";

import { FIXTURE_STATUS } from "../service/apiFootballService";

import FixtureDate from "../components/fixture/fixtureDate";
import FixtureLeague from "../components/fixture/fixtureLeague";
import FixtureStatus from "../components/fixture/fixtureStatus";
import FixtureEventSummary from "../components/fixture/fixtureEventSummary";
import FixtureTeam from "../components/fixture/fixtureTeam";
import FixtureScore from "../components/fixture/fixtureScore";
import Lineup from "../components/fixture/lineup";

import { FixtureWrapper, FixtureInfo, FixtureSummary, FixtureLineups } from "../components/fixture/fixtureStyled";

const Fixture = () => {
  const id = useSelector((state) => state.currentFixture.id);
  const date = useSelector((state) => state.currentFixture.date);
  const referee = useSelector((state) => state.currentFixture.referee);
  const status = useSelector((state) => state.currentFixture.status);
  const venue = useSelector((state) => state.currentFixture.venue);
  const goals = useSelector((state) => state.currentFixture.goals);
  const league = useSelector((state) => state.currentFixture.league);
  const lineups = useSelector((state) => state.currentFixture.lineups);
  const players = useSelector((state) => state.currentFixture.players);
  const score = useSelector((state) => state.currentFixture.score);
  const statistics = useSelector((state) => state.currentFixture.statistics);
  const events = useSelector((state) => state.currentFixture.events);
  const teams = useSelector((state) => state.currentFixture.teams);
  
  const params = useParams();
  const dispatch = useDispatch();

  if (params.id === 'undefined') {
    return (
      <div>잘못된 경로입니다.</div>
    )
  }

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

  useEffect(() => {
    dispatch(setFixtureId(params.id));
  }, [params.id]);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          getFixture(id)
            .then((res) => {
              // 커밋 테스트
              console.log(res);
              dispatch(setFixture(res));
            })
            .catch((error) => {
              console.log(error.message);
            });
        } catch(error) {
          console.log(error.message);
        }
      })();
    }
  }, [id]);
  
  return (
    <>
      {
        id != '' && date && (  
          <FixtureWrapper>
            <FixtureInfo>
              <FixtureDate date={date} />
              { league?.id &&
                <FixtureLeague league={league} />
              }
              { status?.short &&
                <FixtureStatus shortStatus={status.short} />
              }
            </FixtureInfo>
            <FixtureSummary>
              { teams?.home?.id && teams?.away?.id && <>
                  <FixtureTeam team={teams.home} isHome={true} />
                  <FixtureTeam team={teams.away} />
                </>
              }
              { FIXTURE_STATUS[status?.short]?.code >= 0
                  && goals?.home
                  && goals?.away
                  && <FixtureScore goals={goals} score={score} shortStatus={status.short} />
              }
              <FixtureEventSummary events={teamEvents.home} isHome={true} />
              <FixtureEventSummary events={teamEvents.away} />
            </FixtureSummary>
            { lineups[0]?.team?.id && (
                <FixtureLineups className="lineups">
                  <Lineup lineup={lineups[0]} events={teamEvents.home} />
                  <Lineup lineup={lineups[1]} events={teamEvents.away} />
                </FixtureLineups>
              )
            }
          </FixtureWrapper>
        )
      }
    </>
  );
}

export default Fixture;