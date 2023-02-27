import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import LeagueStat from "./leagueStat";

const StatTooltipPlayerWrapper = styled.div`
  max-width: 400px;
  padding: 25px;
  border: 2px solid #222;
  border-radius: 4px;
  background: #e4ecee;
`;

const PlayerPhoto = styled.img`
  width: 75px;
`;

const TooltipProfile = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: flex-end;
`;

const TooltipName = styled.span`
  padding-right: 10px;
  font-size: 18px;
  font-weight: 500;
`;

const TooltipAge = styled.span`
  font-size: 14px;
`;

const LeagueStatTable = styled.table`
  width: 100%;
  table-layout: fixed;
`;

const LeagueStatThead = styled.thead`
  font-size: 13px; 
  font-weight: 500;
  text-align: center;
  & th {
    padding: 6px 3px 12px 3px;
    &:first-child {
      width: 120px;
    }
    &:nth-child(n+4) {
      width: 40px;
    }
  }
`;

const LeagueStatTbody = styled.tbody`
  font-size: 13px;
  & td {
    padding: 3px;
    text-align: center;
    word-break: keep-all;
    &:first-child {
      width: 80px;
      text-align: left;
    }
    &:nth-child(n+4) {
      width: 30px;
    }
  }
`;


const StatTooltipPlayerDetail = ({ playerId }) => {
  const stat = useSelector((state) => state.statTooltip.players[playerId]);

  const TheadByPosition = () => {
    if (stat.position == 'Goalkeeper') {
      return (
        <tr>
          <th>&nbsp;</th>
          <th>경기(선발)</th>
          <th>출장시간</th>
          <th>실점</th>
          <th>선방</th>
        </tr>
      );
    }
    return (
      <tr>
        <th>&nbsp;</th>
        <th>경기(선발)</th>
        <th>출장시간</th>
        <th>득점</th>
        <th>도움</th>
      </tr>
    );
  }
  
  return (
    <StatTooltipPlayerWrapper>
      <TooltipProfile>
        {/* <PlayerPhoto src={stat.player.photo} /> */}
        <TooltipName>{stat.player.name}</TooltipName>
        <TooltipAge>{stat.player.age}세</TooltipAge>
      </TooltipProfile>
      <LeagueStatTable>
        <caption>시즌 기록</caption>
        <LeagueStatThead>{TheadByPosition()}</LeagueStatThead>
        <LeagueStatTbody>
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
        </LeagueStatTbody>
      </LeagueStatTable>
    </StatTooltipPlayerWrapper>
  )
};

export default StatTooltipPlayerDetail;