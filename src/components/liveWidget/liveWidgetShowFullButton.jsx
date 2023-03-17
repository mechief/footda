import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { addLiveWidget, removeLiveWidget } from "../../slices/liveWidgetSlice";

import { IconOpenInNewReverse } from "../icons/commonIcons";

const ShowFullButton = styled.button`
  position: absolute;
  top: 5px;
  left: 5px;
  border: none;
  background: none;
`;

const LiveWidgetShowFullButton = memo(({ fixtureId }) => {
  const currentFixtureId = useSelector((state) => state.currentFixture.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickButton = () => {
    dispatch(addLiveWidget(currentFixtureId));
    dispatch(removeLiveWidget(fixtureId));

    navigate('/fixture/' + fixtureId);
  }

  return (
    <ShowFullButton type="button" onClick={onClickButton}>
      <IconOpenInNewReverse />
    </ShowFullButton>
  );
});

export default LiveWidgetShowFullButton;