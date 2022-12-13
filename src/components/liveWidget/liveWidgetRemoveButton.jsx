import React, { memo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { removeWidgetFixtureId } from "../../slices/liveWidgetSlice";

const RemoveWidgetButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 2px 4px;
  border: none;
  border-radius: 2px;
  background: #e5caab;
`;

const LiveWidgetRemoveButton = memo(({ fixtureId }) => {
  const dispatch = useDispatch();

  const onClickButton = () => {
    dispatch(removeWidgetFixtureId(fixtureId));
  }

  return (
    <RemoveWidgetButton type="button" onClick={onClickButton}>닫기</RemoveWidgetButton>
  );
});

export default LiveWidgetRemoveButton;