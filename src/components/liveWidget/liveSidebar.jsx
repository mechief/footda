import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getRoundFixtures } from "../../apiFootball/fixtures";
import fixtureSlice from "../../slices/fixtureSlice";
import { addLiveFixtureIds, closeSidebar } from "../../slices/liveWidgetSlice";

import LiveSidebarFixtureItem from "./liveSidebarFixtureItem";

const LiveSidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  width: 300px;
  padding-top: 60px;
  background: #e0e0e0;
`;

const LiveSidebarTitleArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #e0e0e0;
`;
  
const LiveSidebarTitle = styled.h3`
  line-height: 20px;
  padding: 20px 10px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  margin-top: -11px;
  padding: 4px 6px;
  border: none;
  line-height: 1;
  background: #666;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  border-radius: 2px;
`;

const LiveSidebarContent = styled.div`
  overflow-y: auto;
  width: 100%;
  padding: 0 10px 20px;
`;

const LiveSidebarFixtureList = styled.ul`
`;

const LiveSidebar = () => {
  const fixtures = useSelector((state) => state.fixture.fixtures);
  const liveFixtureIds = useSelector((state) => state.liveWidget.liveFixtureIds);
  const dispatch = useDispatch();

  useEffect(() => {
    if (liveFixtureIds.length === 0) {
      getRoundFixtures()
        .then((res) => {
          dispatch(fixtureSlice.actions.addFixtures(res));
          dispatch(addLiveFixtureIds(res.map(item => item.fixture.id)));
          console.log(res);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  const onClickClose = () => {
    dispatch(closeSidebar());
  }

  return (
    <LiveSidebarWrapper>
      <LiveSidebarTitleArea>
        <LiveSidebarTitle>오늘의 경기</LiveSidebarTitle>
        <CloseButton type="button" onClick={onClickClose}>닫기</CloseButton>
      </LiveSidebarTitleArea>
      <LiveSidebarContent>
        <LiveSidebarFixtureList>
          { liveFixtureIds.map(fixtureId => 
            <LiveSidebarFixtureItem key={`liveFixture_${fixtureId}`} fixture={fixtures.find(item => item.fixture.id === fixtureId)} />
          )}
        </LiveSidebarFixtureList>
      </LiveSidebarContent>
    </LiveSidebarWrapper>
  );
}

export default LiveSidebar;