import React from "react";
import { useSelector } from "react-redux";

import * as Popover from '@radix-ui/react-popover';

import StatTooltipPlayerButton from "./statTooltipPlayerButton"
import StatTooltipPlayerDetail from "./statTooltipPlayerDetail";

const StatTooltipPlayer = ({ playerId }) => {
  const activeTooltip = useSelector((state) => state.statTooltip.activeTooltip);
  
  return (
    <>
      <Popover.Root>
        <Popover.Trigger asChild>
          <span>
            <StatTooltipPlayerButton playerId={playerId} />
          </span>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content side="bottom" align="start">
            {/* <Popover.Close /> */}
            { activeTooltip === playerId &&
              <StatTooltipPlayerDetail playerId={playerId} />
            }
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  )
};

export default StatTooltipPlayer;