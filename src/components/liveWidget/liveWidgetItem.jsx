import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { FIXTURE_STATUS, getLeagueNameKr } from "../../service/apiFootballService";
import { removeWidgetFixtureId } from "../../slices/liveWidgetSlice";

import LiveWidgetShowFullButton from "./liveWidgetShowFullButton";
import FixtureDate from "../fixture/fixtureDate";
import FixtureStatus from "../fixture/fixtureStatus";
import FixtureScore from "../fixture/fixtureScore";
import LiveSidebarFixtureTeam from "./liveSidebarFixtureTeam";

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

const LiveWidgetItem = memo(({ fixtureId }) => {
  const fixture = useSelector((state) => state.fixture.fixtures.find(item => item.fixture.id === fixtureId));
  const dispatch = useDispatch();

  const onClickRemove = () => {
    dispatch(removeWidgetFixtureId(fixtureId));
  }

  return (
    <ItemWrapper>
      <RemoveWidgetButton type="button" onClick={onClickRemove}>닫기</RemoveWidgetButton>
      <span>{getLeagueNameKr(fixture.league?.id)}</span>
      { fixture.fixture?.date && 
        <FixtureDate date={fixture.fixture.date} onlyTime={true} />
      }
      <ItemDetail>
        { fixture.teams?.home?.id &&
          <LiveSidebarFixtureTeam team={fixture.teams.home} />
        }
        <ItemSummary>
          <ItemStatus>
            { fixture.fixture?.status?.short &&
              <FixtureStatus shortStatus={fixture.fixture.status.short} />
            }
          </ItemStatus>
          <ItemScore>
            { FIXTURE_STATUS[fixture.fixture.status.short]?.code >= 0 &&
              <FixtureScore goals={fixture.goals} score={fixture.score} shortStatus={fixture.fixture.status.short} />
            }
          </ItemScore>
        </ItemSummary>
        { fixture.teams?.away?.id &&
          <LiveSidebarFixtureTeam team={fixture.teams.away} />
        }
      </ItemDetail>
      <LiveWidgetShowFullButton fixtureId={fixtureId} />
    </ItemWrapper>
  );
});

export default LiveWidgetItem;