import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { initTooltip } from "../actions/statTooltip";
import { openTooltip } from "../../slices/statTooltipSlice";

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
    <button type="button" onClick={onClickTooltip}>선수 정보 보기</button>
  );
});

export default StatTooltipPlayerButton;