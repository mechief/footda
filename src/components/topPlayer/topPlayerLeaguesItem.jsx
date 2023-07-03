import React, { memo } from "react";
import { useMatch, Link } from "react-router-dom";
import styled from "styled-components";

import { getLeagueNameKr } from "../../utils/league";

const ItemLink = styled(Link)`
  display: flex;
  width: 120px;
  height: 120px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f1f1f1;
  font-size: 15px;
  border-radius: 4px;
  &:hover {
    background: #e5eef0;
  }
  &.active {
    background: #e5eef0;
  }
`;

const ItemImg = styled.img`
  height: 60px;
  margin-bottom: 12px;
`;

const TopPlayerLeaguesItem = memo(({ leagueId }) => {
  const isActive = () => {
    const match = useMatch("/top_players/" + leagueId);
    const matchDefault = useMatch("/top_players");
    return Boolean(match) ? "active" : (leagueId == 39 && Boolean(matchDefault) ? "active" : "");
  }

  return (
    <ItemLink to={`/top_players/${leagueId}`} className={isActive()}>
      <ItemImg src={`https://media-1.api-sports.io/football/leagues/${leagueId}.png`} alt="" />
      <span>{getLeagueNameKr(leagueId)}</span>
    </ItemLink>
  );
});

export default TopPlayerLeaguesItem;