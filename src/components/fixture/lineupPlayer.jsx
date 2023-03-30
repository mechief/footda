import React, { memo } from "react";
import styled, { css } from "styled-components";

import { positionTo2Char } from "../../service/footballFunctions";

import StatTooltipPlayer from "../statTooltip/statTooltipPlayer";
import { HiOutlineArrowLeftCircle, HiOutlineArrowRightCircle } from "react-icons/hi2";
import { IconGoal, IconAssist, IconYellowCard, IconRedCard } from "../icons/fixtureIcons";

const LineupPlayerWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0 5px;
  position: relative;
  min-height: 28px;
  margin-top: 1px;
  padding: 0 45px 0 10px;
  background: #f5f5f5;
  font-size: 14px;
  color: #222;
  & > span {
    flex: 0 1 auto;
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
  min-width: 2em;
  font-size: 13px;
`;

const NameAndEvent = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 0 2px;
`;

const PlayerName = styled.span`
  text-align: left;
`;

const PlayerEventWrapper = styled.span``;

const PlayerEventIcon = styled.span`
  display: inline-block;
  padding: 0 1px;
  > svg {
    vertical-align: middle;
  }
`;

const SubstTime = styled.span`
  display: inline-block;
  vertical-align: sub;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: -0.5px;
`;

const PlayerEventCount = styled.span`
  display: inline-block;
  margin-left: -2px;
  vertical-align: sub;
  font-size: 11px;
  font-weight: 500;
`;

const LineupPlayer = memo(({ player, playerEvent, substTimes, isSubstOut = false }) => {
  return (
    <LineupPlayerWrapper isSubstOut={isSubstOut}>
      { player.pos &&
        <PlayerPosition>{positionTo2Char(player.pos)}</PlayerPosition>
      }
      <PlayerNumber>{player.number}</PlayerNumber>
      <NameAndEvent>
        <PlayerName>{player.name}</PlayerName>
        <PlayerEventWrapper>
          { substTimes && 
            <>
              { substTimes.in[player.id] &&
                <PlayerEventIcon>
                  <HiOutlineArrowLeftCircle size="1.25em" />
                  <SubstTime>{substTimes.in[player.id]}`</SubstTime>
                </PlayerEventIcon>
              }
              { substTimes.out[player.id] &&
                <PlayerEventIcon>
                  <HiOutlineArrowRightCircle size="1.25em" />
                  <SubstTime>{substTimes.out[player.id]}`</SubstTime>
                </PlayerEventIcon>
              }
            </>
          }
          { playerEvent && 
            <>
              { playerEvent.goal > 0 &&
                <PlayerEventIcon>
                  <IconGoal />
                  <PlayerEventCount>{playerEvent.goal}</PlayerEventCount>
                </PlayerEventIcon>
              }
              { playerEvent.assist > 0 &&
                <PlayerEventIcon>
                  <IconAssist />
                  <PlayerEventCount>{playerEvent.assist}</PlayerEventCount>
                </PlayerEventIcon>
              }
              { playerEvent.yellow &&
                <IconYellowCard />
              }
              { playerEvent.red &&
                <IconRedCard />
              }
            </>
          }
        </PlayerEventWrapper>
      </NameAndEvent>
      <StatTooltipPlayer playerId={player.id} />
    </LineupPlayerWrapper>
  );
});

export default LineupPlayer;