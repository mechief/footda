import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { addWidgetFixtureId } from "../../slices/liveWidgetSlice";

const AddWidgetButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 2px 4px;
  border: none;
  border-radius: 2px;
  background: #e5caab;
`;

const LiveSidebarAddWidgetButton = ({ fixtureId }) => {
  const dispatch = useDispatch();

  const onClickButton = () => {
    dispatch(addWidgetFixtureId(fixtureId));
  }

  return (
    <AddWidgetButton type="button" onClick={onClickButton}>지켜보기</AddWidgetButton>
  );
}

export default LiveSidebarAddWidgetButton;