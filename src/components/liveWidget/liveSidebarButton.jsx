import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { openSidebar } from "../../slices/liveWidgetSlice";

const SidebarButtonWrapper = styled.div`
  position: fixed;
  top: 66px;
  left: 10px;
`;

const SidebarButton = styled.button`
  padding: 6px 10px;
  border: none;
  background: #5f9ea0;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  border-radius: 4px;
`;

const LiveSidebarButton = () => {
  const isSidebarOpened = useSelector((state) => state.liveWidget.isSidebarOpened);

  const dispatch = useDispatch();

  const onClickButton = () => {
    if (!isSidebarOpened) {
      dispatch(openSidebar());
    }
  }

  return (
    <>
      { !isSidebarOpened && (
        <SidebarButtonWrapper>
          <SidebarButton type="button" onClick={onClickButton}>다른 경기</SidebarButton>
        </SidebarButtonWrapper>
      )}
    </>
  );
}

export default LiveSidebarButton;