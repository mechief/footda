import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { closeSidebar } from "../../slices/liveWidgetSlice";

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 2px 4px;
  border: none;
  background: #666;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  border-radius: 2px;
`;

const LiveSidebarCloseButton = () => {
  const dispatch = useDispatch();

  const onClickButton = () => {
    dispatch(closeSidebar());
  }

  return (
    <CloseButton type="button" onClick={onClickButton}>닫기</CloseButton>
  );
}

export default LiveSidebarCloseButton;