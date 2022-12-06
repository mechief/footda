import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import LeagueStat from "./leagueStat";

const StatTooltipPlayerWrapper = styled.div`
  padding: 25px;
  border: 2px solid #222;
  border-radius: 4px;
  background: #e4ecee;
`;

const PlayerPhoto = styled.img`
  width: 75px;
`;

const StatTooltipPlayerDetail = ({ playerId }) => {
  const stat = useSelector((state) => state.statTooltip.players[playerId]);
  
  return (
    <StatTooltipPlayerWrapper>
      <div>
        {/* <PlayerPhoto src={stat.player.photo} /> */}
        <span>{stat.player.name}</span>
        <span>{stat.player.age}세</span>
      </div>
      <LeagueStat
        key="playerTooltip_seasonTotal"
        leagueStat={stat.seasonTotal}
        position={stat.position} 
        isSeasonTotal={true}
      ></LeagueStat>
      {
        stat.statistics.length > 0 && 
        stat.statistics.map(leagueStat => 
          <LeagueStat 
            key={'playerTooltip_' + leagueStat.summary.leagueId} 
            leagueStat={leagueStat.summary} 
            position={stat.position}
          ></LeagueStat>
        )
      }
    </StatTooltipPlayerWrapper>
  )
};

export default StatTooltipPlayerDetail;