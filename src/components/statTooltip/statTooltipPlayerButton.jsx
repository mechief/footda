import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { initTooltip } from "../actions/statTooltip";
import { openTooltip } from "../../slices/statTooltipSlice";
import { IconPlayer } from "../icons/fixtureIcons";

const ButtonTooltip = styled.button`
  background: inherit;
  padding: 2px;
  border: none;
  box-shadow: none;
  border-radius: 0;
`;

const StatTooltipPlayerButton = memo(({ playerId }) => {
  const statTooltipPlayers = useSelector((state) => state.statTooltip.players);
  const dispatch = useDispatch();
  
  const onClickTooltip = async (e) => {
    if (!statTooltipPlayers.hasOwnProperty(playerId)) {
      await dispatch(initTooltip(playerId));
    }
    
    dispatch(openTooltip(playerId));
  }

  return (
    <ButtonTooltip onClick={onClickTooltip}>
      <IconPlayer />
      {/* <SoundOnly>선수 정보 보기</SoundOnly> */}
    </ButtonTooltip>
  );
});

export default StatTooltipPlayerButton;