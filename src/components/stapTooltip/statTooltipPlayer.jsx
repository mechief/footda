import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const PlayerPhoto = styled.img`
  width: 75px;
`;

const StatPlayerTooltip = ({ playerId }) => {
  const stat = useSelector((state) => state.statTooltip.players[playerId]);
  
  return (
    <div>
      <div>
        <PlayerPhoto src={stat.player.photo} />
        <span>{stat.player.name}</span>
        <span>{stat.player.age}세</span>
      </div>
      <div>
        
      </div>
    </div>
  )
};

export default StatPlayerTooltip;