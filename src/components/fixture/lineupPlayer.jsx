import React, { memo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import StatTooltipPlayerButton from "../statTooltip/statTooltipPlayerButton";
import StatTooltipPlayer from "../statTooltip/statTooltipPlayer";
import { IconGoal, IconYellowCard, IconRedCard } from "../icons/fixtureIcons";
import { positionTo2Char } from "../../service/footballFunctions";

const LineupPlayerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0 4px;
  font-size: 14px;
  color: #222;
  & > span {
    flex: 0 0 auto;
  }
`;

const PlayerPosition = styled.span`
  display: inline-block;
  min-width: 1.5em;
  font-weight: 500;
`;

const PlayerNumber = styled.span`
  display: inline-block;
  min-width: 1.8em;
  font-size: 13px;
`;

const PlayerName = styled.span`
  font-size: 15px;
`;

const PlayerEventNumber = styled.span`
  display: inline-block;
  vertical-align: sub;
  font-size: 11px;
  font-weight: 500;
`;

const LineupPlayer = memo(({ player, playerEvent }) => {
  const activeTooltip = useSelector((state) => state.statTooltip.activeTooltip);

  return (
    <LineupPlayerWrapper>
      <StatTooltipPlayerButton playerId={player.id} />
      { activeTooltip === player.id &&
        <StatTooltipPlayer playerId={player.id} />
      }
      <PlayerPosition>{positionTo2Char(player.pos)}</PlayerPosition>
      <PlayerNumber>{player.number}</PlayerNumber>
      <PlayerName>{player.name}</PlayerName>
      { playerEvent && playerEvent.goal > 0 &&
        <span>
          <IconGoal />
          <PlayerEventNumber>{playerEvent.goal}</PlayerEventNumber>
        </span>
      }
      { playerEvent && playerEvent.assist > 0 &&
        <span>
          <IconGoal />
          <PlayerEventNumber>as {playerEvent.assist}</PlayerEventNumber>
        </span>
      }
      { playerEvent && playerEvent.yellow &&
        <IconYellowCard />
      }
      { playerEvent && playerEvent.red &&
        <IconRedCard />
      }
    </LineupPlayerWrapper>
  );
});

export default LineupPlayer;