import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getFixture } from "../apiFootball/fixtures";
import { setId, setFixture } from "../slices/currentFixtureSlice";

import { FIXTURE_STATUS } from "../service/apiFootballService";

import FixtureDate from "../components/fixture/fixtureDate";
import FixtureLeagueRound from "../components/fixture/fixtureLeagueRound";
import FixtureStatus from "../components/fixture/fixtureStatus";
import FixtureSummary from "../components/fixture/fixtureSummary";
import FixtureTeam from "../components/fixture/fixtureTeam";
import FixtureScore from "../components/fixture/fixtureScore";
import Lineup from "../components/fixture/lineup";

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
    dispatch(setId(params.id));
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
          <div>
            <div>
              {
                date && 
                <FixtureDate date={date} />
              }
            </div>
            <div>
              <span>{league.name} </span>
              {
                league?.round && 
                <FixtureLeagueRound round={league.round} />
              }
            </div>
            <div>
              { 
                status?.short &&
                <FixtureStatus shortStatus={status.short} />
              }
              {
                teams?.home?.id && teams?.away?.id &&
                <span>
                  <FixtureTeam team={teams.home} />
                  <FixtureTeam team={teams.away} />
                </span>
              }
              {
                FIXTURE_STATUS[status?.short]?.code >= 0
                  && goals?.home
                  && goals?.away
                  && <FixtureScore goals={goals} score={score} shortStatus={status.short} />
              }
              <FixtureSummary events={teamEvents.home} />
              <FixtureSummary events={teamEvents.away} />
            </div>
            {
              lineups[0]?.team?.id && (
                <div className="lineups">
                  <Lineup lineup={lineups[0]} events={teamEvents.home} />
                  <Lineup lineup={lineups[1]} events={teamEvents.away} />
                </div>
              )
            }
          </div>
        )
      }
    </>
  );
}

export default Fixture;