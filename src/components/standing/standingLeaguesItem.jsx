import React, { memo } from "react";
import { useMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { getLeagueNameKr } from "../../service/apiFootballService";

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

const StandingLeaguesItem = memo(({ leagueId }) => {
  const isActive = () => {
    const match = useMatch("/standing/" + leagueId);
    const matchDefault = useMatch("/standing");
    return Boolean(match) ? "active" : (leagueId == 39 && Boolean(matchDefault) ? "active" : "");
  }

  return (
    <ItemLink to={`/standing/${leagueId}`} className={isActive()}>
      <ItemImg src={`https://media-1.api-sports.io/football/leagues/${leagueId}.png`} alt="" />
      <span>{getLeagueNameKr(leagueId)}</span>
    </ItemLink>
  );
});

export default StandingLeaguesItem;