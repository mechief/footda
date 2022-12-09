import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getRoundFixtures } from "../../apiFootball/fixtures";
import fixtureSlice from "../../slices/fixtureSlice";

import LiveSidebarCloseButton from "./liveSidebarCloseButton";
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

const LiveSidebarContent = styled.div`
  overflow-y: auto;
  width: 100%;
  padding: 0 10px 20px;
`;

const LiveSidebarFixtureList = styled.ul`
`;


const LiveSidebar = () => {
  const fixtures = useSelector((state) => state.fixture.fixtures);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        getRoundFixtures()
          .then((res) => {
            dispatch(fixtureSlice.actions.addFixtures(res));
            console.log(res);
          })
          .catch((error) => {
            console.log(error.message);
          });
      } catch(error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <LiveSidebarWrapper>
      <LiveSidebarTitleArea>
        <LiveSidebarTitle>오늘의 경기</LiveSidebarTitle>
        <LiveSidebarCloseButton />
      </LiveSidebarTitleArea>
      <LiveSidebarContent>
        <LiveSidebarFixtureList>
          {fixtures.map(v => <LiveSidebarFixtureItem key={v.fixture.id} fixture={v} />)}
        </LiveSidebarFixtureList>
      </LiveSidebarContent>
    </LiveSidebarWrapper>
  );
}

export default LiveSidebar;