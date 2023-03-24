import React, { useLayoutEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
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

import LiveSidebar from "../components/liveWidget/liveSidebar";
import LiveSidebarButton from "../components/liveWidget/liveSidebarButton"
import LiveWidget from "../components/liveWidget/liveWidget";

import { 
  FixtureWrapper, 
  FixtureInfo, 
  FixtureSummary, 
  FixtureDetailSection,
  FixtureStatusWrapper,
  FixtureScoreWrapper,
  LineupWrapper,
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
  const { state: listData } = useLocation();

  const dispatch = useDispatch();
  const isSidebarOpened = useSelector((state) => state.liveWidget.isSidebarOpened);

  const { data, isLoading, isError } = useQuery(fixtureQuery(fixtureId));

  const fixtureData = data ?? listData;

  const status = fixtureData?.fixture?.status || null;
  const teams = fixtureData?.teams || null;

  useLayoutEffect(() => {
    dispatch(setFixtureId(fixtureId));
  }, [fixtureId]);

  useLayoutEffect(() => {
    if (!fixtureData) return;

    dispatch(setFixture(fixtureData));
  }, [fixtureData]);

  // 팀별 events filter
  const teamEvents = useMemo(() => {
    if (!fixtureData?.events) return null;

    return {
      home: fixtureData?.events.filter(v => {
        return v.team.id === teams.home.id;
      }),
      away: fixtureData?.events.filter(v => {
        return v.team.id === teams.away.id;
      })
    }
  }, [fixtureData?.events]);

  const renderLineup = (homeAway) => {
    const index = homeAway === 'home' ? 0 : 1;

    if (fixtureData.lineups && fixtureData.lineups[index]?.team?.id) {  
      return <Lineup lineup={fixtureData.lineups[index]} events={teamEvents[homeAway]} />;
    } else if (isLoading) {
      return <LineupWrapper>라인업을 불러오는 중입니다.</LineupWrapper>;
    } else {
      return <LineupWrapper>라인업 발표 전 입니다.</LineupWrapper>;
    }
  }

  if (isLoading && !listData) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>경기 정보를 불러오는 중 에러가 발생했습니다.</div>;
  }
  
  return (
    <>
      <LiveSidebarButton />
      { isSidebarOpened &&
        <LiveSidebar />
      }
      { fixtureData && 
        <FixtureWrapper>
          <FixtureInfo>
            <div>{dayjs(fixtureData.fixture.date).format('M/D HH:mm')}</div>
            { fixtureData.league?.id &&
              <FixtureLeague league={fixtureData.league} />
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
                <FixtureScore goals={fixtureData.goals} score={fixtureData.score} shortStatus={status.short} />
              </FixtureScoreWrapper>
            )}
            { teamEvents?.home && 
              teamEvents?.away &&
              <>
                <FixtureEventSummary events={teamEvents.home} isHome={true} />
                <FixtureEventSummary events={teamEvents.away} />
              </>
            }
          </FixtureSummary>
          <FixtureDetailSection>
            {renderLineup('home')}
            <FixtureDetail fixtureStatus={getFixtureStatusCode(status?.short)} />
            {renderLineup('away')}
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