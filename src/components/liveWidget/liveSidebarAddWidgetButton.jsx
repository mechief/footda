import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";

import { addLiveWidget } from "../../slices/liveWidgetSlice";

const LiveSidebarAddWidgetButton = ({ fixtureId }) => {
  const currentFixtureId = useSelector((state) => state.currentFixture.id);
  const widgetFixtureIds = useSelector((state) => state.liveWidget.widgetFixtureIds);
  const dispatch = useDispatch();

  const showButton = () => {
    if (fixtureId === currentFixtureId) {
      return <AddWidgetSpan isCurrent={true}>현재 경기</AddWidgetSpan>
    } else if (widgetFixtureIds.includes(fixtureId)) {
      return <AddWidgetSpan isCurrent={false}>등록됨</AddWidgetSpan>
    } else {
      return <AddWidgetButton type="button" onClick={onClickButton}>지켜보기</AddWidgetButton>
    }
  }

  const onClickButton = () => {
    dispatch(addLiveWidget(fixtureId));
  }

  return (
    <>
      {showButton()}
    </>
  );
}

const AddWidgetButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 2px 4px;
  border: none;
  border-radius: 2px;
  background: #e5caab;
`;

const AddWidgetSpan = styled.span`
  display: block;
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 2px 4px;
  border: none;
  border-radius: 2px;
  background: #c0b4a6;
  ${props => props.isCurrent && css`
    background: #c3c4e0;
  `}
`;

export default LiveSidebarAddWidgetButton;