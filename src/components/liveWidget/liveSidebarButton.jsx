import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { openSidebar } from "../../slices/liveWidgetSlice";

const SidebarButtonWrapper = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
`;

const SidebarButton = styled.button`
  border: 1px solid #555;
  font-size: 18px;
  font-weight: 500;
  background: #ccc;
`;

const LiveSidebarButton = () => {
  const sidebarOpened = useSelector((state) => state.liveWidget.sidebarOpened);

  const dispatch = useDispatch();

  const onClickButton = () => {
    if (!sidebarOpened) {
      dispatch(openSidebar());
    }
  }

  return (
    <>
      { !sidebarOpened && (
        <SidebarButtonWrapper>
          <SidebarButton type="button" onClick={onClickButton}>다른 경기</SidebarButton>
        </SidebarButtonWrapper>
      )}
    </>
  );
}

export default LiveSidebarButton;