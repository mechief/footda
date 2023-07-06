import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ErrorBoundary from "../components/error/errorBoundary";

import useFixture from "../hooks/fixture/useFixture";
import { getFixtureStatusCode, getFixtureStatusText } from "../utils/fixture";

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

const Fixture = () => {
  const isSidebarOpened = useSelector((state) => state.liveWidget.isSidebarOpened);

  const { isNoInitialLoading, isLoading, isError, fixtureData, teamEvents } = useFixture();

  const status = fixtureData?.fixture?.status || null;
  const teams = fixtureData?.teams || null;

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

  if (isNoInitialLoading) {
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