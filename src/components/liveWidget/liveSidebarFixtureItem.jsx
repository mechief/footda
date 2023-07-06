import React, { memo } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import { getFixtureStatusCode, getFixtureStatusText } from "../../utils/fixture";
import { getLeagueNameKr } from "../../utils/league";

import LiveSidebarAddWidgetButton from "./liveSidebarAddWidgetButton";
import FixtureScore from "../fixture/fixtureScore";
import LiveSidebarFixtureTeam from "./liveSidebarFixtureTeam";

const LiveSidebarFixtureItem = memo(({ fixture }) => {
  return (
    <ItemWrapper>
      <LiveSidebarAddWidgetButton fixtureId={fixture.fixture.id} />
      <span>{getLeagueNameKr(fixture.league?.id)}</span>
      { fixture.fixture?.date && 
        <span>{dayjs(fixture.fixture.date).format('HH:mm')}</span>
      }
      <ItemDetail>
        { fixture.teams?.home?.id &&
          <LiveSidebarFixtureTeam team={fixture.teams.home} />
        }
        <ItemSummary>
          <ItemStatus>
            { fixture.fixture?.status?.short &&
              getFixtureStatusText(fixture.fixture.status.short)
            }
          </ItemStatus>
          <ItemScore>
            { getFixtureStatusCode(fixture.fixture.status.short) >= 0 &&
              <FixtureScore goals={fixture.goals} score={fixture.score} shortStatus={fixture.fixture.status.short} />
            }
          </ItemScore>
        </ItemSummary>
        { fixture.teams?.away?.id &&
          <LiveSidebarFixtureTeam team={fixture.teams.away} />
        }
      </ItemDetail>
    </ItemWrapper>
  );
});

const ItemWrapper = styled.li`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px 6px;
  border: 2px solid #daa163;
  background: #f3dfc9;
  font-size: 13px;
  text-align: center;
`;

const ItemDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 0 5px;
  width: 100%;
  margin-top: 5px;
`;

const ItemSummary = styled.span`
  flex: 0 0 54px;
`;

const ItemStatus = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 12px;
`;

const ItemScore = styled.span`
  display: inline-block;
  line-height: 28px;
  font-size: 18px;
  font-weight: 700;
`;

export default LiveSidebarFixtureItem;