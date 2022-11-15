import React, { memo } from "react";
import { useSelector } from "react-redux";

import StatTooltipPlayerButton from "../statTooltip/statTooltipPlayerButton";
import StatTooltipPlayer from "../statTooltip/statTooltipPlayer";

const LineupPlayer = memo(({ player, playerEvent }) => {
  const activeTooltip = useSelector((state) => state.statTooltip.activeTooltip);

  return (
    <div>
      <StatTooltipPlayerButton playerId={player.id} />
      {
        activeTooltip === player.id &&
        <StatTooltipPlayer playerId={player.id} />
      }
      <span>{player.pos} {player.number} {player.name}</span>
      {
        playerEvent && playerEvent.goal > 0 &&
        <span className="goal">{playerEvent.goal}골</span>
      }
      {
        playerEvent && playerEvent.assist > 0 &&
        <span className="assist">{playerEvent.assist}도움</span>
      }
      {
        playerEvent && playerEvent.yellow &&
        <span className="yellow">옐로카드</span>
      }
      {
        playerEvent && playerEvent.red &&
        <span className="red">레드카드</span>
      }
    </div>
  );
});

export default LineupPlayer;