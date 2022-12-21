import React, { useState, useEffect } from "react";
import { useParams, useLoaderData } from "react-router-dom";

import { getTopPlayers } from "../apiFootball/topPlayers";

import TopPlayerLeagues from "../components/topPlayer/topPlayerLeagues";
import TopPlayerSummaryList from "../components/topPlayer/topPlayerSummaryList";
import TopPlayerTable from "../components/topPlayer/topPlayerTable";

import {
  TopPlayerWrapper,
  TopPlayerTitle,
  TopPlayerSummaryWrapper
} from "../components/topPlayer/topPlayerStyled";

const TopPlayer = () => {
  // const leagueId = useParams().id ?? 39; // 기본값: 프리미어리그
  const [topScorersData, topAssistsData] = useLoaderData();
  const [playersData, setPlayersData] = useState(topScorersData);
  const [orderData, setOrderData] = useState('goals');

  console.log(topScorersData);
  console.log(topAssistsData);

  useEffect(() => {
    setOrderData('goals');
    setPlayersData(topScorersData);
  }, [topScorersData, topAssistsData]);

  useEffect(() => {
    setPlayersData(() => {
      return orderData === 'goals' ? topScorersData : topAssistsData;
    });
  }, [orderData]);
  
  return (
    <TopPlayerWrapper>
      <TopPlayerTitle>개인 기록</TopPlayerTitle>
      <TopPlayerLeagues />
      <TopPlayerSummaryWrapper>
        <TopPlayerSummaryList key='summary_goal' listData={topScorersData} type='goals' />
        <TopPlayerSummaryList key='summary_assist' listData={topAssistsData} type='assists' />
      </TopPlayerSummaryWrapper>
      <TopPlayerTable 
        playersData={playersData}
        orderData={orderData}
        setOrderData={setOrderData}
      />
    </TopPlayerWrapper>
  );
}

export const topPlayerLoader = async ({ params }) => {
  const id = params.id ?? 39; // 기본값: 프리미어리그
  return await getTopPlayers(id);
}

export default TopPlayer;