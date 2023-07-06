import React, { memo } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import styled from "styled-components";

import { removeLiveWidget } from "../../slices/liveWidgetSlice";

import { getFixtureStatusCode, getFixtureStatusText } from "../../utils/fixture";
import { getLeagueNameKr } from "../../utils/league";

import LiveWidgetShowFullButton from "./liveWidgetShowFullButton";
import FixtureScore from "../fixture/fixtureScore";
import LiveSidebarFixtureTeam from "./liveSidebarFixtureTeam";

const LiveWidgetItem = memo(({ fixtureData }) => {
  const dispatch = useDispatch();

  const onClickRemove = () => {
    dispatch(removeLiveWidget(fixtureData.fixture.id));
  }

  return (
    <ItemWrapper>
      <RemoveWidgetButton type="button" onClick={onClickRemove}>닫기</RemoveWidgetButton>
      <span>{getLeagueNameKr(fixtureData.league?.id)}</span>
      { fixtureData.fixture?.date && 
        <span>{dayjs(fixtureData.fixture.date).format('HH:mm')}</span>
      }
      <ItemDetail>
        { fixtureData.teams?.home?.id &&
          <LiveSidebarFixtureTeam team={fixtureData.teams.home} />
        }
        <ItemSummary>
          <ItemStatus>
            { fixtureData.fixture?.status?.short &&
              getFixtureStatusText(fixtureData.fixture.status.short)
            }
          </ItemStatus>
          <ItemScore>
            { getFixtureStatusCode(fixtureData.fixture.status.short) >= 0 &&
              <FixtureScore goals={fixtureData.goals} score={fixtureData.score} shortStatus={fixtureData.fixture.status.short} />
            }
          </ItemScore>
        </ItemSummary>
        { fixtureData.teams?.away?.id &&
          <LiveSidebarFixtureTeam team={fixtureData.teams.away} />
        }
      </ItemDetail>
      <LiveWidgetShowFullButton fixtureData={fixtureData} />
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

const RemoveWidgetButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 2px 4px;
  border: none;
  border-radius: 2px;
  background: #e5caab;
`;

const ItemDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 0 5px;
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

export default LiveWidgetItem;