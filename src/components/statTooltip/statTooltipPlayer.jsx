import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import ErrorBoundary from "../error/errorBoundary";

import * as Popover from '@radix-ui/react-popover';

import StatTooltipPlayerButton from "./statTooltipPlayerButton"
import StatTooltipPlayerDetail from "./statTooltipPlayerDetail";

const ButtonWrapper = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
`;

const StatTooltipPlayer = ({ playerId }) => {
  const activeTooltip = useSelector((state) => state.statTooltip.activeTooltip);
  
  return (
    <>
      <Popover.Root>
        <Popover.Trigger asChild>
          <ButtonWrapper>
            <StatTooltipPlayerButton playerId={playerId} />
          </ButtonWrapper>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content side="bottom" sideOffset={10} align="end" alignOffset={-10}>
            {/* <Popover.Close /> */}
            <ErrorBoundary>
              { activeTooltip === playerId &&
                <StatTooltipPlayerDetail playerId={playerId} />
              }
            </ErrorBoundary>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  )
};

export default StatTooltipPlayer;