import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { closeSidebar } from "../../slices/liveWidgetSlice";

import LiveSidebarList from "./liveSidebarList";

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
  padding-top: 50px;
  background: #e0e0e0;
`;

const LiveSidebarTitleArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: #e0e0e0;
`;
  
const LiveSidebarTitle = styled.h3`
  line-height: 18px;
  padding: 16px 10px;
  text-align: left;
  font-size: 18px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  margin-top: -11px;
  padding: 4px 6px;
  border: none;
  line-height: 1;
  background: #aaa;
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

const LiveSidebar = () => {
  const dispatch = useDispatch();

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
        <LiveSidebarList />
      </LiveSidebarContent>
    </LiveSidebarWrapper>
  );
}

export default LiveSidebar;