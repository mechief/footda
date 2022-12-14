import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { closeSidebar } from "../../slices/liveWidgetSlice";

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