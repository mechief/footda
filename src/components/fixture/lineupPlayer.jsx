import React, { memo } from "react";
import styled, { css } from "styled-components";

import StatTooltipPlayer from "../statTooltip/statTooltipPlayer";
import { IconGoal, IconAssist, IconYellowCard, IconRedCard } from "../icons/fixtureIcons";
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
  ${props => props.isSubstOut && css`
    color: #888;
  `}
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

const PlayerEventIcon = styled.span`
  > svg {
    vertical-align: middle;
  }
`;

const PlayerEventCount = styled.span`
  display: inline-block;
  margin-left: -2px;
  vertical-align: sub;
  font-size: 11px;
  font-weight: 500;
`;

const LineupPlayer = memo(({ player, playerEvent, isSubstOut = false }) => {
  return (
    <LineupPlayerWrapper isSubstOut={isSubstOut}>
      <StatTooltipPlayer playerId={player.id} />
      <PlayerPosition>{positionTo2Char(player.pos)}</PlayerPosition>
      <PlayerNumber>{player.number}</PlayerNumber>
      <PlayerName>{player.name}</PlayerName>
      { playerEvent && playerEvent.goal > 0 &&
        <PlayerEventIcon>
          <IconGoal />
          <PlayerEventCount>{playerEvent.goal}</PlayerEventCount>
        </PlayerEventIcon>
      }
      { playerEvent && playerEvent.assist > 0 &&
        <PlayerEventIcon>
          <IconAssist />
          <PlayerEventCount>{playerEvent.assist}</PlayerEventCount>
        </PlayerEventIcon>
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