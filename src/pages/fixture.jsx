import React, { useLayoutEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import ErrorBoundary from "../components/error/errorBoundary";

import { getFixture } from "../apiFootball/fixtures";
import { setFixtureId, setFixture } from "../slices/currentFixtureSlice";

import { getFixtureStatusCode, getFixtureStatusText } from "../service/apiFootballService";

import FixtureLeague from "../components/fixture/fixtureLeague";
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

const queryConfig = {
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 5,
}

const fixtureQuery = (fixtureId) => ({
  queryKey: ['fixture', fixtureId],
  queryFn: async () => getFixture(fixtureId),
  ...queryConfig,
});

const Fixture = () => {
  const fixtureId = Number(useParams().id);

  const dispatch = useDispatch();

  const { data, isLoading, isError } = useQuery(fixtureQuery(fixtureId));

  const status = data?.fixture?.status || null;
  const teams = data?.teams || null;

  useLayoutEffect(() => {
    dispatch(setFixtureId(fixtureId));
  }, [fixtureId]);

  useLayoutEffect(() => {
    if (!data) return;

    dispatch(setFixture(data));
  }, [data]);

  // 팀별 events filter
  const teamEvents = useMemo(() => {
    if (!data?.events) return null;

    return {
      home: data?.events.filter(v => {
        return v.team.id === teams.home.id;
      }),
      away: data?.events.filter(v => {
        return v.team.id === teams.away.id;
      })
    }
  }, [data?.events]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>경기 정보를 불러오는 중 에러가 발생했습니다.</div>;
  }
  
  return (
    <>
      <LiveSidebarButton />
      { data && 
        <FixtureWrapper>
          <FixtureInfo>
            <div>{dayjs(data.fixture.date).format('M/D HH:mm')}</div>
            { data.league?.id &&
              <FixtureLeague league={data.league} />
            }
            { status?.short && (
              <FixtureStatusWrapper>{getFixtureStatusText(status.short)}</FixtureStatusWrapper>
            )}
          </FixtureInfo>
          <FixtureSummary>
            <FixtureTeam team={teams.home} isHome={true} />
            <FixtureTeam team={teams.away} />
            { getFixtureStatusCode(status?.short) >= 0 && (
              <FixtureScoreWrapper>
                <FixtureScore goals={data.goals} score={data.score} shortStatus={status.short} />
              </FixtureScoreWrapper>
            )}
            <FixtureEventSummary events={teamEvents.home} isHome={true} />
            <FixtureEventSummary events={teamEvents.away} />
          </FixtureSummary>
          <FixtureDetailSection>
            { data.lineups[0]?.team?.id 
              ? <Lineup lineup={data.lineups[0]} events={teamEvents.home} />
              : <LineupNoData />
            }
            <FixtureDetail fixtureStatus={getFixtureStatusCode(status?.short)} />
            { data.lineups[1]?.team?.id
              ? <Lineup lineup={data.lineups[1]} events={teamEvents.away} />
              : <LineupNoData />
            }
          </FixtureDetailSection>
        </FixtureWrapper>
      }
      <ErrorBoundary key='liveWidget' fallback={<></>}>
        <LiveWidget />
      </ErrorBoundary>
    </>
  );
}

export default Fixture;