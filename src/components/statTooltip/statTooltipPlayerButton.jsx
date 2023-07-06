import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { initTooltip } from "../../actions/statTooltip";
import { openTooltip } from "../../slices/statTooltipSlice";

import { IoMdStats } from "react-icons/io";

const StatTooltipPlayerButton = memo(({ playerId }) => {
  const statTooltipPlayers = useSelector((state) => state.statTooltip.players);
  const dispatch = useDispatch();
  
  const onClickTooltip = async () => {
    try {
      if (!statTooltipPlayers.hasOwnProperty(playerId)) {
        await dispatch(initTooltip(playerId));
      }
      
      dispatch(openTooltip(playerId));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ButtonTooltip onClick={onClickTooltip} title="시즌 기록">
      <IoMdStats />
    </ButtonTooltip>
  );
});

const ButtonTooltip = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40px;
  border: none;
  background: #e1e1e1;
  font-size: 20px;
  box-shadow: none;
  border-radius: 0;
  color: #000;
`;

export default StatTooltipPlayerButton;